import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Lang, Txt } from '@/types/i18n.type'
import { ui, type UiKey } from '@/constants/uiText'
import { STORAGE_KEYS } from '@/constants/storageKeys'
import { appConfig } from '@/configs/app.config'

export type LanguageValue = {
  lang: Lang
  setLang: (next: Lang) => void
  toggle: () => void
  /** อ่านค่าจาก data ที่เป็น { th, en } หรือ string ธรรมดา */
  t: (value: Txt) => string
  /** อ่านข้อความ UI จาก dictionary กลาง */
  tr: (key: UiKey) => string
}

export const LanguageContext = createContext<LanguageValue | null>(null)

function readInitialLang(): Lang {
  if (typeof window === 'undefined') return appConfig.defaultLang
  const saved = window.localStorage.getItem(STORAGE_KEYS.LANG)
  return saved === 'en' || saved === 'th' ? saved : appConfig.defaultLang
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      window.localStorage.setItem(STORAGE_KEYS.LANG, lang)
    } catch {
      /* โหมด private / storage ถูกปิด — ข้ามไป ไม่ต้องพัง */
    }
  }, [lang])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const toggle = useCallback(
    () => setLangState((prev) => (prev === 'th' ? 'en' : 'th')),
    [],
  )

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      setLang,
      toggle,
      t: (value: Txt) => (typeof value === 'string' ? value : value[lang]),
      tr: (key: UiKey) => ui[key][lang],
    }),
    [lang, setLang, toggle],
  )

  return <LanguageContext value={value}>{children}</LanguageContext>
}
