import { l } from '../types'
import type { L } from '../types'

export type ImpactItem = {
  id: string
  /** คำเรียกผลลัพธ์แบบที่คนในวงการใช้ — ไม่ใช่ชื่อฟีเจอร์ */
  title: L
  body: L
  tags: string[]
}

/**
 * ตอบคำถามเดียว: "แล้วสร้าง impact อะไรไว้บ้าง"
 *
 * ต่างจาก projects ตรงที่ไม่เล่าว่าทำอะไร แต่เล่าว่าเปลี่ยนอะไรไป
 * recruiter เปิดมาหน้าเดียวควรเห็นค่าของคนคนนี้ได้เลยโดยไม่ต้องอ่านเคสจนจบ
 */
export const impact: ImpactItem[] = [
  {
    id: 'process-improvement',
    title: l('Process Improvement', 'Process Improvement'),
    body: l(
      'เปลี่ยนกระบวนการที่พึ่งใบสั่งงานกระดาษให้เป็น digital workflow ที่แต่ละแผนกติดตามสถานะของตัวเองได้ ไม่ต้องเดินไปถามหรือรอกระดาษใบใหม่',
      'Turned a paper-driven job-sheet process into a digital workflow where each department tracks its own status, instead of walking over to ask or waiting for the next printout.',
    ),
    tags: ['Process Improvement', 'Digital Workflow', 'Operational Efficiency'],
  },
  {
    id: 'single-source',
    title: l('Single Source of Truth', 'Single Source of Truth'),
    body: l(
      'รวมงานที่เคยตามกันใน Excel สามไฟล์คนละเจ้าของ ให้เหลือแหล่งข้อมูลเดียว เลิกเถียงกันว่าไฟล์ไหนคือตัวจริง',
      'Consolidated work tracked across three separately owned spreadsheets into one source, ending the argument over which file was correct.',
    ),
    tags: ['Gap Analysis', 'Decision Log', 'Traceability'],
  },
  {
    id: 'self-service',
    title: l('Customer Self-Service', 'Customer Self-Service'),
    body: l(
      'ออกแบบให้ลูกค้าเช็กสถานะงานเองได้ภายใต้ขอบเขตข้อมูลที่ตกลงไว้ ฝ่ายขายเลยไม่ต้องเป็นตัวกลางตอบคำถามเดิมทั้งวัน',
      'Designed a way for clients to check status themselves within an agreed data boundary, so sales stopped being the middleman for the same question all day.',
    ),
    tags: ['Data Scoping', 'User Flow', 'Access Control'],
  },
  {
    id: 'dev-alignment',
    title: l('Development Alignment', 'Development Alignment'),
    body: l(
      'วางมาตรฐาน spec และ mockup ให้ทีมที่เดิมไม่มีเอกสารกลาง จนกลายเป็นวิธีทำงานปกติของทีม ไม่ใช่ของที่ผมทำอยู่คนเดียว',
      'Introduced a spec-and-mockup standard to a team that had no shared document, until it became how the team works rather than something only I did.',
    ),
    tags: ['Specification', 'Acceptance Criteria', 'Stakeholder Alignment'],
  },
  {
    id: 'risk',
    title: l('Workflow & Risk Design', 'Workflow & Risk Design'),
    body: l(
      'ออกแบบสายอนุมัติ สิทธิ์การเข้าถึง และกติกากำกับภาพที่สร้างด้วย AI ให้ตรวจย้อนกลับได้ และไม่มีใครเข้าใจผิดว่าภาพจำลองคือของจริง',
      'Designed approval flows, access rules, and labelling for AI-generated imagery so decisions stay traceable and nobody mistakes a simulation for the real product.',
    ),
    tags: ['Approval Flow', 'Permission Design', 'Risk & Safeguards'],
  },
]
