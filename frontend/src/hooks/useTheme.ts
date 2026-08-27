import { useCallback, useEffect, useState } from 'react'
import { STORAGE_KEYS } from '@/constants/storageKeys'
import { appConfig } from '@/configs/app.config'
import type { Theme } from '@/types/theme.type'

export type { Theme }

/** ธีมเริ่มต้นเป็นมืด — กระจกฝ้าอ่านง่ายและสวยกว่าบนพื้นเข้ม */
function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return appConfig.defaultTheme
  const saved = window.localStorage.getItem(STORAGE_KEYS.THEME)
  if (saved === 'light' || saved === 'dark') return saved
  return appConfig.defaultTheme
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      window.localStorage.setItem(STORAGE_KEYS.THEME, theme)
    } catch {
      /* storage ถูกปิด — ธีมยังใช้ได้ แค่ไม่จำข้ามรอบ */
    }
  }, [theme])

  const toggle = useCallback(
    () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [],
  )

  return { theme, setTheme, toggle }
}
