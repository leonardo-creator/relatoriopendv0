"use client"

import { useState, useEffect } from "react"

/**
 * Hook para detectar se o dispositivo é móvel
 * @returns {boolean} true se o dispositivo for móvel, false caso contrário
 */
export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Função para verificar se o dispositivo é móvel
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera

      // Verificar se é um dispositivo móvel pelo userAgent
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

      // Verificar também pelo tamanho da tela (menos de 768px é considerado móvel)
      const isMobileBySize = window.innerWidth < 768

      setIsMobile(mobileRegex.test(userAgent) || isMobileBySize)
    }

    // Verificar inicialmente
    checkMobile()

    // Adicionar listener para redimensionamento da janela
    window.addEventListener("resize", checkMobile)

    // Limpar listener ao desmontar o componente
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return isMobile
}
