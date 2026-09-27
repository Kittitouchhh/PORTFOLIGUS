import type { UiKey } from '@/constants/uiText'

/**
 * ทั้งเว็บเป็นหน้าเดียว แต่ละหัวข้อคือ section ที่มี id ของตัวเอง
 * navbar, scrollspy และลิงก์เก่า (/about, /work, …) อ้างชุดนี้ชุดเดียวกัน
 *
 * ลำดับ = ลำดับที่วางจริงบนหน้า (ห้ามสลับโดยไม่แก้ HomePage)
 * และเรียงแบบ "คนอ่านมีเวลาสามสิบวินาที" คือผลงานมาก่อนเลย ต่อจากชื่อ แล้วค่อยเป็นประวัติ
 *
 */
export const SECTIONS = [
  { id: 'work', key: 'nav.work' },
  { id: 'senior-project', key: 'nav.project' },
  { id: 'method', key: 'nav.method' },
  { id: 'about', key: 'nav.about' },
] as const satisfies readonly { id: string; key: UiKey }[]

/** id ของหัวข้อบนสุด (พาดหัว) — ไม่ได้อยู่ในเมนู แต่โลโก้กดกลับมาที่นี่ */
export const TOP_ID = 'top'

/** ปลายทางสุดท้ายของหน้า อยู่นอกเมนูหลักเพราะมีปุ่มของตัวเองอยู่แล้ว */
export const CONTACT_ID = 'contact'

/** รายการเมนูเลข 00–05 (หน้าแรก → หัวข้อ → ติดต่อ) ใช้ทั้งแถบเมนูซ้ายและเมนูมือถือ */
export const NAV_ITEMS: readonly { id: string; key: UiKey; no: string }[] = [
  { id: TOP_ID, key: 'nav.top', no: '00' },
  ...SECTIONS.map((s, i) => ({ id: s.id, key: s.key, no: String(i + 1).padStart(2, '0') })),
  { id: CONTACT_ID, key: 'nav.contact', no: String(SECTIONS.length + 1).padStart(2, '0') },
]

/** ใช้กับ scrollspy — ต้องเป็น reference เดิมทุกครั้ง ไม่งั้น effect จะรันใหม่ไม่จบ */
export const SPY_IDS: readonly string[] = [
  ...SECTIONS.map((section) => section.id),
  CONTACT_ID,
]

/** path เดิมสมัยยังแยกหน้า — ยังมีคนบุ๊กมาร์กไว้ เลยเด้งไปที่ section แทน */
export const LEGACY_PATHS: Record<string, string> = {
  '/work': 'work',
  '/process': 'method',
  '/skills': 'about',
  '/about': 'about',
  '/experience': 'about',
  '/education': 'about',
  '/learning': 'about',
  '/contact': 'contact',
}
