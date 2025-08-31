'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Activity, Clock, Database, TrendingUp } from 'lucide-react'

interface CacheStats {
  hits: number
  misses: number
  hitRate: number
  savedTime: number
  totalRequests: number
  activeCacheItems: number
}

export default function CacheMonitor() {
  const [stats, setStats] = useState<CacheStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show cache monitor in development or when specifically enabled
    const isDev = process.env.NODE_ENV === 'development'
    const showCache = localStorage.getItem('showCacheMonitor') === 'true'
    
    if (isDev || showCache) {
      setVisible(true)
    }

    const fetchCacheStats = async () => {
      try {
        const response = await fetch('/api/homepage-data?section=performance')
        if (response.ok) {
          const data = await response.json()
          setStats(data.realCacheStats)
        }
      } catch (error) {
        console.error('Failed to fetch cache stats:', error)
      } finally {
        setLoading(false)
      }
    }

    if (visible) {
      fetchCacheStats()
      const interval = setInterval(fetchCacheStats, 10000) // Every 10 seconds
      return () => clearInterval(interval)
    }
  }, [visible])

  // Keyboard shortcut to toggle cache monitor (Ctrl/Cmd + Shift + C)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        const newVisible = !visible
        setVisible(newVisible)
        localStorage.setItem('showCacheMonitor', newVisible.toString())
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [visible])

  if (!visible || loading || !stats) return null

  const hitRate = stats.hitRate || 0
  const savedTimeSeconds = Math.round((stats.savedTime || 0) / 1000)

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-8 right-8 z-50 glass rounded-xl p-4 border border-neon/20 shadow-lg max-w-xs"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-ice flex items-center gap-2">
          <Zap className="w-4 h-4 text-neon" />
          Cache Monitor
        </h3>
        <button
          onClick={() => {
            setVisible(false)
            localStorage.setItem('showCacheMonitor', 'false')
          }}
          className="text-ice/40 hover:text-ice text-xs"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-ice/60 flex items-center gap-1">
            <Activity className="w-3 h-3" />
            Hit Rate
          </span>
          <span className={`font-mono ${hitRate > 70 ? 'text-green-400' : hitRate > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
            {hitRate}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-ice/60 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Requests
          </span>
          <span className="text-neon font-mono">{stats.totalRequests}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-ice/60 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Time Saved
          </span>
          <span className="text-electric font-mono">{savedTimeSeconds}s</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-ice/60 flex items-center gap-1">
            <Database className="w-3 h-3" />
            Cache Items
          </span>
          <span className="text-ice font-mono">{stats.activeCacheItems}</span>
        </div>

        <div className="mt-3 pt-2 border-t border-ice/10">
          <div className="w-full bg-ice/10 rounded-full h-1.5">
            <div 
              className="h-1.5 rounded-full bg-gradient-to-r from-electric to-neon transition-all duration-300"
              style={{ width: `${hitRate}%` }}
            />
          </div>
          <div className="mt-1 text-center text-ice/40 text-xs">
            Cache Performance
          </div>
        </div>
      </div>

      <div className="mt-2 text-xs text-ice/30 text-center">
        Press Ctrl+Shift+C to toggle
      </div>
    </motion.div>
  )
}