import { Hero } from '@/features/hero'
import { Work } from '@/features/work'
import { SeniorProject } from '@/features/senior-project'
import { Method } from '@/features/method'
import { Person } from '@/features/person'
import { Contact } from '@/features/contact'

/**
 * หน้าเดียว ตามดีไซน์ v4 "สมุดสติกเกอร์ (ปรับใหม่)"
 * หน้าแรก → 01 งาน (+ งานอื่น) → โปรเจคจบ → 02 วิธีทำงาน → 03 ตัวตน → 04 ติดต่อ
 * ลำดับต้องตรงกับ SECTIONS ใน constants/sections.ts (แถบข้างใช้ลำดับนั้น)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <SeniorProject />
      <Method />
      <Person />
      <Contact />
    </>
  )
}
