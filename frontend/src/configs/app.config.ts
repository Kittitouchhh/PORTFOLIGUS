import type { Lang } from '@/types/i18n.type'
import type { Theme } from '@/types/theme.type'

/**
 * ค่าตั้งต้นของแอปที่ปรับผ่าน .env ได้
 *
 * ตอน dev ปล่อย apiBaseUrl ว่างไว้ แล้วให้ vite proxy /api ไปที่ backend
 * ตอน deploy จริงตั้ง VITE_API_URL เป็นโดเมนของ API
 */
export const appConfig = {
  apiBaseUrl: import.meta.env.VITE_API_URL ?? '',
  apiPrefix: '/api',

  /** ธีมเริ่มต้นเป็นมืด — กระจกฝ้าอ่านง่ายและสวยกว่าบนพื้นเข้ม */
  defaultTheme: 'dark' as Theme,

  /**
   * เปิดหน้าแรกมาเป็นอังกฤษก่อน แล้วสลับเป็นไทยให้เองตอนเลื่อนพ้นพาดหัว
   * (ตรรกะการสลับอยู่ใน contexts/LanguageContext.tsx)
   * ค่านี้ใช้เฉพาะคนที่ยังไม่เคยกดเลือกภาษาเอง — ถ้าเคยเลือกแล้ว ของที่เลือกไว้ชนะเสมอ
   */
  defaultLang: 'en' as Lang,
} as const
