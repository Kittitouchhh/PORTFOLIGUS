import { l } from '../types'
import type { L } from '../types'

export type LearningItem = {
  id: string
  topic: L
  why: L
  how: L
  /** ความคืบหน้าคร่าว ๆ 0–100 ใช้แค่สื่อสาร ไม่ใช่ตัวชี้วัดจริงจัง */
  progress: number
}

export const learning: LearningItem[] = [
  {
    id: 'ba-process',
    topic: l('กระบวนการ BA ที่เป็นแบบแผน', 'Formal BA process & standards'),
    why: l(
      'ที่ผ่านมาผมสร้างเอกสารและ mockup ขึ้นมาเองจากศูนย์ เพราะทีมยังไม่มีใครทำ มันได้ผล แต่เป็นวิธีของผมคนเดียว อยากไปเห็นองค์กรที่มีมาตรฐานชัดเจนว่าเขาทำละเอียดและเป็นระบบกว่านี้แค่ไหน',
      'So far I built the documents and mockups from scratch because nobody on the team was doing it. It worked, but it is my own method. I want to see how an organisation with real standards does this — how much more rigorous and structured it gets.',
    ),
    how: l('เทียบ template ของตัวเองกับมาตรฐานสากล และอ่านเคสการทำงานของทีม BA ในองค์กรใหญ่', 'Benchmarking my own templates against established standards and reading how BA teams work inside larger organisations.'),
    progress: 35,
  },
  {
    id: 'english',
    topic: l('ภาษาอังกฤษ — การพูด', 'English — speaking'),
    why: l(
      'อ่านเอกสารและเขียนได้อยู่แล้ว แต่เวลาประชุมกับคนต่างชาติยังพูดไม่ทันความคิด',
      'I already read and write it, but in meetings my speaking still lags behind my thinking.',
    ),
    how: l('ฝึกพูดตามและสรุปสิ่งที่อ่านเป็นภาษาอังกฤษทุกสัปดาห์', 'Shadowing, and summarising what I read in English every week.'),
    progress: 55,
  },
  {
    id: 'backend',
    topic: l('งานฝั่งหลังบ้าน (Node.js)', 'Back end (Node.js)'),
    why: l(
      'อยากออกแบบ API ได้เองตั้งแต่ต้น ไม่ใช่แค่เป็นคนเรียกใช้',
      'I want to design the API from the start, not just consume it.',
    ),
    how: l('เขียน API ของโปรเจกต์ส่วนตัวเองทั้งหมด', 'Writing the full API for my own side projects.'),
    progress: 40,
  },
  {
    id: 'testing',
    topic: l('การเขียนเทสต์', 'Automated testing'),
    why: l(
      'เคยแก้ของหนึ่งแล้วอีกที่พังโดยไม่รู้ตัว ไม่อยากให้เกิดอีก',
      'I once fixed one thing and silently broke another. I do not want that again.',
    ),
    how: l('เริ่มจากเขียน unit test ให้ตรรกะที่ซับซ้อนก่อน', 'Starting with unit tests around the trickiest logic.'),
    progress: 30,
  },
  {
    id: 'system-design',
    topic: l('การออกแบบระบบ', 'System design'),
    why: l(
      'อยากตอบได้ว่าทางเลือกแต่ละแบบแลกอะไรกับอะไร ก่อนจะเลือก',
      'I want to be able to name the trade-offs before picking an approach.',
    ),
    how: l('อ่านเคสจริงแล้วลองวาดสถาปัตยกรรมของระบบที่เคยทำใหม่', 'Reading real case studies and re-drawing architectures for systems I have worked on.'),
    progress: 25,
  },
]
