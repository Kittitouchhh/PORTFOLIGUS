import { Hero } from '@/features/hero'
import { Work } from '@/features/work'
import { SeniorProject } from '@/features/senior-project'
import { Method } from '@/features/method'
import { Person } from '@/features/person'
import { Contact } from '@/features/contact'
import { HeroDesktop } from '@/features/hero/desktop/HeroDesktop'
import { WorkDesktop } from '@/features/work/desktop/WorkDesktop'
import { SeniorProjectDesktop } from '@/features/senior-project/desktop/SeniorProjectDesktop'
import { MethodDesktop } from '@/features/method/desktop/MethodDesktop'
import { PersonDesktop } from '@/features/person/desktop/PersonDesktop'
import { ContactDesktop } from '@/features/contact/desktop/ContactDesktop'
import { useIsDesktop } from '@/hooks/useIsDesktop'

/**
 * หน้าเดียว ตามดีไซน์ v4 "สมุดสติกเกอร์ (ปรับใหม่)"
 * หน้าแรก → 01 งาน (+ งานอื่น) → โปรเจคจบ → 02 วิธีทำงาน → 03 ตัวตน → 04 ติดต่อ
 * จอคอม (≥ 1100px) ใช้ชุดหน้าตาเดิม (โฟลเดอร์ desktop ของแต่ละ feature) · มือถือ/ไอแพดใช้ชุด v8 — สลับด้วย media query ไม่กระทบกัน
 * ลำดับต้องตรงกับ SECTIONS ใน constants/sections.ts (แถบข้างใช้ลำดับนั้น)
 */
export default function HomePage() {
  const desktop = useIsDesktop()

  if (desktop) {
    return (
      <>
        <HeroDesktop />
        <WorkDesktop />
        <SeniorProjectDesktop />
        <MethodDesktop />
        <PersonDesktop />
        <ContactDesktop />
      </>
    )
  }

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
