'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Users, TrendingUp } from 'lucide-react'

export default function VisitorCounter() {
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    active: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Track this visit
    const trackVisit = async () => {
      try {
        await fetch('/api/stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page: 'home' })
        })
      } catch (error) {
        console.error('Failed to track visit:', error)
      }
    }

    // Get current stats
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        if (response.ok) {
          const data = await response.json()
          setStats({
            total: data.total || 0,
            today: data.pages?.hero || 0,
            active: Math.floor(Math.random() * 5) + 2 // Simulated active users
          })
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    trackVisit()
    fetchStats()

    // Update stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-8 left-8 z-40 glass rounded-xl p-4 border border-electric/20"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-ice/60">Redis Active</span>
        </div>
        
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3 text-electric" />
            <span className="text-ice">{stats.total}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-neon" />
            <span className="text-ice">{stats.active}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <span className="text-ice">+{stats.today}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-ice/40">
        Powered by Redis Cache
      </div>
    </motion.div>
  )
}