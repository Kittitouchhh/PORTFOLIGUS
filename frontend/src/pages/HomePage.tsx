import { Hero } from '@/features/hero'
import { Intro } from '@/features/intro'
import { Stats } from '@/features/stats'
import { Impact } from '@/features/impact'
import { Experience } from '@/features/experience'
import { Work } from '@/features/work'
import { Process } from '@/features/process'
import { Skills } from '@/features/skills'
import { About } from '@/features/about'
import { Education } from '@/features/education'
import { Learning } from '@/features/learning'
import { Gallery } from '@/features/gallery'
import { Contact } from '@/features/contact'

/**
 * ทั้งเว็บอยู่ในหน้าเดียว — เมนูบนแค่พาเลื่อนไปหาหัวข้อ
 * ลำดับตรงนี้ต้องตรงกับ SECTIONS ใน constants/sections.ts (scrollspy ใช้ลำดับนั้นตัดสิน)
 *
 * เรียงแบบทำความรู้จักก่อนค่อยดูผลงาน:
 * เขาเป็นใคร → เรียนอะไรมา → เปลี่ยนอะไรไปแล้ว → เคยทำที่ไหน → เคสจริง → ทำงานยังไง → ทักษะ
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <About />
      <Education />
      <Stats />
      <Impact />
      <Experience />
      <Work />
      <Process />
      <Skills />
      <Learning />
      <Gallery />
      <Contact />
    </>
  )
}
