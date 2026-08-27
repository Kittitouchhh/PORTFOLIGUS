import type { L } from './types'
import { l } from './types'

/**
 * สัญญาของฟอร์มติดต่อ ใช้ร่วมกันสองฝั่ง
 * frontend ตรวจก่อนส่งเพื่อให้ผู้ใช้เห็นทันที
 * backend ตรวจซ้ำเพราะห้ามเชื่อ client
 */
export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 160 },
  message: { min: 10, max: 2000 },
} as const

export type ContactField = keyof typeof CONTACT_LIMITS

export type ContactPayload = {
  name: string
  email: string
  message: string
  /** ช่องล่อบอท — คนจริงจะไม่เห็นและไม่กรอก */
  website?: string
}

export type ContactErrors = Partial<Record<ContactField, L>>

// ตรวจแบบหลวม ๆ พอกันพิมพ์ผิด การยืนยันจริงคือส่งอีเมลแล้วมีคนตอบ
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(input: Partial<ContactPayload>): ContactErrors {
  const errors: ContactErrors = {}
  const name = (input.name ?? '').trim()
  const email = (input.email ?? '').trim()
  const message = (input.message ?? '').trim()

  if (name.length < CONTACT_LIMITS.name.min) {
    errors.name = l('ใส่ชื่อด้วยนะครับ', 'Please enter your name.')
  } else if (name.length > CONTACT_LIMITS.name.max) {
    errors.name = l(
      `ชื่อยาวเกิน ${CONTACT_LIMITS.name.max} ตัวอักษร`,
      `Name must be under ${CONTACT_LIMITS.name.max} characters.`,
    )
  }

  if (!EMAIL_RE.test(email)) {
    errors.email = l('อีเมลดูไม่ถูกรูปแบบ', 'That email address looks wrong.')
  } else if (email.length > CONTACT_LIMITS.email.max) {
    errors.email = l('อีเมลยาวเกินไป', 'That email address is too long.')
  }

  if (message.length < CONTACT_LIMITS.message.min) {
    errors.message = l(
      `เขียนรายละเอียดอย่างน้อย ${CONTACT_LIMITS.message.min} ตัวอักษร`,
      `Please write at least ${CONTACT_LIMITS.message.min} characters.`,
    )
  } else if (message.length > CONTACT_LIMITS.message.max) {
    errors.message = l(
      `ข้อความยาวเกิน ${CONTACT_LIMITS.message.max} ตัวอักษร`,
      `Message must be under ${CONTACT_LIMITS.message.max} characters.`,
    )
  }

  return errors
}

export function isValidContact(input: Partial<ContactPayload>): boolean {
  return Object.keys(validateContact(input)).length === 0
}

/** รูปแบบคำตอบที่ backend ส่งกลับ */
export type ApiOk<T> = { ok: true; data: T }
export type ApiErr = { ok: false; error: { code: string; message: string; fields?: Record<string, string> } }
export type ApiResult<T> = ApiOk<T> | ApiErr
