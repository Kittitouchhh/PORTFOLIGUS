import type { L } from '@/types/i18n.type'
import { l } from '@/types/i18n.type'

/**
 * ข้อความ UI กลาง (nav, ปุ่ม, หัวข้อ section)
 * เนื้อหาจริงของแต่ละ section อยู่ใน src/data/*
 */
export const ui = {
  'nav.about': l('เกี่ยวกับ', 'About'),
  'nav.skills': l('ทักษะ', 'Skills'),
  'nav.process': l('วิธีทำงาน', 'Process'),
  'nav.work': l('ผลงาน', 'Work'),
  'nav.experience': l('ประสบการณ์', 'Experience'),
  'nav.learning': l('กำลังเรียนรู้', 'Learning'),
  'nav.contact': l('ติดต่อ', 'Contact'),

  'hero.cta.contact': l('ติดต่อผม', 'Get in touch'),
  'hero.scroll': l('เลื่อนลง', 'Scroll'),

  'section.stats.title': l('ตัวเลขคร่าว ๆ', 'By the numbers'),
  'section.stats.desc': l(
    'สรุปจากงานที่ทำจริง — ตัวเลขปัดโดยประมาณ ไม่ระบุชื่อลูกค้าหรือระบบ',
    'Rounded figures from real work — no client or system names disclosed.',
  ),

  'section.about.title': l('เกี่ยวกับผม', 'About me'),
  'section.skills.title': l('ทักษะ', 'Skills'),
  'section.skills.desc': l(
    'แบ่งตามระดับที่ใช้งานได้จริง ไม่ใช่แค่เคยเห็นผ่านตา',
    'Grouped by what I can actually ship with, not what I have merely seen.',
  ),
  'section.process.title': l('ผมทำงานยังไง', 'How I work'),
  'section.process.desc': l(
    'ตั้งแต่รับโจทย์จากลูกค้า จนถึงส่งมอบและตามผลลัพธ์',
    'From taking a client request to delivery and follow-up.',
  ),
  'section.work.title': l('ผลงาน', 'Selected work'),
  'section.work.desc': l(
    'ทุกเคสเล่าแบบไม่เปิดเผยข้อมูล — ไม่มีชื่อระบบจริง ชื่อลูกค้า หรือโค้ดของบริษัท ภาพประกอบเป็น mockup ที่ทำขึ้นใหม่',
    'Every case is anonymised — no real system names, client names, or company code. All visuals are re-created mockups.',
  ),
  'section.experience.title': l('เส้นทางการทำงาน', 'Experience'),
  'section.learning.title': l('กำลังเรียนรู้อยู่', 'Currently learning'),
  'section.learning.desc': l(
    'สิ่งที่ยังไม่เก่ง แต่ลงมือฝึกอยู่ทุกสัปดาห์',
    'Things I am not good at yet, but practise every week.',
  ),
  'section.contact.title': l('คุยกันได้', 'Let us talk'),

  'work.role': l('บทบาท', 'Role'),
  'work.problem': l('โจทย์', 'Problem'),
  'work.did': l('สิ่งที่ผมทำ', 'What I did'),
  'work.result': l('ผลลัพธ์', 'Outcome'),
  'work.stack': l('เครื่องมือ', 'Stack'),
  'work.confidential': l('ข้อมูลปกปิด', 'Confidential'),

  'skills.level.core': l('ใช้งานหลัก', 'Core'),
  'skills.level.working': l('ใช้งานได้', 'Working'),
  'skills.level.learning': l('กำลังฝึก', 'Learning'),

  'contact.email': l('อีเมล', 'Email'),
  'contact.copy': l('คัดลอก', 'Copy'),
  'contact.copied': l('คัดลอกแล้ว', 'Copied'),
  'contact.note': l(
    'เปิดรับงาน full-time และงานพาร์ทไทม์เล็ก ๆ ตอบกลับภายใน 1–2 วัน',
    'Open to full-time roles and small side projects. I reply within 1–2 days.',
  ),

  'theme.toggle': l('สลับธีม', 'Toggle theme'),
  'lang.toggle': l('เปลี่ยนภาษา', 'Switch language'),

  'footer.builtWith': l('เว็บนี้เขียนด้วย', 'Built with'),
  'footer.rights': l('สงวนลิขสิทธิ์', 'All rights reserved'),
  'footer.disclaimer': l(
    'เนื้อหาทั้งหมดในเว็บนี้เป็นการเล่าเชิงกระบวนการ ไม่มีซอร์สโค้ด ข้อมูลลูกค้า หรือทรัพย์สินทางปัญญาของนายจ้าง',
    'All content here describes process only. No source code, client data, or employer IP is included.',
  ),

  'eyebrow.about': l('ตัวตน', 'Profile'),
  'eyebrow.skills': l('สิ่งที่ทำได้', 'Capabilities'),
  'eyebrow.process': l('ขั้นตอนการทำงาน', 'Method'),
  'eyebrow.work': l('ผลงานที่เล่าได้', 'Case studies'),
  'eyebrow.experience': l('ที่ผ่านมา', 'Track record'),
  'eyebrow.learning': l('ยังไม่จบ', 'In progress'),
  'eyebrow.contact': l('ขั้นต่อไป', 'Next step'),

  'form.name': l('ชื่อ', 'Name'),
  'form.email': l('อีเมล', 'Email'),
  'form.message': l('เล่าให้ฟังหน่อย', 'What is this about?'),
  'form.namePlaceholder': l('เรียกคุณว่าอะไรดี', 'What should I call you?'),
  'form.emailPlaceholder': l('ไว้ตอบกลับ', 'So I can reply'),
  'form.messagePlaceholder': l('งานแบบไหน ทีมเป็นยังไง เริ่มเมื่อไหร่', 'What is the role, the team, the timeline?'),
  'form.submit': l('ส่งข้อความ', 'Send message'),
  'form.submitting': l('กำลังส่ง...', 'Sending...'),
  'form.success': l(
    'ส่งเรียบร้อยแล้ว ผมจะตอบกลับภายใน 1–2 วันครับ',
    'Sent. I will get back to you within a day or two.',
  ),
  'form.successAgain': l('ส่งอีกข้อความ', 'Send another'),
  'form.failed': l(
    'ส่งไม่สำเร็จ ลองใหม่อีกครั้ง หรืออีเมลมาตรง ๆ ก็ได้ครับ',
    'Could not send that. Try again, or just email me directly.',
  ),
  'form.rateLimited': l(
    'ส่งถี่เกินไป รอสักครู่แล้วลองใหม่นะครับ',
    'That is a few too many. Give it a minute and try again.',
  ),
  'form.orEmail': l('หรือจะติดต่อทางนี้ก็ได้', 'Or reach me directly'),

  'intro.eyebrow': l('แนะนำตัว', 'Introduction'),
  'intro.email': l('อีเมล', 'Email'),

  'eyebrow.gallery': l('หน้างานจริง', 'On the ground'),
  'section.gallery.title': l('ที่ทำงานจริง', 'Where the work happens'),
  'index.gallery': l('00', '00'),

  'brand.short': l('กิตติธัช', 'Kittitouch'),

  'hero.ctaDev': l('อยากได้คนคุยกับลูกค้า', 'You need someone client-facing'),
  'hero.ctaReq': l('อยากได้คนเก็บ requirement', 'You need requirements gathered'),
  'hero.toolbelt': l('เครื่องมือที่ใช้ประจำ', 'Tools I reach for'),

  'index.about': l('01', '01'),
  'index.skills': l('02', '02'),
  'index.process': l('03', '03'),
  'index.work': l('04', '04'),
  'index.experience': l('05', '05'),
  'index.learning': l('06', '06'),
  'index.contact': l('07', '07'),
} satisfies Record<string, L>

export type UiKey = keyof typeof ui
