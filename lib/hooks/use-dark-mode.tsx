import { useEffect, useState } from 'react'
import { useStore } from '../store'

const isSystemDarkMode = (): boolean => {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const useDarkMode = (): boolean => {
  const isDarkMode = useStore((state) => state.isDarkMode)
  const setIsDarkMode = useStore((state) => state.setIsDarkMode)

  useEffect(() => {
    const isDark = isDarkMode ?? isSystemDarkMode()

    setIsDarkMode(isDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDarkMode])

  return isDarkMode
}
