'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, Database, Server, Users, Eye, Clock, 
  Wifi, WifiOff, AlertCircle, CheckCircle, RefreshCw,
  TrendingUp, HardDrive, Zap
} from 'lucide-react'

interface RedisStatus {
  redis: {
    connected: boolean
    host: string
    port: number
    memory: string
    uptime: string
    totalConnections: number
    totalCommands: number
    keys: number
    ping: string
    error: string | null
  }
  memory: {
    size: number
    active: boolean
    mode: string
  }
  stats: {
    totalViews: number
    todayViews: number
    activeUsers: number
  }
  timestamp: string
  environment: string
}

export default function RedisMonitor() {
  const [status, setStatus] = useState<RedisStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/redis-status')
      const data = await response.json()
      setStatus(data)
      setError(null)
    } catch (err) {
      setError('Erro ao buscar status')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
    
    if (autoRefresh) {
      const interval = setInterval(fetchStatus, 3000) // Atualiza a cada 3 segundos
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Carregando monitor...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    )
  }

  if (!status) return null

  const isConnected = status.redis.connected

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Monitor Redis - Pet Voa 🚀
            </h1>
            <p className="text-white/60">
              Ambiente: <span className="text-white font-mono">{status.environment}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                autoRefresh 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-600 text-gray-300'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
            </button>
            
            <button
              onClick={fetchStatus}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Atualizar Agora
            </button>
          </div>
        </div>

        {/* Status Principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Conexão */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border-2 ${
              isConnected ? 'border-green-400' : 'border-yellow-400'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Conexão</h3>
              {isConnected ? (
                <Wifi className="w-8 h-8 text-green-400" />
              ) : (
                <WifiOff className="w-8 h-8 text-yellow-400" />
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                )}
                <span className="text-white font-semibold">
                  {status.memory.mode}
                </span>
              </div>
              
              {isConnected && (
                <>
                  <p className="text-white/60 text-sm">
                    Host: <span className="text-white font-mono">{status.redis.host}:{status.redis.port}</span>
                  </p>
                  <p className="text-white/60 text-sm">
                    Ping: <span className="text-green-400 font-mono">{status.redis.ping}</span>
                  </p>
                </>
              )}
            </div>
          </motion.div>

          {/* Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Performance</h3>
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-white/60 text-sm">Memória Usada</p>
                <p className="text-2xl font-bold text-white">
                  {isConnected ? status.redis.memory : 'N/A'}
                </p>
              </div>
              
              <div>
                <p className="text-white/60 text-sm">Uptime</p>
                <p className="text-lg font-semibold text-white">
                  {isConnected ? status.redis.uptime : 'N/A'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Estatísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Atividade</h3>
              <Activity className="w-8 h-8 text-purple-400" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Chaves</span>
                <span className="text-white font-bold">
                  {isConnected ? status.redis.keys : '0'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white/60">Comandos</span>
                <span className="text-white font-bold">
                  {isConnected ? status.redis.totalCommands.toLocaleString() : '0'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white/60">Conexões</span>
                <span className="text-white font-bold">
                  {isConnected ? status.redis.totalConnections : '0'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Métricas do Site */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-xl p-6 border border-blue-400/30"
          >
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-6 h-6 text-blue-400" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-white/60 text-sm mb-1">Visitas Totais</p>
            <p className="text-3xl font-bold text-white">
              {status.stats.totalViews.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-xl p-6 border border-green-400/30"
          >
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-6 h-6 text-green-400" />
              <span className="text-xs text-white/60">Hoje</span>
            </div>
            <p className="text-white/60 text-sm mb-1">Visitas Hoje</p>
            <p className="text-3xl font-bold text-white">
              {status.stats.todayViews.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-xl p-6 border border-purple-400/30"
          >
            <div className="flex items-center justify-between mb-2">
              <Users className="w-6 h-6 text-purple-400" />
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            <p className="text-white/60 text-sm mb-1">Usuários Ativos</p>
            <p className="text-3xl font-bold text-white">
              {status.stats.activeUsers}
            </p>
          </motion.div>
        </div>

        {/* Cache em Memória */}
        {!isConnected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-yellow-500/20 backdrop-blur-md rounded-xl p-6 border border-yellow-400/30 mb-8"
          >
            <div className="flex items-center gap-3">
              <HardDrive className="w-8 h-8 text-yellow-400" />
              <div>
                <h3 className="text-xl font-bold text-white">Cache em Memória Ativo</h3>
                <p className="text-white/60">
                  Redis não disponível. Usando fallback em memória com {status.memory.size} itens em cache.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Última Atualização */}
        <div className="text-center text-white/40 text-sm">
          Última atualização: {new Date(status.timestamp).toLocaleString('pt-BR')}
        </div>
      </div>
    </div>
  )
}