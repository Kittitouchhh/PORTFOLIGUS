import { l } from '../types'
import type { L } from '../types'

export type Stat = {
  id: string
  value: string
  suffix?: L
  label: L
  detail: L
}

/**
 * ตัวเลข "ปัดโดยประมาณ" — เล่าปริมาณงานได้โดยไม่หลุดข้อมูลลูกค้า
 * ไม่ระบุชื่อบริษัทลูกค้า บอกแค่ขนาดธุรกิจพอให้เห็นสเกล
 */
export const stats: Stat[] = [
  {
    id: 'scale',
    value: '100',
    suffix: l('ล้านบาท/ปี', 'M THB/yr'),
    label: l('ขนาดธุรกิจของลูกค้าที่ระบบรองรับ', 'Revenue scale the system runs on'),
    detail: l(
      'ระบบหลักที่ใช้เดินงานทั้งองค์กร ไม่ใช่เครื่องมือเสริมของแผนกใดแผนกหนึ่ง',
      'A core system running the whole operation, not a side tool for one department.',
    ),
  },
  {
    id: 'ramp',
    value: '3',
    suffix: l('เดือน', 'months'),
    label: l('จากฝึกงานจนรับงาน BA เองทั้งหมด', 'From intern to owning the BA work'),
    detail: l(
      'เริ่มจากฝึกงานเดือนมิถุนายน 2569 ยังไม่ถึงปี แต่รับผิดชอบ requirement เอกสาร และ mockup เองทั้งหมด',
      'Started as an intern in June 2026. Less than a year in, and already owning requirements, documentation, and mockups end to end.',
    ),
  },
  {
    id: 'docs',
    value: '90+',
    label: l('เอกสาร spec ที่เขียนเอง', 'Specs written myself'),
    detail: l(
      'requirement, spec ฟีเจอร์, เอกสาร API และ acceptance checklist ที่ทีมพัฒนาใช้ทำงานจริง',
      'Requirements, feature specs, API docs, and acceptance checklists the dev team builds from.',
    ),
  },
  {
    id: 'closed',
    value: '1',
    suffix: l('ดีล', 'deal'),
    label: l('ปิดการขายเอง', 'Closed end to end'),
    detail: l(
      'ตั้งแต่คุยครั้งแรก เก็บโจทย์ เสนอ จนลูกค้าตัดสินใจ',
      'From first conversation through discovery and proposal to the client signing.',
    ),
  },
]
