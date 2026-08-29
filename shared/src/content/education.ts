import { l } from '../types'
import type { L } from '../types'

export type Education = {
  degree: L
  school: L
  period: L
  gpa: string
  gpaNote: L
  honours: L[]
  /** สหกิจศึกษา — ช่วงที่ว่างรับงานเต็มเวลา */
  coop: {
    period: L
    mode: L
    note: L
  }
  /** ตำแหน่งที่กำลังมองหา */
  targetRoles: L[]
}

/**
 * ข้อมูลการศึกษาและช่วงที่ว่าง — ตรงกับที่เขียนไว้ในเรซูเม่
 * ปี พ.ศ. ในฝั่งไทย = ปี ค.ศ. ในฝั่งอังกฤษ ตรวจให้ตรงกันทุกครั้งที่แก้
 */
export const education: Education = {
  degree: l(
    'วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมคอมพิวเตอร์',
    'B.Eng. in Computer Engineering',
  ),
  school: l('มหาวิทยาลัยธุรกิจบัณฑิตย์', 'Dhurakij Pundit University'),
  period: l('กำลังศึกษาอยู่ชั้นปีที่ 4', 'Currently in the fourth year'),
  gpa: '3.46',
  gpaNote: l('เกรดเฉลี่ยสะสมถึงภาคเรียนที่ 2/2568', 'Cumulative GPA through semester 2/2025'),
  honours: [
    l('ทุนการศึกษายกเว้นค่าเล่าเรียนเต็มจำนวนตลอด 4 ปี', 'Full four-year tuition scholarship'),
  ],
  coop: {
    period: l('ม.ค. – เม.ย. 2570', 'Jan – Apr 2027'),
    mode: l('สหกิจศึกษา · เต็มเวลา', 'Cooperative education · full-time'),
    note: l(
      'ช่วงที่ลงไปทำงานเต็มเวลาได้จริง ไม่ใช่เข้าอาทิตย์ละสองวัน',
      'A block I can work full-time, not two days a week around a class schedule.',
    ),
  },
  targetRoles: [
    l('Pre-Sales / IT Solutions', 'Pre-Sales / IT Solutions'),
    l('Solution Consulting', 'Solution Consulting'),
    l('Business Analysis', 'Business Analysis'),
    l('Technology Business Development', 'Technology Business Development'),
  ],
}
