import { l } from '../types'
import type { L, Txt } from '../types'

export type SkillLevel = 'core' | 'working' | 'learning'

export type Skill = {
  name: Txt
  level: SkillLevel
  note?: L
}

export type SkillGroup = {
  id: string
  title: L
  desc: L
  skills: Skill[]
}

/**
 * แบ่งเป็น 3 ระดับ ตรงไปตรงมา:
 *   core     = ใช้ส่งงานจริงได้เอง
 *   working  = ทำได้แต่ยังต้องเปิดเอกสาร
 *   learning = กำลังฝึก ยังไม่กล้ารับงานเดี่ยว
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'discover',
    title: l('เก็บโจทย์และสื่อสาร', 'Discovery & communication'),
    desc: l(
      'ส่วนที่ทำให้โค้ดที่เขียนออกมาแล้วตรงกับที่ลูกค้าต้องการ',
      'The part that makes the code match what the client actually wanted.',
    ),
    skills: [
      {
        name: l('เก็บ requirement จากลูกค้า', 'Requirement gathering'),
        level: 'core',
        note: l('สัมภาษณ์ ถามย้อน ตรวจสมมติฐาน', 'Interview, probe, validate assumptions'),
      },
      { name: l('จดและสรุปประชุม', 'Meeting notes & summaries'), level: 'core' },
      { name: l('เขียน spec และ acceptance criteria', 'Specs & acceptance criteria'), level: 'working' },
      {
        name: l('ทำ mockup / wireframe', 'Mockups & wireframes'),
        level: 'core',
        note: l('Figma และภาพร่างมือ', 'Figma and hand sketches'),
      },
      { name: l('เขียน user flow / process flow', 'User & process flows'), level: 'working' },
      { name: l('นำเสนอ demo ให้ลูกค้า', 'Demoing to clients'), level: 'working' },
    ],
  },
  {
    id: 'business',
    title: l('ความเข้าใจธุรกิจ', 'Business understanding'),
    desc: l(
      'ไม่ได้มองฟีเจอร์เป็นรายการ แต่มองว่าธุรกิจได้อะไร',
      'I read a feature list as a business outcome, not a checklist.',
    ),
    skills: [
      { name: l('อ่านกระบวนการทำงานขององค์กร', 'Reading how an org actually works'), level: 'working' },
      { name: l('แยกของที่ "ต้องมี" ออกจาก "อยากได้"', 'Separating must-have from nice-to-have'), level: 'core' },
      { name: l('ประเมินผลกระทบก่อนเปลี่ยนระบบ', 'Impact assessment before changes'), level: 'learning' },
      { name: l('คุยกับผู้ใช้หน้างาน', 'Talking to frontline users'), level: 'core' },
    ],
  },
  {
    id: 'sales',
    title: l('โซลูชันและงานก่อนการขาย', 'Solution & pre-sales'),
    desc: l(
      'เชื่อม business problem เข้ากับ solution ที่อธิบายได้ทั้งกับลูกค้าและทีมเทคนิค',
      'Connecting a business problem to a solution that holds up in front of both the client and the technical team.',
    ),
    skills: [
      {
        name: l('คุยกับลูกค้าและจับความต้องการก่อนเสนอ', 'Client conversations & pre-sales discovery'),
        level: 'core',
        note: l('ฟังก่อน แล้วค่อยเสนอ', 'Listen first, pitch second'),
      },
      { name: l('นำเสนอ demo และตอบคำถามเชิงเทคนิค', 'Demos & technical Q&A'), level: 'working' },
      {
        name: l('ประเมิน scope และความเป็นไปได้ก่อนรับปาก', 'Scoping & feasibility before committing'),
        level: 'working',
        note: l('ข้อดีของการเคยเขียนโค้ดเอง', 'The upside of having written code myself'),
      },
      { name: l('เขียนข้อเสนอและขอบเขตงาน', 'Proposals & statements of work'), level: 'learning' },
      { name: l('ติดตามลูกค้าต่อเนื่องจนจบดีล', 'Following up through to close'), level: 'learning' },
    ],
  },
  {
    id: 'build',
    title: l('พื้นฐานเทคนิค', 'Technical grounding'),
    desc: l(
      'ไม่ได้ตั้งใจไปเป็น dev เต็มตัว แต่มีพอให้คุยกับทีมรู้เรื่องและประเมิน scope ได้',
      'Not aiming to be a full-time dev — enough to talk to the team properly and size up scope.',
    ),
    skills: [
      { name: 'JavaScript / TypeScript', level: 'core' },
      { name: 'React', level: 'core' },
      { name: 'HTML / CSS', level: 'core' },
      { name: 'Tailwind CSS', level: 'core' },
      {
        name: 'REST API',
        level: 'working',
        note: l('ทั้งเรียกใช้และช่วยออกแบบ', 'Both consuming and helping design'),
      },
      {
        name: 'SQL',
        level: 'working',
        note: l('query, join, ออกรายงาน', 'Queries, joins, reporting'),
      },
      { name: 'Git / GitHub', level: 'working' },
      { name: 'Node.js', level: 'learning' },
      { name: 'Docker', level: 'learning' },
      { name: 'Testing (unit / e2e)', level: 'learning' },
    ],
  },
  {
    id: 'methods',
    title: l('เครื่องมือและวิธีทำงาน', 'Tools & methods'),
    desc: l(
      'คำเรียกที่ใช้กันจริงในสายงาน — ใส่ไว้เฉพาะอันที่หยิบมาใช้กับงานจริงแล้ว',
      'The vocabulary this job actually runs on — listed only where I have used it on real work.',
    ),
    skills: [
      { name: 'Requirement Gathering', level: 'core' },
      { name: 'Process Mapping', level: 'core' },
      { name: 'Gap Analysis', level: 'core' },
      { name: 'User Story / Acceptance Criteria', level: 'core' },
      { name: 'Specification / API Spec', level: 'core' },
      { name: 'Solution Design', level: 'working' },
      { name: 'Stakeholder Management', level: 'working' },
      { name: 'Decision & Risk Log', level: 'working' },
      { name: 'Traceability', level: 'working' },
      { name: 'UAT / Test Planning', level: 'working' },
      { name: 'Permission & Access Design', level: 'working' },
      {
        name: 'Technical Feasibility',
        level: 'working',
        note: l('ประเมินจากพื้นฐานที่เคยเขียนโค้ดเอง', 'Judged from having written the code myself'),
      },
      { name: 'Figma', level: 'core' },
      { name: 'Miro', level: 'working' },
      { name: 'Git / GitHub', level: 'working' },
    ],
  },
  {
    id: 'language',
    title: l('ภาษา', 'Languages'),
    desc: l('ใช้สื่อสารในงาน', 'For working communication.'),
    skills: [
      { name: l('ไทย — ภาษาแม่', 'Thai — native'), level: 'core' },
      {
        name: l('อังกฤษ — อ่านเอกสารและเขียนได้', 'English — read & write'),
        level: 'working',
        note: l('กำลังฝึกพูดอยู่ทุกสัปดาห์', 'Practising speaking every week'),
      },
    ],
  },
]
