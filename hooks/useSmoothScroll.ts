'use client'

import { useCallback } from 'react'

export function useSmoothScroll() {
  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else if (sectionId === 'video') {
      const element = document.getElementById(sectionId)
      if (element) {
        // Posiciona a seção de vídeo perfeitamente na viewport
        const offsetTop = element.offsetTop - 64 // Ajuste para o header fixo
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        const offsetTop = element.offsetTop - 60 // Header height offset
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
    }
  }, [])

  return scrollToSection
}