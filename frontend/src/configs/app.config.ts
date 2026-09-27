import type { Lang } from '@/types/i18n.type'
import type { Theme } from '@/types/theme.type'

/**
 * ค่าตั้งต้นของแอปที่ปรับผ่าน .env ได้

 */
export const appConfig = {
  /** key ของ Web3Forms — ฟอร์มติดต่อส่งอีเมลตรงจากเบราว์เซอร์ (ตั้งใน frontend/.env และในหน้าตั้งค่าของ Vercel) */
  web3formsKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '',

  /** ธีมเริ่มต้นเป็นมืด — กระจกฝ้าอ่านง่ายและสวยกว่าบนพื้นเข้ม */
  defaultTheme: 'dark' as Theme,

  /**
   * เข้ามาครั้งแรก (ทุกแพลตฟอร์ม/ทุกลิงก์) เปิดเป็นภาษาไทยเสมอ — เจ้าของขอ 27 ก.ย.
   * ค่านี้ใช้เฉพาะคนที่ยังไม่เคยกดเลือกภาษาเอง — ถ้าเคยเลือกแล้ว ของที่เลือกไว้ชนะเสมอ
   * (ถ้าตั้งเป็น 'en' LanguageContext จะสลับเป็นไทยให้เองตอนเลื่อนพ้นพาดหัว)
   */
  defaultLang: 'th' as Lang,
} as const
