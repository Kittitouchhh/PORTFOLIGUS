import { l } from '../types'
import type { L } from '../types'

export type ProcessStep = {
  id: string
  step: string
  title: L
  summary: L
  /** สิ่งที่ได้ออกมาจริงในขั้นนี้ */
  outputs: L[]
}

/**
 * เล่าวิธีทำงานตั้งแต่รับโจทย์ถึงส่งมอบ
 * — เป็นกระบวนการล้วน ๆ ไม่มีข้อมูลลูกค้าหรือระบบจริง
 */
export const processSteps: ProcessStep[] = [
  {
    id: 'listen',
    step: '01',
    title: l('นั่งฟังก่อน ยังไม่เสนออะไร', 'Listen first, propose nothing yet'),
    summary: l(
      'รอบแรกผมไม่พูดถึงเทคโนโลยีเลย ให้ลูกค้าเล่าว่าตอนนี้ทำงานกันยังไง ติดตรงไหน ใครเดือดร้อน แล้วจดตามคำพูดเขาจริง ๆ ไม่รีบตีความ',
      'In the first session I never mention technology. I let the client describe how they work today, where it hurts, and who suffers — and I write it down in their words, not my interpretation.',
    ),
    outputs: [
      l('บันทึกประชุมแบบดิบ', 'Raw meeting notes'),
      l('รายชื่อผู้เกี่ยวข้องและบทบาท', 'Stakeholder list with roles'),
      l('รายการปัญหาที่ลูกค้าพูดเอง', 'Pain points in the client’s own words'),
    ],
  },
  {
    id: 'clarify',
    step: '02',
    title: l('ถามย้อนจนไม่เหลือคำกำกวม', 'Ask back until nothing is vague'),
    summary: l(
      'คำว่า "ให้มันอนุมัติได้" แปลได้สิบแบบ ผมจะกลับไปถามว่าใครอนุมัติ อนุมัติแล้วเกิดอะไรต่อ ถ้าไม่อนุมัติล่ะ ย้อนกลับได้ไหม — จนได้เงื่อนไขที่เขียนเป็นข้อ ๆ ได้',
      'A phrase like "it should be approvable" has ten readings. I go back and ask who approves, what happens next, what if they reject, can it be reverted — until it becomes rules I can write down as a list.',
    ),
    outputs: [
      l('requirement เขียนเป็นข้อ ๆ', 'Numbered requirement list'),
      l('เงื่อนไขและกรณียกเว้น', 'Rules and edge cases'),
      l('สมมติฐานที่รอลูกค้ายืนยัน', 'Assumptions pending client confirmation'),
    ],
  },
  {
    id: 'summarize',
    step: '03',
    title: l('สรุปกลับไปให้ลูกค้าอ่าน', 'Summarise it back to the client'),
    summary: l(
      'ก่อนจบวันผมส่งสรุปกลับไปเสมอว่า "ที่คุยกันวันนี้ผมเข้าใจแบบนี้ ถูกไหม" ข้อผิดพลาดส่วนใหญ่ถูกจับได้ตรงนี้ ตอนที่ยังไม่มีใครเขียนโค้ดสักบรรทัด',
      'Before the day ends I send back "here is what I understood — is that right?" Most misunderstandings get caught right here, while nobody has written a single line of code yet.',
    ),
    outputs: [
      l('สรุปประชุมส่งภายในวันเดียวกัน', 'Same-day meeting summary'),
      l('ประเด็นค้างและคนที่ต้องตัดสินใจ', 'Open questions and who must decide'),
    ],
  },
  {
    id: 'mockup',
    step: '04',
    title: l('ทำ mockup ให้เห็นภาพก่อนสร้าง', 'Mock it up before building it'),
    summary: l(
      'ลูกค้าอ่านเอกสารแล้วพยักหน้า แต่พอเห็นหน้าจอมักจะพูดว่า "อ๋อ ไม่ใช่แบบนี้" ผมเลยทำ mockup ให้ดูก่อน แก้บนภาพถูกกว่าแก้บนโค้ดมาก',
      'Clients nod at a document, then see the screen and say "oh, not like that." So I show a mockup first — changing a picture is far cheaper than changing code.',
    ),
    outputs: [
      l('wireframe หน้าจอหลัก', 'Wireframes of key screens'),
      l('flow การใช้งานตั้งแต่ต้นจนจบ', 'End-to-end user flow'),
      l('การยืนยันจากลูกค้าก่อนเริ่มเขียน', 'Client sign-off before build'),
    ],
  },
  {
    id: 'build',
    step: '05',
    title: l('เขียน แล้วให้ดูเป็นระยะ', 'Build, and show it as I go'),
    summary: l(
      'ผมไม่หายไปสองเดือนแล้วโผล่มาพร้อมของเสร็จ ผมส่งให้ดูเป็นช่วง ๆ เพราะถ้าเข้าใจผิด จะได้รู้ตั้งแต่ยังแก้ทัน',
      'I do not disappear for two months and return with a finished thing. I show progress in slices, so if I misunderstood something we find out while it is still cheap to fix.',
    ),
    outputs: [
      l('ของที่ใช้งานได้จริงเป็นรอบ ๆ', 'Working increments'),
      l('demo ให้ผู้ใช้ลองกด', 'Demos users can click through'),
      l('บันทึกสิ่งที่เปลี่ยนจาก spec เดิม', 'A log of what changed from the original spec'),
    ],
  },
  {
    id: 'handover',
    step: '06',
    title: l('ส่งมอบแล้วตามผลต่อ', 'Hand over, then follow up'),
    summary: l(
      'ส่งงานไม่ใช่จบ ผมตามถามว่าใช้แล้วเป็นยังไง มีตรงไหนที่คนหน้างานยังเลี่ยงไปทำมือ เพราะตรงนั้นคือ requirement รอบหน้า',
      'Delivery is not the end. I follow up on how it is going, and where staff still work around it by hand — because that is the next round of requirements.',
    ),
    outputs: [
      l('คู่มือการใช้งานย่อ', 'Short usage guide'),
      l('รายการสิ่งที่ควรทำต่อ', 'Follow-up backlog'),
      l('feedback จากผู้ใช้จริง', 'Feedback from real users'),
    ],
  },
]
