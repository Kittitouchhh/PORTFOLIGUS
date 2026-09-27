import type { L } from '@/types/i18n.type'
import { l } from '@/types/i18n.type'

/**
 * ข้อความ UI กลาง (nav, ปุ่ม, หัวข้อ section)
 * เนื้อหาจริงของแต่ละ section อยู่ใน src/data/*
 */
export const ui = {
  'nav.about': l('ตัวตน', 'About'),
  'nav.project': l('โปรเจคจบ', 'Senior project'),
  'nav.hello': l('ติดต่อเพิ่มเติม', 'Get in touch'),
  'nav.top': l('หน้าแรก', 'Home'),
  'nav.method': l('วิธีทำงาน', 'How I work'),
  'nav.work': l('งาน', 'Work'),
  'nav.contact': l('ติดต่อ', 'Contact'),
  'nav.menuOpen': l('เปิดเมนู', 'Open menu'),
  'nav.menuClose': l('ปิดเมนู', 'Close menu'),
  'resume.view': l('ดูเรซูเม่', 'View resume'),
  'resume.short': l('เรซูเม่', 'Resume'),
  'resume.menu': l('ดูเรซูเม่ (PDF)', 'View resume (PDF)'),

  'contact.copy': l('คัดลอก', 'Copy'),
  'contact.copied': l('คัดลอกแล้ว', 'Copied'),
  'theme.toggle': l('สลับธีม', 'Toggle theme'),
  'lang.toggle': l('เปลี่ยนภาษา', 'Switch language'),

  'form.name': l('ชื่อ', 'Name'),
  'form.email': l('อีเมล', 'Email'),
  'form.message': l('รายละเอียด', 'Message'),
  'form.namePlaceholder': l('ชื่อ-นามสกุล หรือชื่อบริษัท', 'Your name or company'),
  'form.emailPlaceholder': l('อีเมลสำหรับติดต่อกลับ', 'Email for my reply'),
  'form.messagePlaceholder': l('ตำแหน่งหรือโปรเจกต์ ขอบเขตงาน และช่วงเวลาที่ต้องการเริ่ม', 'The role or project, its scope, and when you would like to start'),
  'form.submit': l('ส่งข้อความ', 'Send message'),
  'form.submitting': l('กำลังส่ง...', 'Sending...'),
  'form.success': l(
    'ได้รับข้อความแล้ว ขอบคุณครับ ผมจะติดต่อกลับภายใน 1–2 วันทำการ',
    'Message received, thank you. I will reply within 1–2 business days.',
  ),
  'form.successAgain': l('ส่งอีกข้อความ', 'Send another'),
  'form.failed': l(
    'ส่งข้อความไม่สำเร็จ กรุณาลองอีกครั้ง หรือติดต่อทางอีเมลโดยตรง',
    'The message could not be sent. Please try again or contact me by email.',
  ),
  'form.rateLimited': l(
    'ส่งข้อความถี่เกินไป กรุณารอสักครู่แล้วลองใหม่',
    'Too many messages in a short time. Please wait a moment and try again.',
  ),
  'form.tooManyLinks': l('ข้อความมีลิงก์มากเกินไป กรุณาใส่ลิงก์ไม่เกิน 2 ลิงก์', 'Too many links — please include at most 2.'),
  'form.duplicate': l('ข้อความนี้ถูกส่งไปแล้วครับ ผมจะติดต่อกลับโดยเร็ว', 'This message was already sent — I’ll get back to you soon.'),
  'intro.email': l('อีเมล', 'Email'),
  'intro.phone': l('โทรศัพท์', 'Phone'),



  'lang.autoSwitched': l(
    'เปลี่ยนเป็นภาษาไทยให้แล้ว · กด TH/EN บนแถบบนเพื่อสลับกลับ',
    'Switched to Thai — use TH/EN up top to switch back',
  ),

} satisfies Record<string, L>

export type UiKey = keyof typeof ui
