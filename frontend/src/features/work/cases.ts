import { l } from '@/types/i18n.type'
import type { L } from '@portfolio/shared/types'

/**
 * 3 งานตัวอย่าง — ข้อมูลจาก design-handoff 04-work-section-B (WC4 + SHORT + USERS)
 * ⚠️ งานติด NDA: ไม่มีชื่อลูกค้า ชื่อคน เลขใบงาน ชื่อสินค้า ตัวเลขเงิน หรือโค้ดจริง
 * mockup ทุกจอใช้ข้อมูลสมมติ (งาน 01…, ใบงานตัวอย่าง, ขั้น 1–5, ร้านภายนอก A/B/C, กราฟิก A–D)
 */

export type Demo = 'tt' | 'gr' | 'os'

export type Case = {
  num: string
  demo: Demo
  tint: string
  /** ชื่อระบบ */
  code: L
  /** ใช้โดย */
  context: L
  title: L
  problem: L
  did: L[]
  /** ผลลัพธ์ใหญ่ + บรรทัดเล็กใต้ */
  big: L
  small: L
  /** ตัวละครผู้ใช้ (user1–3) */
  user: 1 | 2 | 3
}

export const userImg = (n: Case['user']) => ({
  sad: `/characters/user${n}-sad.webp`,
  happy: `/characters/user${n}-happy.webp`,
  still: `/characters/user${n}-happy-still.webp`,
})

export const CASES: Case[] = [
  {
    num: '01',
    demo: 'tt',
    tint: '#D9EEEC',
    code: l('หน้าติดตามการผลิต', 'Production tracking screen'),
    context: l('คนหน้างานทุกแผนก · ขึ้นระบบใช้งานจริงแล้ว', 'Floor staff in every team · live in production'),
    title: l('เปิดหน้าจอแล้วเห็นทันทีว่างานใดถึงคิว และบันทึกผลจากการ์ดได้ทันที', 'Open it and see which job is your turn, then log output straight from the card'),
    problem: l(
      'ผู้ใช้ต้องค้นหาใบงานเอง ไม่ทราบว่าใบใดถึงคิวของแผนก และต้องเปิด 2 หน้าเทียบกันตลอดเวลา',
      'Staff had to search for jobs themselves, never knew which was their turn, and kept two pages open side by side',
    ),
    did: [
      l('แท็บ "งานของแผนก" เห็นทันทีว่าใบงานใดถึงคิว', 'A “My team” tab that shows at once which job is up'),
      l('แบ่งสถานะให้อ่านแล้วเข้าใจทันที', 'Statuses you understand at a glance'),
      l('บันทึกยอดการผลิตจากการ์ดได้ทันที', 'Log output right from the card'),
    ],
    big: l('ขึ้นระบบใช้งานจริงแล้ว', 'Live in production'),
    small: l('ติดตามสถานะได้ดีมาก เห็นชัดว่าใครดำเนินการอะไรไปแล้วบ้าง', 'Status tracking works great — you can see who has done what'),
    user: 1,
  },
  {
    num: '02',
    demo: 'gr',
    tint: '#FDE6DC',
    code: l('ระบบแบ่งงานทีมกราฟิก', 'Graphic team workload system'),
    context: l('ทีมกราฟิก · หัวหน้าทีม', 'Graphic team · team lead'),
    title: l('เห็นทันทีว่าใครมีงานมาก ใครว่าง ก่อนมอบหมายงาน', 'See who’s overloaded and who’s free before handing out work'),
    problem: l(
      'ทีมกราฟิกต้องทำงานจนดึก เพราะไม่มีใครทราบว่าใครมีงานมากหรือน้อย การกระจายงานจึงไม่ทั่วถึง',
      'The graphic team stayed late because nobody knew who had too much work and who had too little',
    ),
    did: [
      l('นับภาระงานเป็นพอยท์ ให้เห็นเป็นตัวเลขเดียวกัน', 'Workload counted as points — one shared number'),
      l('แถบภาระงานรายบุคคล เห็นก่อนมอบหมายว่าใครว่าง', 'A per-person workload bar that shows who’s free'),
      l('มอบหมายงานได้ในไม่กี่คลิก', 'Assign work in a few clicks'),
    ],
    big: l('ผลตอบรับจากทีม: ดีมาก', 'Team feedback: great'),
    small: l('กระจายงานได้ทั่วถึงขึ้น โดยไม่ต้องคาดเดาว่าใครว่าง', 'Work spread more evenly, no guessing who’s free'),
    user: 2,
  },
  {
    num: '03',
    demo: 'os',
    tint: '#FFE7A3',
    code: l('ระบบติดตามงานส่งนอก', 'Outsourced-work tracking'),
    context: l('ฝ่ายผลิต · ฝ่ายบัญชี', 'Production · accounting'),
    title: l('ทราบทันทีว่าสินค้าอยู่ที่ร้านภายนอก หรือส่งกลับมาแล้ว', 'Know at once whether the goods are at the outside shop or back with us'),
    problem: l(
      'หลังส่งงานออกไปร้านภายนอก ไม่ทราบว่าสินค้ายังอยู่ที่ร้านหรือส่งกลับมาแล้ว และตัวเลขอ่านเข้าใจยาก',
      'Once work went to an outside shop, nobody knew whether it was still there or back — the numbers were confusing',
    ),
    did: [
      l('ทดลองใช้ระบบเดิมจนพบจุดที่ทำให้ผู้ใช้เข้าใจผิด', 'Used the old system until I found what misled people'),
      l('ออกแบบสถานะใหม่ให้อ่านแล้วเข้าใจทันที', 'Redesigned statuses that read at a glance'),
      l('ให้ผู้ใช้ทดลองใช้ mockup ก่อนส่งต่อทีมพัฒนา', 'Let users click the mockup before it went to dev'),
    ],
    big: l('เจอบั๊กตั้งแต่ขั้น mockup', 'Caught a bug at the mockup stage'),
    small: l('ทุกคนเห็นได้ว่าสถานะงานถึงไหนแล้ว', 'Everyone can see where each job stands'),
    user: 3,
  },
]
