'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function usePageTracking() {
  const pathname = usePathname()
  
  useEffect(() => {
    // Track page view
    const trackPageView = async () => {
      try {
        // Determine page name from pathname or section
        let pageName = 'home'
        if (pathname.includes('#')) {
          pageName = pathname.split('#')[1]
        }
        
        await fetch('/api/stats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: pageName,
          }),
        })
      } catch (error) {
        console.error('Failed to track page view:', error)
      }
    }
    
    trackPageView()
  }, [pathname])
  
  // Track specific section views
  const trackSection = async (sectionName: string) => {
    try {
      await fetch('/api/stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: sectionName,
        }),
      })
    } catch (error) {
      console.error('Failed to track section view:', error)
    }
  }
  
  return { trackSection }
}