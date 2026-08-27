/**
 * type และ helper ของระบบสองภาษาย้ายไปอยู่ใน shared/ แล้ว
 * เพราะ backend ต้องใช้ตัวเดียวกันตอนตรวจฟอร์มติดต่อ
 * ไฟล์นี้เหลือไว้เป็นทางลัด — โค้ดฝั่งหน้าเว็บ import จาก '@/types/i18n.type' ได้เหมือนเดิม
 */
export type { Lang, L, Txt } from '@portfolio/shared/types'
export { l } from '@portfolio/shared/types'
