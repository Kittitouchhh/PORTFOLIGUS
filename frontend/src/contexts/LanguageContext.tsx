import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
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
  /** เพิ่งสลับภาษาให้เองอัตโนมัติเมื่อครู่ — ใช้ขึ้นป้ายบอกสั้น ๆ ว่าไม่ได้เพี้ยน */
  justAutoSwitched: boolean
}

export const LanguageContext = createContext<LanguageValue | null>(null)

/** เลื่อนพ้นหน้าแรกไปเท่าไหร่ถึงสลับเป็นไทย (เท่าของความสูงจอ) */
const SWITCH_AT = 0.55

/** ป้าย "เปลี่ยนภาษาให้แล้ว" อยู่บนจอกี่มิลลิวินาที */
const FLASH_MS = 3200

function readSavedLang(): Lang | null {
  if (typeof window === 'undefined') return null
  const saved = window.localStorage.getItem(STORAGE_KEYS.LANG)
  return saved === 'en' || saved === 'th' ? saved : null
}

/**
 * ภาษาของทั้งเว็บ
 *
 * คนที่เพิ่งเข้ามาครั้งแรกจะเจอหน้าแรกเป็นอังกฤษก่อน (ค่าตั้งต้นใน app.config)
 * พอเลื่อนพ้นพาดหัวลงมา ถือว่าตั้งใจอ่านต่อจริง เว็บจะสลับเป็นไทยให้เอง
 * — หน้าแรกเลยทำหน้าที่เป็นนามบัตรสากล ส่วนเนื้อหายาว ๆ อ่านเป็นไทย
 *
 * กติกาสำคัญ: ถ้าผู้ใช้เคยกดเลือกภาษาเองแล้ว จะไม่สลับให้อีกเลย
 * ของที่ผู้ใช้เลือกเองต้องชนะระบบอัตโนมัติเสมอ และเฉพาะการเลือกเองเท่านั้นที่ถูกจำลง storage
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => readSavedLang() ?? appConfig.defaultLang)
  const chosenRef = useRef(readSavedLang() !== null)
  const [justAutoSwitched, setJustAutoSwitched] = useState(false)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    chosenRef.current = true
    setJustAutoSwitched(false)
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEYS.LANG, next)
    } catch {
      /* โหมด private / storage ถูกปิด — ข้ามไป ไม่ต้องพัง */
    }
  }, [])

  const toggle = useCallback(() => setLang(lang === 'th' ? 'en' : 'th'), [lang, setLang])

  useEffect(() => {
    if (chosenRef.current || lang === 'th') return

    const onScroll = () => {
      if (window.scrollY < window.innerHeight * SWITCH_AT) return
      window.removeEventListener('scroll', onScroll)
      setLangState('th')
      setJustAutoSwitched(true)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lang])

  useEffect(() => {
    if (!justAutoSwitched) return
    const timer = window.setTimeout(() => setJustAutoSwitched(false), FLASH_MS)
    return () => window.clearTimeout(timer)
  }, [justAutoSwitched])

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      setLang,
      toggle,
      t: (value: Txt) => (typeof value === 'string' ? value : value[lang]),
      tr: (key: UiKey) => ui[key][lang],
      justAutoSwitched,
    }),
    [lang, setLang, toggle, justAutoSwitched],
  )

  return <LanguageContext value={value}>{children}</LanguageContext>
}
