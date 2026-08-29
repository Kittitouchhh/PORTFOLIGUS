import type { UiKey } from '@/constants/uiText'

/**
 * ทั้งเว็บเป็นหน้าเดียว แต่ละหัวข้อคือ section ที่มี id ของตัวเอง
 * navbar, scrollspy และลิงก์เก่า (/about, /work, …) อ้างชุดนี้ชุดเดียวกัน
 *
 * ลำดับ = ลำดับที่วางจริงบนหน้า (ห้ามสลับโดยไม่แก้ HomePage)
 * และเรียงแบบ "คนอ่านมีเวลาสามสิบวินาที" คือผลลัพธ์และประสบการณ์มาก่อนประวัติส่วนตัว
 *
 * กำลังเรียนรู้กับแกลเลอรีไม่อยู่ในเมนู เพราะเจ็ดปุ่มคือเพดานที่แถบบนรับไหวก่อนจะล้น
 */
export const SECTIONS = [
  { id: 'about', key: 'nav.about' },
  { id: 'education', key: 'nav.education' },
  { id: 'impact', key: 'nav.impact' },
  { id: 'experience', key: 'nav.experience' },
  { id: 'work', key: 'nav.work' },
  { id: 'process', key: 'nav.process' },
  { id: 'skills', key: 'nav.skills' },
] as const satisfies readonly { id: string; key: UiKey }[]

/** id ของหัวข้อบนสุด (พาดหัว) — ไม่ได้อยู่ในเมนู แต่โลโก้กดกลับมาที่นี่ */
export const TOP_ID = 'top'

/** ปลายทางสุดท้ายของหน้า อยู่นอกเมนูหลักเพราะมีปุ่มของตัวเองอยู่แล้ว */
export const CONTACT_ID = 'contact'

/** ใช้กับ scrollspy — ต้องเป็น reference เดิมทุกครั้ง ไม่งั้น effect จะรันใหม่ไม่จบ */
export const SPY_IDS: readonly string[] = [
  ...SECTIONS.map((section) => section.id),
  CONTACT_ID,
]

/** path เดิมสมัยยังแยกหน้า — ยังมีคนบุ๊กมาร์กไว้ เลยเด้งไปที่ section แทน */
export const LEGACY_PATHS: Record<string, string> = {
  '/about': 'about',
  '/skills': 'skills',
  '/process': 'process',
  '/work': 'work',
  '/experience': 'experience',
  '/education': 'education',
  '/learning': 'learning',
  '/contact': 'contact',
}
