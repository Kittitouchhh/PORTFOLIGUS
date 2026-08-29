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
 *
 * กติกา: ทุกตัวเลขในนี้ต้องตอบได้ว่านับจากอะไร ถ้าตอบไม่ได้ให้ตัดทิ้ง
 * ไม่ใช่ใส่ไว้ให้ดูเยอะ แล้วไปจนมุมตอนถูกถามในห้องสัมภาษณ์
 */
export const stats: Stat[] = [
  {
    id: 'scale',
    value: '100',
    suffix: l('ล้านบาท/ปี', 'M THB/yr'),
    label: l('ขนาดธุรกิจที่ระบบรองรับ', 'Revenue scale the system runs on'),
    detail: l(
      'ระบบหลักที่ใช้เดินงานทั้งองค์กร ไม่ใช่เครื่องมือเสริมของแผนกใดแผนกหนึ่ง',
      'A core system running the whole operation, not a side tool for one department.',
    ),
  },
  {
    id: 'docs',
    value: '90+',
    label: l('เอกสารและ specification ของโครงการ', 'Project documents & specifications'),
    detail: l(
      'requirement, spec ฟีเจอร์, API spec, acceptance criteria และ decision log ที่ทีมพัฒนาใช้ทำงานจริง',
      'Requirements, feature specs, API specs, acceptance criteria, and decision logs the dev team builds from.',
    ),
  },
  {
    id: 'stakeholders',
    value: '50+',
    suffix: l('คน', 'people'),
    label: l('ผู้เกี่ยวข้องที่นั่งเก็บ requirement ด้วยตัวเอง', 'Stakeholders interviewed first-hand'),
    detail: l(
      'พนักงานโรงงานกว่า 30 คนและฝ่ายขายอีกกว่า 20 คน ตั้งแต่เจ้าของกิจการจนถึงคนหน้างาน',
      '30+ factory employees and 20+ sales staff — from company owners down to the people on the floor.',
    ),
  },
  {
    id: 'mapping',
    value: '7',
    suffix: l('ประเภทเอกสาร', 'document types'),
    label: l('Gap analysis และ mapping ระดับฟิลด์', 'Gap analysis & field-level mapping'),
    detail: l(
      'ไล่เทียบทีละฟิลด์ว่าของเดิมมีอะไร ระบบใหม่ต้องรับอะไร แล้วอะไรคือช่องว่างที่ต้องตัดสินใจ',
      'Field by field: what the old way holds, what the new system must accept, and which gaps need a decision.',
    ),
  },
  {
    id: 'closed',
    value: '1',
    suffix: l('โครงการ', 'project'),
    label: l('ร่วมตั้งแต่คุยครั้งแรกจนปิดงาน', 'Supported from first call to close'),
    detail: l(
      'อยู่ตั้งแต่ discovery เก็บโจทย์ นำเสนอ จนโครงการปิด — ไม่ได้รับผิดชอบเป้าการขาย แต่มีส่วนร่วมทุกขั้น',
      'Present through discovery, requirements, and presentation until the project closed — not carrying a sales quota, but involved at every step.',
    ),
  },
  {
    id: 'scope',
    value: 'E2E',
    label: l('ขอบเขตงานที่รับผิดชอบ', 'The span I own'),
    detail: l(
      'Discovery → Requirement → Solution Design → Specification → Delivery — ไม่ได้ส่งต่อแล้วจบ',
      'Discovery → requirement → solution design → specification → delivery. Not a hand-off and out.',
    ),
  },
]
