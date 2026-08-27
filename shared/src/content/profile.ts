import { l } from '../types'

/**
 * ข้อมูลตัวเอง — แก้ตรงนี้ที่เดียว
 * กติกา: ห้ามใส่ชื่อระบบภายใน ชื่อลูกค้า หรือรายละเอียดสัญญา
 */
export const profile = {
  name: l('กิตติธัช', 'Kittitouch'),
  fullName: l('กิตติธัช สกุลศักดิ์พินิจ', 'Kittitouch Sakulsakpinit'),
  role: l(
    'Business Analyst / Business Development / Tech Sales',
    'Business Analyst / Business Development / Tech Sales',
  ),
  tagline: l(
    'ฟังให้ออกว่าลูกค้าต้องการอะไรจริง ๆ เขียนเป็นเอกสารและ mockup ที่ทีม dev ทำต่อได้ทันที',
    'I listen for what a client actually needs, then turn it into specs and mockups a dev team can build from directly.',
  ),
  intro: l(
    'ผมทำงานสายวิเคราะห์ธุรกิจในบริษัทที่ทำระบบให้ลูกค้าองค์กร งานประจำวันของผมคือนั่งคุยกับลูกค้าเพื่อดึงความต้องการออกมา เขียนเป็น requirement และ spec ให้ทีมเข้าใจตรงกัน ทำ mockup ให้ลูกค้าเคาะก่อนเริ่มพัฒนา แล้วตามต่อจนระบบส่งมอบได้จริง',
    'I work as a business analyst at a company that builds systems for enterprise clients. My day is sitting with clients to pull out what they actually need, writing it up as requirements and specs the team reads the same way, mocking it up for sign-off before development starts, and staying on it until the system ships.',
  ),
  introSecondary: l(
    'สิ่งที่ผมถนัดคือการเป็นตัวกลางระหว่าง “สิ่งที่ลูกค้าพูด” กับ “สิ่งที่ระบบต้องทำ” ผมชอบถามจนกว่าจะเข้าใจว่าธุรกิจเขาได้อะไร ไม่ใช่แค่รับโจทย์มาส่งต่อ และเพราะมีพื้นฐานสาย dev อยู่ ผมเลยเขียน spec กับทำ mockup ที่ทีมพัฒนาหยิบไปทำต่อได้ทันที และประเมินได้ว่าอะไรทำได้จริงในเวลาเท่าไหร่ ไม่รับปากลูกค้าเกินกว่าที่ทีมทำไหว',
    'What I am good at is standing between what a client says and what the system must do. I keep asking until I understand what the business gets out of it, rather than passing a feature list along. And because I have a developer’s grounding, the specs and mockups I hand over are ones the team can build from directly — and I can tell what is realistic in the time we have, so I never promise a client more than the team can deliver.',
  ),
  introMotivation: l(
    'ที่ทำงานสายนี้เพราะชอบแก้ปัญหาและชอบสร้างอะไรที่คนได้ใช้จริง ความรู้สึกตอนเห็นคนหน้างานทำงานเร็วขึ้นเพราะระบบที่เราช่วยออกแบบ คือเหตุผลที่ยังสนุกกับงานนี้อยู่ ตอนนี้กำลังมองหาที่ที่ทำงานเป็นระบบและละเอียดกว่านี้ เพื่อจะได้เรียนรู้วิธีทำงานที่เป็นแบบแผนจริง ๆ',
    'I am in this line of work because I like solving problems and building things people actually use. Watching someone on the floor get their work done faster because of a system I helped shape is the part that keeps this interesting. What I am looking for now is somewhere more structured and more rigorous, so I can learn how this work is done to a real standard.',
  ),
  location: l('กรุงเทพฯ ประเทศไทย', 'Bangkok, Thailand'),
  basedIn: l('อยู่ที่กรุงเทพฯ ประเทศไทย', 'Based in Bangkok, Thailand.'),

  /**
   * พาดหัวหน้าแรก — บรรทัดคี่ (ที่ 2, 4, …) จะแสดงเป็นตัวกลวงสลับกันไป
   * เขียนให้สั้น บรรทัดละคำสองคำ ยิ่งเพิ่มบรรทัดตัวยิ่งเล็กลง เกิน 6 บรรทัดแล้วจะเริ่มไม่มีพลัง
   */
  headline: {
    lead: l('สวัสดีครับ ผมชื่อกิตติธัช ผมเป็น', 'Hi, my name is Kittitouch and I am a'),
    lines: [
      l('นักวิเคราะห์ธุรกิจ', 'Business Analyst'),
      l('& นักออกแบบ', '& Designer'),
      l('& นักแก้ปัญหา', '& Problem Solver'),
      l('& พยายามเข้าใจธุรกิจ', '& Business Curious'),
      l('& คนปิดการขาย', '& Deal Closer'),
    ],
  },
  availability: l('เปิดรับโอกาสใหม่', 'Open to opportunities'),
  email: 'Kittitouch.dev@gmail.com',

  // TODO: ใส่ลิงก์จริงของตัวเอง แล้วลบอันที่ไม่มี
  links: [
    { label: 'GitHub', href: 'https://github.com/Kittitouchhh', handle: '@Kittitouchhh' },
    { label: 'LinkedIn', href: '#', handle: 'linkedin.com/in/…' },
  ],

  /** ไฟล์ CV วางไว้ที่ public/cv.pdf แล้วเปลี่ยนเป็น true */
  resume: { enabled: false, href: '/cv.pdf' },
} as const
