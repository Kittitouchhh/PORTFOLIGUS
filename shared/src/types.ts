export type Lang = 'th' | 'en'

/** ข้อความที่มีทั้งไทย/อังกฤษ — data ทุกก้อนในโปรเจกต์ใช้ shape นี้ */
export type L = Record<Lang, string>

/**
 * ข้อความที่แปลได้ หรือ string ธรรมดา
 * (ชื่อเทคโนโลยีอย่าง "React" ไม่ต้องแปล เขียนเป็น string ตรง ๆ ได้เลย)
 */
export type Txt = L | string

/** helper สั้น ๆ เวลาประกาศ data */
export const l = (th: string, en: string): L => ({ th, en })
