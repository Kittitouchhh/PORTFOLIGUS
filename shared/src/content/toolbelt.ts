/**
 * แถบเครื่องมือใต้พาดหัวหน้าแรก — "เครื่องมือที่ใช้ประจำ"
 *
 * แต่ก่อนแถบนี้ดึงทักษะระดับ core ทั้งหมดมาวิ่ง ซึ่งได้ประโยคยาว ๆ อย่าง
 * "เก็บ requirement จากลูกค้า" กับ "ไทย — ภาษาแม่" ติดมาด้วย อ่านผ่าน ๆ แล้วไม่ใช่ "เครื่องมือ"
 * เลยแยกออกมาคุมเองตรงนี้ที่เดียว จะเพิ่มหรือตัดก็แก้ไฟล์นี้ไฟล์เดียว
 *
 * กติกา: ใส่เฉพาะของที่หยิบมาใช้กับงานจริงแล้วเท่านั้น
 *   tool   = โปรแกรม/ภาษา/ของที่เปิดขึ้นมาใช้จริง  → ตัวหนา
 *   method = วิธีทำงานหรือเอกสารที่ส่งมอบ          → ตัวปกติ
 *
 * เรียงสลับ tool กับ method ไว้ ไม่ให้แถบวิ่งเป็นก้อนโปรแกรมล้วนแล้วตามด้วยศัพท์ล้วน
 */
export type ToolKind = 'tool' | 'method'

export type ToolbeltItem = {
  name: string
  kind: ToolKind
}

export const toolbelt: ToolbeltItem[] = [
  { name: 'Figma', kind: 'tool' },
  { name: 'Requirement Gathering', kind: 'method' },
  { name: 'Miro', kind: 'tool' },
  { name: 'Process Mapping', kind: 'method' },
  { name: 'HTML Mockup', kind: 'tool' },
  { name: 'Gap Analysis', kind: 'method' },
  { name: 'TypeScript', kind: 'tool' },
  { name: 'User Story & Acceptance Criteria', kind: 'method' },
  { name: 'React', kind: 'tool' },
  { name: 'API Specification', kind: 'method' },
  { name: 'Tailwind CSS', kind: 'tool' },
  { name: 'Solution Design', kind: 'method' },
  { name: 'SQL', kind: 'tool' },
  { name: 'UAT / Test Planning', kind: 'method' },
  { name: 'REST API', kind: 'tool' },
  { name: 'Decision & Risk Log', kind: 'method' },
  { name: 'Git / GitHub', kind: 'tool' },
  { name: 'Traceability Matrix', kind: 'method' },
  { name: 'Stakeholder Management', kind: 'method' },
]
