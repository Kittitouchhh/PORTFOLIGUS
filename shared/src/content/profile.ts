import { l } from '../types'

/**
 * ข้อมูลตัวเอง — แก้ตรงนี้ที่เดียว
 * กติกา: ห้ามใส่ชื่อระบบภายใน ชื่อลูกค้า หรือรายละเอียดสัญญา
 */
export const profile = {
  name: l('กิตติธัช', 'Kittitouch'),
  fullName: l('กิตติธัช สกุลศักดิ์พินิจ', 'Kittitouch Sakulsakpinit'),

  /** ชื่อเล่น — ขึ้นเป็นบรรทัดเล็กใต้ชื่อเต็มในหัวข้อแนะนำตัว */
  nickname: l('กัส', 'Gus'),
  role: l(
    'Business Analyst · Technology Solutions · Pre-Sales',
    'Business Analyst · Technology Solutions · Pre-Sales',
  ),

  /** ย่อหน้าเดียวจบแบบเรซูเม่ — ใช้ตอนคนอ่านมีเวลาสิบวินาที */
  summary: l(
    'นักศึกษาวิศวกรรมคอมพิวเตอร์ชั้นปีที่ 4 ที่ทำงานเป็น Business Analyst ไปด้วยระหว่างเรียน ดูแลงานลูกค้าตั้งแต่นั่งฟังปัญหา เก็บ requirement วิเคราะห์กระบวนการ ไปจนถึงออกแบบโซลูชัน ทำ mockup และเขียน spec ให้ทีมพัฒนาหยิบไปทำต่อได้ ตอนนี้อยู่กับงาน ERP ระดับองค์กร ได้เข้าพบเจ้าของกิจการและผู้บริหารเอง นำเสนอระบบให้ลูกค้า และมีส่วนในการปิดโครงการ พื้นฐานการเขียนโค้ดช่วยให้ประเมินได้ตามจริงว่าอะไรทำได้ ใช้เวลาประมาณเท่าไหร่ และไม่รับปากลูกค้าเกินกว่าที่ทีมทำไหว',
    'A fourth-year computer engineering student working as a business analyst alongside my degree. I take client work from sitting down and listening, through requirement gathering and process analysis, to solution design, mockups, and specs the development team can build from. Right now that means enterprise ERP work — meeting client owners and executives directly, presenting the system, and playing a part in closing the project. A coding background keeps my estimates honest about what is buildable and how long it takes, so I never promise more than the team can deliver.',
  ),
  /**
   * คติประจำใจ — ประโยคเปิดใต้พาดหัว อ่านจบในลมหายใจเดียวและต้องจำได้
   * ท่อนหน้าคือฝั่งธุรกิจ ท่อนหลังคือฝั่งเทคโนโลยี ตัวประโยคเองทำหน้าที่เชื่อมสองฝั่ง
   */
  tagline: l(
    'เชื่อมความต้องการของธุรกิจ เข้ากับโซลูชันทางเทคโนโลยี',
    'Connecting business needs with technology solutions.',
  ),
  /**
   * สามย่อหน้าในหัวข้อ "เกี่ยวกับผม" — เขียนด้วยน้ำเสียงที่เจ้าตัวใช้แนะนำตัวเองจริง ๆ
   * ลำดับ: ผมเป็นใคร → ผมชอบอะไรและถนัดอะไร → แล้วต่อจากนี้จะไปทางไหน
   * ห้ามเกลาจนเป็นภาษาโบรชัวร์ ความเป็นคนพูดคือของที่คนอ่านจำได้
   */
  intro: l(
    'สวัสดีครับ ผมกิตติธัช สกุลศักดิ์พินิจ เรียกผมสั้น ๆ ว่ากัสก็ได้ครับ ตอนนี้เป็นนักศึกษาคณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยธุรกิจบัณฑิตย์ ชั้นปีที่ 4 เริ่มจากได้รับมอบหมายให้ฝึกงาน 2 เดือนช่วงมิถุนายนถึงกรกฎาคม แล้วได้ทำงานต่อระหว่างเรียนในตำแหน่ง Business Analyst',
    'Hello — I am Kittitouch Sakulsakpinit, and Gus is fine. I am a fourth-year computer engineering student in the Faculty of Engineering at Dhurakij Pundit University. I started with a two-month internship over June and July, and have carried on since as a business analyst alongside my classes.',
  ),
  introSecondary: l(
    'ผมชอบที่ได้พูดคุยกับผู้คน ชอบรับฟังปัญหา และชอบช่วยคิดหาวิธีแก้ให้ทั้งลูกค้าและคนในองค์กรเอง และเพราะพอมีความรู้ด้านการเขียนโค้ดอยู่บ้าง ผมเลยรู้ขอบเขตของระบบว่าแต่ละฟีเจอร์ที่ลูกค้าต้องการนั้นทำได้หรือไม่ได้ ต้องใช้เวลาประมาณเท่าไหร่ ทำให้ผมคุยเป็นภาษาเดียวกันได้ทั้งกับ Dev และกับลูกค้า แล้วพาสองฝั่งมาเข้าใจตรงกัน',
    'What I enjoy is talking to people, listening to the problem, and helping work out the fix — for clients and for the people inside the company alike. And because I can write code well enough to know where a system’s edges are, I can tell whether a feature a client asks for is buildable and roughly how long it takes. That is what lets me speak the same language as the developers and the client, and bring both sides to the same understanding.',
  ),
  introMotivation: l(
    'ต่อจากนี้ผมหวังว่าจะได้เก็บประสบการณ์อีกมากมาย ถึงมันจะยาก แต่ผมก็จะพยายามครับ :)',
    'From here, I hope to pick up a great deal more experience. I know it gets hard — I will keep at it. :)',
  ),
  location: l('กรุงเทพฯ ประเทศไทย', 'Bangkok, Thailand'),
  basedIn: l('อยู่ที่กรุงเทพฯ ประเทศไทย', 'Based in Bangkok, Thailand.'),

  /**
   * พาดหัวหน้าแรก — บรรทัดคี่ (ที่ 2, 4, …) จะแสดงเป็นตัวกลวงสลับกันไป
   * ตั้งใจให้มีแค่สองบรรทัด ตำแหน่งที่เหลือไปอยู่ที่ roles ด้านล่างแทน
   * พาดหัวยาวเกินสองบรรทัดเมื่อไหร่ มันจะกลายเป็นรายการตำแหน่ง ไม่ใช่พาดหัวอีกต่อไป
   */
  headline: {
    lines: [
      l('นักวิเคราะห์ธุรกิจ', 'Business Analyst'),
      l('& นักแก้ปัญหา', '& Problem Solver'),
    ],
  },

  /** ตำแหน่งที่เหลือ — วางเป็นบรรทัดเล็กใต้พาดหัว ไม่เอาขึ้นตัวใหญ่ */
  roles: [
    l('Business Development', 'Business Development'),
    l('Tech Sales', 'Tech Sales'),
    l('เก็บ Requirement', 'Requirements'),
  ],

  availability: l('เปิดรับโอกาสใหม่', 'Open to opportunities'),
  email: 'Kittitouch.dev@gmail.com',
  phone: '+66 81-399-6955',

  // TODO: ใส่ลิงก์จริงของตัวเอง แล้วลบอันที่ไม่มี
  links: [
    { label: 'GitHub', href: 'https://github.com/Kittitouchhh', handle: '@Kittitouchhh' },
    { label: 'LinkedIn', href: '#', handle: 'linkedin.com/in/…' },
  ],

  /** ไฟล์ CV วางไว้ที่ public/cv.pdf แล้วเปลี่ยนเป็น true */
  resume: { enabled: false, href: '/cv.pdf' },
} as const
