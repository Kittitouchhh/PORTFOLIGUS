import { l } from '../types'
import type { L } from '../types'

export type Project = {
  id: string
  /** true = งานบริษัท เล่าได้เฉพาะกระบวนการ ไม่มีชื่อระบบ/ลูกค้า/โค้ด */
  confidential: boolean
  title: L
  context: L
  role: L
  problem: L
  contributions: L[]
  outcome: L[]
  stack: string[]
  /** ชนิดของ mockup ที่จะวาดประกอบ (ดู components/ui/MockupFrame.tsx) */
  mockup: 'dashboard' | 'form' | 'table' | 'flow'
  href?: string
}

/**
 * ⚠️ กติกาของไฟล์นี้
 * งานที่ confidential: true ห้ามใส่ชื่อระบบจริง ชื่อลูกค้า ตัวเลขทางการเงิน
 * ภาพ หรือสคีมาฐานข้อมูล — เล่าได้แค่ "ผมทำอะไร ใช้ทักษะอะไร ผลเป็นยังไง"
 * ภาพประกอบทั้งหมดเป็น mockup ที่วาดขึ้นใหม่ ไม่ใช่ภาพหน้าจอจริง
 */
export const projects: Project[] = [
  {
    id: 'production-tracking',
    confidential: true,
    title: l('หน้าติดตามงานผลิตที่มาแทนใบสั่งงานกระดาษ', 'Production tracking that replaced paper job sheets'),
    context: l('งานบริษัท — โรงงานผลิตของลูกค้าองค์กร', 'Company work — an enterprise client’s factory'),
    role: l('Business Analyst — เก็บโจทย์ ออกแบบ ทำ mockup', 'Business analyst — discovery, design, mockups'),
    problem: l(
      'ทุกเช้าต้องปริ้นใบสั่งงานออกมาแจกให้แต่ละแผนก ทั้งที่ข้อมูลทั้งหมดอยู่ในระบบอยู่แล้ว คนหน้างานไม่มีทางรู้ว่าถึงคิวแผนกตัวเองหรือยัง ต้องเดินไปถามหรือรอกระดาษใบใหม่',
      'Every morning the floor printed job sheets to hand out to each department, even though all of that data was already in the system. Nobody on the floor could tell whether their department’s turn had come up — they had to go ask, or wait for the next sheet.',
    ),
    contributions: [
      l('ไปนั่งดูหน้างานทีละแผนกว่าจริง ๆ แล้วเขาอ่านอะไรจากกระดาษใบนั้น', 'Sat with each department to see what they were actually reading off that sheet.'),
      l('นิยาม “งานของแผนกฉัน” กับ “พร้อมผลิต” ให้เป็นกติกาเดียวทั้งระบบ ไม่ให้แต่ละแผนกตีความกันเอง', 'Defined “my department’s work” and “ready to produce” as one rule for the whole system, so no department could interpret it differently.'),
      l('ออกแบบชุดฟิลเตอร์และการ์ดสรุปที่กดแล้วกรองลิสต์ได้ทันที พร้อมสัญลักษณ์สีบอกงานที่เลยกำหนดและงานที่ยังไม่เริ่ม', 'Designed the filter set and summary cards that filter the list on click, with colour markers for overdue work and work not yet started.'),
      l('ทำ mockup เป็นไฟล์ HTML ที่กดเล่นได้จริงทุกปุ่ม ส่งให้ลูกค้าเคาะและให้ dev ทำต่อได้ทันที', 'Built the mockup as a working HTML file — every button clickable — for client sign-off and for developers to build straight from.'),
    ],
    outcome: [
      l('เลิกปริ้นใบสั่งงานรายวัน ประหยัดกระดาษและเวลาเดินแจก', 'Daily job-sheet printing stopped, saving paper and the time spent walking them around.'),
      l('แต่ละแผนกเห็นสถานะที่อัปเดตเองโดยไม่ต้องถามใคร', 'Each department sees status that updates itself, without having to ask anyone.'),
      l('หน้าตาและตรรกะชุดนี้ถูกยกไปใช้ซ้ำในหน้าอื่นของระบบ กลายเป็นแบบมาตรฐานของทีม', 'The same layout and logic were reused on other screens and became the team’s house pattern.'),
    ],
    stack: ['Requirement discovery', 'Process mapping', 'HTML mockup', 'Acceptance criteria'],
    mockup: 'table',
  },
  {
    id: 'ops-report',
    confidential: true,
    title: l('รายงานติดตามงานที่มาแทน Excel กรอกมือ', 'An operations report that replaced hand-kept spreadsheets'),
    context: l('งานบริษัท — ทีมปฏิบัติการของลูกค้าองค์กร', 'Company work — an enterprise client’s operations team'),
    role: l('Business Analyst — เจ้าของเอกสารทั้งชุด', 'Business analyst — owned the full document set'),
    problem: l(
      'ทีมปฏิบัติการติดตามงานที่ยังไม่เสร็จผ่านไฟล์ Excel สามไฟล์ที่กรอกมือ แต่ละไฟล์คนละเจ้าของ พอตัวเลขไม่ตรงกันก็ไม่มีใครตอบได้ว่าอันไหนจริง',
      'The operations team tracked unfinished work in three hand-maintained spreadsheets, each with a different owner. When the numbers disagreed, nobody could say which one was right.',
    ),
    contributions: [
      l('ทำ gap analysis เทียบสิ่งที่ไฟล์เดิมทำได้ กับสิ่งที่ระบบมีอยู่แล้ว ก่อนตัดสินใจว่าจะสร้างอะไรใหม่', 'Ran a gap analysis between what the spreadsheets did and what the system already had, before deciding what to build.'),
      l('เขียน decision log ทุกข้อ ระบุเหตุผลและสิ่งที่ยกเลิก เพื่อให้ย้อนกลับมาอ่านได้ว่าทำไมถึงตัดสินใจแบบนั้น', 'Kept a decision log — every call, its reasoning, and what it superseded — so anyone could go back and see why.'),
      l('เขียน test plan, traceability และ acceptance checklist ให้ผูกทุกข้อกำหนดกับเคสทดสอบที่ตรวจได้จริง', 'Wrote the test plan, traceability matrix, and acceptance checklist so every requirement tied to a case someone could actually verify.'),
      l('ตรวจประสิทธิภาพแล้วเขียนแยกไว้ว่าข้อไหนแก้แล้ว ข้อไหนตั้งใจชะลอเพราะยังไม่ใช่คอขวดจริง', 'Audited performance and recorded which items were fixed and which were deliberately deferred because they were not yet the real bottleneck.'),
      l('ระบุ open questions และสิ่งที่ยังไม่ได้ทดสอบไว้ตรง ๆ ไม่กลบว่าพร้อมทั้งที่ยังไม่พร้อม', 'Listed the open questions and untested areas openly, rather than calling it ready when it was not.'),
    ],
    outcome: [
      l('ได้เอกสารครบชุด 11 ฉบับที่ทีมใช้ทำงานต่อได้จริง ไม่ใช่เอกสารที่เขียนไว้เฉย ๆ', 'A complete set of 11 documents the team actually worked from, not shelfware.'),
      l('ตัวเลขมาจากแหล่งเดียว เลิกเถียงกันว่าไฟล์ไหนถูก', 'One source for the numbers, ending the argument over which file was correct.'),
      l('การตัดสินใจที่เคยอยู่แค่ในหัวคนกลายเป็นของที่คนใหม่เข้ามาอ่านเองได้', 'Decisions that used to live in someone’s head became something a newcomer could read.'),
    ],
    stack: ['Gap analysis', 'Decision log', 'Test plan', 'Traceability', 'Acceptance checklist'],
    mockup: 'dashboard',
  },
  {
    id: 'client-share-link',
    confidential: true,
    title: l('ลิงก์ให้ลูกค้าดูสถานะงานโดยไม่ต้องมีบัญชี', 'A public link so clients can check status without an account'),
    context: l('งานบริษัท — ใช้ระหว่างฝ่ายขายกับลูกค้า', 'Company work — between the sales team and their clients'),
    role: l('Business Analyst — ออกแบบ flow และขอบเขตข้อมูล', 'Business analyst — flow and data-scope design'),
    problem: l(
      'ลูกค้าทักมาถามสถานะงานทางแชทตลอดวัน พนักงานขายต้องเปิดระบบไปดูแล้วพิมพ์ตอบทีละครั้ง จะให้ลูกค้าเข้าระบบเองก็ไม่ได้ เพราะข้างในมีข้อมูลที่ลูกค้าไม่ควรเห็น',
      'Clients messaged asking for status all day, and sales had to open the system and type an answer each time. Giving clients an account was not an option — the system holds things they should not see.',
    ),
    contributions: [
      l('ไล่ทีละฟิลด์ว่าอันไหนเปิดให้ลูกค้าเห็นได้ อันไหนห้าม แล้วเขียนเป็นข้อตกลงไว้ก่อนเริ่มพัฒนา', 'Went field by field on what a client may and may not see, and wrote it down as an agreement before development started.'),
      l('ออกแบบ flow ลิงก์ที่เปิดดูได้โดยไม่ต้องล็อกอิน แต่ยังจำกัดว่าเห็นได้แค่ใบงานใบเดียว', 'Designed a link that opens without login yet still scopes the viewer to a single job.'),
      l('ออกแบบการ์ดพรีวิวตอนวางลิงก์ในแชท ให้เห็นสถานะตั้งแต่ยังไม่กดเข้าไป', 'Designed the preview card shown when the link is pasted into chat, so status is visible before anyone clicks.'),
    ],
    outcome: [
      l('ลูกค้าเช็กเองได้ ฝ่ายขายไม่ต้องเป็นตัวกลางตอบคำถามซ้ำ ๆ', 'Clients check for themselves; sales is no longer the middleman for the same question.'),
      l('ขอบเขตข้อมูลถูกตกลงเป็นลายลักษณ์อักษรก่อนเขียนโค้ด ไม่ใช่มาเถียงกันตอนหลุด', 'The data boundary was agreed in writing before any code, rather than argued about after a leak.'),
    ],
    stack: ['Data scoping', 'User flow', 'Stakeholder alignment'],
    mockup: 'flow',
  },
  {
    id: 'approval-flow',
    confidential: true,
    title: l('ระบบอนุมัติงานตัวอย่างออนไลน์', 'An online sample-approval workflow'),
    context: l('งานบริษัท — เชื่อมฝ่ายขาย ปฏิบัติการ QC และลูกค้า', 'Company work — connecting sales, operations, QC, and the client'),
    role: l('Business Analyst — วาง flow และกติกาความปลอดภัย', 'Business analyst — flow and safeguards'),
    problem: l(
      'การอนุมัติตัวอย่างวิ่งผ่านแชทกับอีเมล พอมีปัญหาก็ไม่มีหลักฐานว่าใครอนุมัติแบบไหนตอนไหน และรูปที่ส่งให้ลูกค้าดูก็ไม่มีมาตรฐานว่าต้องถ่ายมุมไหนบ้าง',
      'Sample approvals ran through chat and email. When something went wrong there was no record of who approved what and when, and the photos sent to clients had no standard for which angles to shoot.',
    ),
    contributions: [
      l('วาด flow ห้าขั้นจากสร้างใบอนุมัติจนลูกค้าตอบกลับ ให้ทุกฝ่ายเห็นตรงกันว่าใครทำอะไรตอนไหน', 'Mapped the five-step flow from creating the approval to the client’s reply, so every party could see who does what and when.'),
      l('กำหนดมาตรฐานการถ่ายรูปว่าต้องระบุมุมและชิ้นส่วนของทุกภาพ และให้ QC วัดขนาดจริงตามเกณฑ์ที่ตกลงไว้', 'Set the photo standard — every image tagged with its angle and part — and had QC verify real measurements against an agreed tolerance.'),
      l('ออกแบบกติกาความปลอดภัย ให้รหัสยืนยันส่งแยกจากลิงก์และมีวันหมดอายุ', 'Designed the safeguards: the confirmation code travels separately from the link, and both expire.'),
      l('ยืนยันให้ภาพที่สร้างด้วย AI ต้องติดป้ายกำกับทุกใบ ไม่ปะปนกับรูปสินค้าจริง', 'Insisted that every AI-generated image carries a visible label so it is never mistaken for a photo of the real product.'),
    ],
    outcome: [
      l('การอนุมัติมีหลักฐานย้อนกลับได้ ไม่ต้องไล่หาในแชท', 'Approvals became traceable instead of buried in chat history.'),
      l('ลูกค้าเห็นชัดว่าอะไรคือรูปจริง อะไรคือภาพจำลอง', 'Clients can tell at a glance which images are real and which are simulated.'),
    ],
    stack: ['Process design', 'Cross-team alignment', 'Risk & safeguards', 'HTML mockup'],
    mockup: 'form',
  },
  {
    id: 'spec-practice',
    confidential: true,
    title: l('วางมาตรฐานเอกสารและ mockup ให้ทีมพัฒนา', 'Bringing specs and mockups to a team that had none'),
    context: l('งานบริษัท — ริเริ่มเอง', 'Company work — my own initiative'),
    role: l('เจ้าของงาน', 'Owner'),
    problem: l(
      'ทีมไม่มีเอกสารกลาง โจทย์วิ่งจากลูกค้าเข้าหา dev ผ่านการบอกปากเปล่ากับแชท พอกลับมาอ่านทีหลังก็ไม่รู้ว่าอะไรคือสิ่งที่ลูกค้ายืนยันแล้ว อะไรคือสิ่งที่เราเดาเอง',
      'The team had no shared document. Requirements travelled from client to developer by word of mouth and chat, and reading it back later you could not tell what the client had confirmed from what we had assumed.',
    ),
    contributions: [
      l('เป็นคนแรกในทีมที่เริ่มส่ง spec และ mockup ให้ dev แทนการบอกปากเปล่า', 'Was the first on the team to hand developers a written spec and a mockup instead of a verbal brief.'),
      l('ออกแบบเทมเพลตที่แยก “ลูกค้ายืนยันแล้ว” ออกจาก “สมมติฐานของเรา” อย่างชัดเจน พร้อมช่องผู้ตัดสินใจและวันที่', 'Designed a template that separates “client confirmed” from “our assumption”, with fields for who decided and when.'),
      l('ทำ mockup เป็น HTML ที่กดเล่นได้ ไม่ใช่ภาพนิ่ง เพื่อให้ลูกค้าทดลองใช้และ dev หยิบไปทำต่อได้เลย', 'Built mockups as clickable HTML rather than flat images, so clients could try them and developers could lift them directly.'),
      l('ลองใช้กับงานตัวเองก่อน แล้วค่อยปรับตาม feedback ของเพื่อนร่วมทีม', 'Used it on my own work first, then refined it from teammates’ feedback.'),
    ],
    outcome: [
      l('เอกสารกลายเป็นวิธีทำงานปกติของทีม ไม่ใช่ของที่ผมทำอยู่คนเดียว', 'Written specs became how the team works, not something only I did.'),
      l('เวลาลูกค้าเปลี่ยนใจ ย้อนกลับไปดูได้ว่าเคยตกลงอะไรไว้', 'When a client changes their mind, we can point back to what was agreed.'),
    ],
    stack: ['Documentation', 'Process design', 'HTML mockup'],
    mockup: 'flow',
  },
  {
    id: 'portfolio',
    confidential: false,
    title: l('เว็บพอร์ตโฟลิโอนี้', 'This portfolio site'),
    context: l('โปรเจกต์ส่วนตัว', 'Personal project'),
    role: l('ทำเองทั้งหมด', 'Everything'),
    problem: l(
      'อยากมีที่เล่าว่าทำอะไรได้ โดยไม่แตะข้อมูลของที่ทำงาน',
      'I wanted somewhere to show what I can do without touching anything my employer owns.',
    ),
    contributions: [
      l('ออกแบบโครงสร้างข้อมูลให้เนื้อหาแยกจากคอมโพเนนต์ แก้เนื้อหาได้โดยไม่ต้องแตะ UI', 'Structured content separately from components, so copy changes never touch the UI.'),
      l('ทำระบบสองภาษาไทย/อังกฤษ และโหมดมืด', 'Built a Thai/English toggle and dark mode.'),
      l('เขียนด้วย TypeScript ทั้งหมด ให้ type ช่วยกันพลาด', 'Written entirely in TypeScript so the types catch my mistakes.'),
    ],
    outcome: [
      l('เพิ่มผลงานใหม่ได้ด้วยการแก้ไฟล์ data ไฟล์เดียว', 'Adding a new case study means editing one data file.'),
      l('โค้ดเปิดดูได้บน GitHub', 'The source is public on GitHub.'),
    ],
    stack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite'],
    mockup: 'form',
    href: 'https://github.com/Kittitouchhh',
  },
]
