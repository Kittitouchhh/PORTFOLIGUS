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
    /** ฝึกงาน 2 เดือน (มิ.ย. – ก.ค. 2569) แล้วทำงานต่อระหว่างเรียนมาจนถึงตอนนี้ */
    period: l('มิ.ย. 2569 – ปัจจุบัน', 'June 2026 – present'),
    role: l(
      'Business Analyst — เริ่มจากฝึกงานตำแหน่ง Full-stack Developer',
      'Business Analyst — started as a full-stack developer intern',
    ),
    org: l('BluePeak Innovation Co., Ltd.', 'BluePeak Innovation Co., Ltd.'),
    orgColor: '#00E5FF',
    current: true,
    points: [
      l('เข้ามาฝึกงาน 2 เดือน (มิ.ย. – ก.ค.) เดือนแรกอยู่สาย Full-stack Developer แล้วย้ายมาสาย Business Analysis และ Solution Design ตั้งแต่นั้น จบฝึกงานแล้วได้ทำงานต่อระหว่างเรียน', 'A two-month internship (June to July): the first month as a full-stack developer, then a move into business analysis and solution design that has stuck. I stayed on after the internship, working alongside my classes.'),
      l('รับผิดชอบงาน ERP ระดับองค์กร เข้าพบเจ้าของกิจการและผู้บริหารของลูกค้าเอง', 'Responsible for enterprise ERP work, meeting client owners and executives directly.'),
      l('จัด workshop เก็บ requirement กับพนักงานโรงงานกว่า 30 คน และฝ่ายขายอีกกว่า 20 คน เป็นคนนำวงคุยและถามย้ำจนความต้องการชัด', 'Facilitated requirements workshops with 30+ factory employees and 20+ sales staff, leading the discussion and probing until the requirements were clear.'),
      l('ทำ Gap Analysis และ mapping ระดับฟิลด์ข้ามเอกสาร 7 ประเภท ก่อนสรุปประเด็นค้างให้ผู้ขายยืนยันก่อน kickoff', 'Ran gap analysis and field-level mapping across seven document types, consolidating open issues for vendor confirmation before kickoff.'),
      l('เขียน User Story, Acceptance Criteria และ Decision / Assumption / Risk Log แยกให้ชัดว่าอะไรลูกค้ายืนยันแล้ว อะไรคือสมมติฐานของเราเอง', 'Wrote user stories, acceptance criteria, and decision / assumption / risk logs that separate what the client confirmed from what we assumed.'),
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
