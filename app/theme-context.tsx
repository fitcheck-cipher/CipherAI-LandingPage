'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ThemeCtxType { isDark: boolean; toggle: () => void }
const ThemeCtx = createContext<ThemeCtxType>({ isDark: false, toggle: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cipher_theme')
      if (stored === 'dark') {
        setIsDark(true)
        document.documentElement.classList.add('dark')
      }
    } catch {}
  }, [])

  const toggle = () => {
    setIsDark(d => {
      const next = !d
      try {
        localStorage.setItem('cipher_theme', next ? 'dark' : 'light')
        document.documentElement.classList.toggle('dark', next)
      } catch {}
      return next
    })
  }

  return <ThemeCtx.Provider value={{ isDark, toggle }}>{children}</ThemeCtx.Provider>
}

export const useTheme = () => useContext(ThemeCtx)
