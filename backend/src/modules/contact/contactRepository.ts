import { appendFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { env } from '@common/utils/envConfig'
import type { StoredMessage } from '@modules/contact/contactModel'

/**
 * ตอนนี้เก็บลงไฟล์ JSONL หนึ่งข้อความต่อบรรทัด
 * ถ้าจะเปลี่ยนไปส่งอีเมลหรือลง DB ให้แก้แค่ไฟล์นี้ไฟล์เดียว
 * service กับ router ไม่ต้องแตะ
 */
export const contactRepository = {
  save: async (message: StoredMessage): Promise<void> => {
    const path = resolve(process.cwd(), env.contactStore)
    await mkdir(dirname(path), { recursive: true })
    await appendFile(path, `${JSON.stringify(message)}\n`, 'utf8')
  },
}
