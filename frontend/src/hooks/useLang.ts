import { useContext } from 'react'
import { LanguageContext, type LanguageValue } from '@/contexts/LanguageContext'

export function useLang(): LanguageValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang ต้องอยู่ภายใน <LanguageProvider>')
  return ctx
}
