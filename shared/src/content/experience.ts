import { l } from '../types'
import type { L } from '../types'

export type TimelineItem = {
  id: string
  period: L
  role: L
  org: L
  /** สีแบรนด์ขององค์กร ใช้เป็นจุดแต้มเล็ก ๆ หน้าชื่อ ไม่ใส่ก็ได้ */
  orgColor?: string
  /** true = ยังทำอยู่ตอนนี้ */
  current?: boolean
  points: L[]
}

/**
 * TODO: แก้ช่วงเวลาให้ตรงกับของจริง
 * ไม่ต้องใส่รายละเอียดโครงการที่มี NDA — เล่าเป็นหน้าที่ที่รับผิดชอบพอ
 */
export const timeline: TimelineItem[] = [
  {
    id: 'current',
    period: l('มิ.ย. 2569 – ปัจจุบัน', 'Jun 2026 – present'),
    role: l('Business Analyst — เริ่มจากฝึกงาน', 'Business Analyst — started as an intern'),
    org: l('Bluepeak Innovations', 'Bluepeak Innovations'),
    orgColor: '#00E5FF',
    current: true,
    points: [
      l('เริ่มจากฝึกงานเดือน มิ.ย.–ก.ค. 2569 แล้วได้ทำงานต่อจนถึงปัจจุบัน', 'Started as an intern in June–July 2026, then stayed on and have been here since.'),
      l('เก็บ requirement เองทุกงาน ทั้งฝั่งผู้บริหารและคนหน้างาน แล้วสรุปกลับให้ทีมเข้าใจตรงกัน', 'Run every requirement session myself, with both management and frontline staff, then write them back so the team reads them the same way.'),
      l('เป็นคนแรกในทีมที่เริ่มทำ spec และ mockup ส่งให้ dev จากเดิมที่ทีมไม่มีเอกสารกลาง', 'First on the team to start handing developers written specs and mockups, where before there was no shared document at all.'),
      l('เขียนเอกสาร spec ฟีเจอร์ เอกสาร API และ acceptance criteria กว่า 90 ชิ้น', 'Wrote 90+ feature specs, API documents, and acceptance criteria.'),
      l('ทำ mockup หน้าจอเองทั้งหมด ให้ลูกค้าเคาะก่อนเริ่มพัฒนา ลดงานแก้ทีหลัง', 'Produced every screen mockup myself for client sign-off before development started, cutting rework later.'),
      l('ปิดการขายเองหนึ่งดีล ตั้งแต่คุยครั้งแรกจนลูกค้าตัดสินใจ', 'Closed one deal end to end, from the first conversation to the client signing.'),
      l('ดูแลลูกค้าต่อเนื่องรายเดือน 3 ราย', 'Support three clients on an ongoing monthly basis.'),
      l('ทดสอบตามเช็กลิสต์ แจ้งบั๊ก และตามจนแก้จบ', 'Test against the checklist, report defects, and follow them through to closed.'),
    ],
  },
  {
    id: 'study',
    period: l('ก่อนหน้านั้น', 'Before that'),
    role: l('เรียนรู้ด้วยตัวเอง / โปรเจกต์ส่วนตัว', 'Self-study & personal projects'),
    org: l('—', '—'),
    points: [
      l('ฝึกเขียนเว็บจากโปรเจกต์ของตัวเอง ตั้งแต่ HTML/CSS จนถึง React — พื้นฐานที่ทำให้คุยกับทีม dev รู้เรื่อง', 'Learned web development through my own projects, from HTML/CSS through React — the grounding that lets me talk to a dev team properly.'),
      l('อ่านเอกสารภาษาอังกฤษเป็นหลัก จนใช้ทำงานได้', 'Read English documentation as the primary source until it became workable.'),
    ],
  },
]
