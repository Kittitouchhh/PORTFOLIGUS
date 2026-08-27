import type { ContactPayload } from '@portfolio/shared/contact'

export type { ContactPayload }

/** หนึ่งข้อความที่เก็บลงคลัง */
export type StoredMessage = {
  id: string
  receivedAt: string
  name: string
  email: string
  message: string
  ip?: string
}

/** สิ่งที่ตอบกลับไปให้ฟอร์ม */
export type SubmitContactResult = {
  id: string
}
