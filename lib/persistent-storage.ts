/**
 * Sistema de persistência real usando arquivo JSON
 * Funciona sem Redis, perfeito para Coolify
 */

import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = process.env.DATA_DIR || '/tmp'
const DATA_FILE = path.join(DATA_DIR, 'petvoa-data.json')

interface StorageData {
  counters: Record<string, number>
  cache: Record<string, { value: any; expires: number }>
  sessions: Record<string, any>
  analytics: {
    pageViews: Record<string, number>
    dailyViews: Record<string, number>
    userActivity: Record<string, number>
  }
  lastUpdated: string
}

// Dados iniciais
const initialData: StorageData = {
  counters: {
    total_views: 0,
    unique_visitors: 0,
    total_messages: 0
  },
  cache: {},
  sessions: {},
  analytics: {
    pageViews: {},
    dailyViews: {},
    userActivity: {}
  },
  lastUpdated: new Date().toISOString()
}

// Cache em memória para performance
let memoryData: StorageData | null = null
let lastSave = Date.now()

/**
 * Carrega dados do arquivo
 */
async function loadData(): Promise<StorageData> {
  if (memoryData && (Date.now() - lastSave < 1000)) {
    return memoryData
  }

  try {
    const fileContent = await fs.readFile(DATA_FILE, 'utf-8')
    memoryData = JSON.parse(fileContent)
    return memoryData!
  } catch (error) {
    // Arquivo não existe, criar com dados iniciais
    memoryData = { ...initialData }
    await saveData(memoryData)
    return memoryData
  }
}

/**
 * Salva dados no arquivo
 */
async function saveData(data: StorageData): Promise<void> {
  try {
    data.lastUpdated = new Date().toISOString()
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
    memoryData = data
    lastSave = Date.now()
  } catch (error) {
    console.error('Erro ao salvar dados:', error)
  }
}

/**
 * Incrementa contador
 */
export async function incrementCounter(name: string): Promise<number> {
  const data = await loadData()
  
  if (!data.counters[name]) {
    data.counters[name] = 0
  }
  
  data.counters[name]++
  await saveData(data)
  
  return data.counters[name]
}

/**
 * Obtém valor do contador
 */
export async function getCounter(name: string): Promise<number> {
  const data = await loadData()
  return data.counters[name] || 0
}

/**
 * Cache com TTL
 */
export async function setCache(key: string, value: any, ttlSeconds: number = 3600): Promise<void> {
  const data = await loadData()
  
  data.cache[key] = {
    value,
    expires: Date.now() + (ttlSeconds * 1000)
  }
  
  // Limpar cache expirado
  const now = Date.now()
  Object.keys(data.cache).forEach(k => {
    if (data.cache[k].expires < now) {
      delete data.cache[k]
    }
  })
  
  await saveData(data)
}

/**
 * Obtém valor do cache
 */
export async function getCache(key: string): Promise<any | null> {
  const data = await loadData()
  const cached = data.cache[key]
  
  if (!cached) return null
  
  if (cached.expires < Date.now()) {
    delete data.cache[key]
    await saveData(data)
    return null
  }
  
  return cached.value
}

/**
 * Registra visita na página
 */
export async function trackPageView(page: string): Promise<void> {
  const data = await loadData()
  const today = new Date().toISOString().split('T')[0]
  
  // Contador total
  data.counters.total_views = (data.counters.total_views || 0) + 1
  
  // Por página
  if (!data.analytics.pageViews[page]) {
    data.analytics.pageViews[page] = 0
  }
  data.analytics.pageViews[page]++
  
  // Visitas diárias
  const dailyKey = `${today}:views`
  if (!data.analytics.dailyViews[dailyKey]) {
    data.analytics.dailyViews[dailyKey] = 0
  }
  data.analytics.dailyViews[dailyKey]++
  
  await saveData(data)
}

/**
 * Registra atividade do usuário
 */
export async function trackUserActivity(userId: string): Promise<void> {
  const data = await loadData()
  const now = Date.now()
  
  data.analytics.userActivity[userId] = now
  
  // Limpar usuários inativos (mais de 5 minutos)
  const fiveMinutesAgo = now - (5 * 60 * 1000)
  Object.keys(data.analytics.userActivity).forEach(id => {
    if (data.analytics.userActivity[id] < fiveMinutesAgo) {
      delete data.analytics.userActivity[id]
    }
  })
  
  await saveData(data)
}

/**
 * Obtém estatísticas completas
 */
export async function getStats(): Promise<{
  totalViews: number
  todayViews: number
  activeUsers: number
  pageViews: Record<string, number>
  topPages: Array<{ page: string; views: number }>
}> {
  const data = await loadData()
  const today = new Date().toISOString().split('T')[0]
  const dailyKey = `${today}:views`
  
  // Usuários ativos (últimos 5 minutos)
  const fiveMinutesAgo = Date.now() - (5 * 60 * 1000)
  const activeUsers = Object.values(data.analytics.userActivity)
    .filter(time => time > fiveMinutesAgo).length
  
  // Top páginas
  const topPages = Object.entries(data.analytics.pageViews)
    .map(([page, views]) => ({ page, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)
  
  return {
    totalViews: data.counters.total_views || 0,
    todayViews: data.analytics.dailyViews[dailyKey] || 0,
    activeUsers,
    pageViews: data.analytics.pageViews,
    topPages
  }
}

/**
 * Rate limiter
 */
export async function checkRateLimit(
  identifier: string, 
  limit: number = 10, 
  windowSeconds: number = 60
): Promise<{ allowed: boolean; remaining: number }> {
  const data = await loadData()
  const now = Date.now()
  const windowStart = now - (windowSeconds * 1000)
  
  const key = `ratelimit:${identifier}`
  const attempts = data.cache[key]?.value || []
  
  // Filtrar tentativas dentro da janela
  const recentAttempts = attempts.filter((time: number) => time > windowStart)
  
  if (recentAttempts.length >= limit) {
    return { allowed: false, remaining: 0 }
  }
  
  // Adicionar nova tentativa
  recentAttempts.push(now)
  await setCache(key, recentAttempts, windowSeconds)
  
  return {
    allowed: true,
    remaining: limit - recentAttempts.length
  }
}

/**
 * Limpa todos os dados (útil para reset)
 */
export async function clearAllData(): Promise<void> {
  memoryData = { ...initialData }
  await saveData(memoryData)
}

/**
 * Obtém todos os dados (para debug)
 */
export async function getAllData(): Promise<StorageData> {
  return await loadData()
}