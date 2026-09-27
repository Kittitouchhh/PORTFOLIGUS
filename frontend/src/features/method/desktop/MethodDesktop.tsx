/**
 * ⚠️ ชุดจอคอม (≥ 1100px) — โค้ดหน้าตาเดิมก่อน v8 ตามที่เจ้าของขอ (27 ก.ย.) · มือถือ/ไอแพดใช้ไฟล์ v8 ในโฟลเดอร์แม่
 * HomePage เลือกชุดด้วย useIsDesktop() — แก้เนื้อหาต้องแก้ทั้งสองชุด
 */
import { useState } from 'react'
import { Container } from '@/components/layouts/Container'
import { SectionBand } from '@/components/layouts/SectionBand'
import { Reveal } from '@/components/common/Reveal'
import { useLang } from '@/hooks/useLang'
import { useReveal } from '@/hooks/useReveal'
import { l } from '@/types/i18n.type'
import type { L } from '@portfolio/shared/types'
import { cn } from '@/utils/cn'

/**
 * 02 — วิธีทำงาน (ดีไซน์ v4) · การ์ดดำใบใหญ่
 * 7 วงกลมบนเส้นประคดเคี้ยว กดแต่ละขั้นแล้วการ์ดขาวด้านล่างเปลี่ยนเนื้อหา
 */

const STEPS: { n: string; title: L; desc: L; out: L }[] = [
  { n: '01', title: l('รับปัญหา', 'Hear the problem'), desc: l('รับฟังปัญหาจากผู้ใช้งานที่พบปัญหาโดยตรง โดยยังไม่รีบเสนอทางแก้ บันทึกตามคำบอกเล่าของผู้ใช้ว่าปัจจุบันทำงานอย่างไร ติดขัดที่ขั้นตอนใด และส่งผลกระทบต่อใครบ้าง', 'I sit with the people who actually hit the problem and don’t rush to propose anything — I write down in their words how they work now, where they get stuck and who suffers'), out: l('ได้: บันทึกประชุม · รายการปัญหาในคำพูดผู้ใช้', 'Output: meeting notes · problems in users’ own words') },
  { n: '02', title: l('ถามจนถึงต้นตอ', 'Dig to the root'), desc: l('คำว่า "ให้อนุมัติได้" ตีความได้หลายแบบ ผมจึงสอบถามเพิ่มเติมว่าใครเป็นผู้ดำเนินการ ดำเนินการแล้วเกิดอะไรต่อ และหากไม่ผ่านจะเป็นอย่างไร จนไม่เหลือประเด็นที่คลุมเครือ จากนั้นสรุป requirement ส่งให้ลูกค้าทบทวน', '“Make it approvable” means ten things — I ask back who does it, what happens next, and what if not, until nothing is vague, then send the requirements back for the client to review'), out: l('ได้: requirement เป็นข้อ ๆ ที่ลูกค้ายืนยันแล้ว', 'Output: itemised requirements the client has confirmed') },
  { n: '03', title: l('นำเสนอ solution', 'Propose a solution'), desc: l('เมื่อ requirement ชัดเจนแล้ว ผมนำเสนอแนวทางแก้ไขให้ลูกค้าพิจารณาก่อน ทั้งสิ่งที่ทำได้ ระยะเวลาโดยประมาณ และข้อดีข้อจำกัดของแต่ละแนวทาง เพื่อให้ลูกค้าเลือกทิศทางก่อนเริ่มออกแบบ', 'Once the requirements are clear I show the client the options first — what’s possible, roughly how long, and the trade-offs of each — so they set the direction before design starts'), out: l('ได้: ทางเลือก + ข้อดีข้อเสีย · ลูกค้าเคาะทิศทาง', 'Output: options + trade-offs · client sets the direction') },
  { n: '04', title: l('ออกแบบหน้าตา', 'Design the screen'), desc: l('จัดทำ mockup ที่กดใช้งานได้จริง เพื่อให้ทุกฝ่ายเห็นภาพตรงกัน เนื่องจากการปรับแก้ในขั้นออกแบบใช้ต้นทุนน้อยกว่าการแก้ไขโค้ดมาก', 'I build a clickable mockup so everyone sees the same picture — fixing a picture is far cheaper than fixing code'), out: l('ได้: mockup HTML ที่กดเล่นได้', 'Output: a clickable HTML mockup') },
  { n: '05', title: l('วาดไดอะแกรม flow', 'Draw the flow'), desc: l('ไล่ทีละขั้นตอนว่าผู้ใช้ทำอะไร ระบบตอบสนองอย่างไร และหากเกิดกรณีผิดปกติจะดำเนินการต่ออย่างไร เพื่อไม่ให้มีกรณีใดตกหล่น', 'Step by step: who taps what, how the system responds, where it goes when something’s off — so no path gets missed'), out: l('ได้: flow · use case', 'Output: flow · use cases') },
  { n: '06', title: l('นำเสนอกับ dev', 'Walk dev through it'), desc: l('ส่งมอบเอกสาร user story · use case · spec และประชุมร่วมกับทีมพัฒนาจนเข้าใจตรงกัน ก่อนเริ่มเขียนโค้ด', 'I hand over userstory · usecase · spec and talk it through until we agree, before a single line of code'), out: l('ได้: ไฟล์ 3 ชุดที่ dev หยิบไปทำได้เลย', 'Output: 3 files dev can pick up and build') },
  { n: '07', title: l('นำเสนอลูกค้า + รับความเห็น', 'Show the client + get feedback'), desc: l('นำเสนอให้ลูกค้าเห็นภาพและทดลองใช้งานด้วยตนเอง แล้วนำความคิดเห็นกลับมาปรับปรุงในรอบถัดไป', 'The client sees it, clicks it themselves, and their feedback goes into the next round'), out: l('ได้: ความเห็นจริง · รอบปรับถัดไป', 'Output: real feedback · the next round') },
]

const txt = {
  eyebrow: l('วิธีทำงาน', 'How I work'),
  t1: l('การทำงานของผม', 'How I work '),
  t2: l('ในตอนนี้', 'right now'),
  sub: l('และยังฝึกฝน เรียนรู้ เพื่อพัฒนาตนเองอยู่ทุกวัน · กดแต่ละขั้นตอนเพื่อดูรายละเอียด', 'Still practising and learning every day · tap each step'),
}

export function MethodDesktop() {
  const { t } = useLang()
  const ref = useReveal<HTMLElement>()
  const [step, setStep] = useState(2)
  const cur = STEPS[step]

  return (
    <SectionBand tone="card" className="py-12 lg:py-[60px]">
    <Container>
      <section id="method" ref={ref} className="reveal flex scroll-mt-10 flex-col gap-9 rounded-[36px] bg-ink p-6 text-page sm:p-12">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="flex flex-col gap-3">
            <p className="font-brand text-[15px] font-extrabold tracking-[0.12em] text-[#B5AFA3]">
              03 <span aria-hidden="true" className="chapter-line mx-1" /> {t(txt.eyebrow)}
            </p>
            <h2 className="text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.12] font-bold tracking-[-0.02em] !text-page">
              {t(txt.t1)}
              <span className="text-yellow">{t(txt.t2)}</span>
            </h2>
            <p className="text-[18px] leading-relaxed text-[#D6D0C4]">{t(txt.sub)}</p>
          </div>
          <img src="/stickers/gus-chin.webp" alt="" aria-hidden="true" className="anim-float hidden w-60 justify-self-end lg:block" />
        </div>

        {/* 6 ขั้นบนเส้นประ */}
        <Reveal stagger className="relative grid grid-cols-3 gap-y-6 pt-3 sm:grid-cols-4 sm:gap-3 lg:grid-cols-7">
          <svg aria-hidden="true" viewBox="0 0 1000 40" preserveAspectRatio="none" fill="none" className="absolute inset-x-0 top-[44px] hidden h-10 w-full lg:block">
            <path d="M40 20 C 140 -4, 220 44, 320 20 S 520 -4, 620 20 S 820 44, 960 20" stroke="#FFC940" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
          </svg>
          {STEPS.map((s, i) => {
            const on = i === step
            return (
              <button key={s.n} type="button" aria-pressed={on} onClick={() => setStep(i)} className="group relative flex flex-col items-center gap-3">
                <span
                  className={cn(
                    'font-brand relative z-10 grid size-16 place-items-center rounded-full text-[20px] font-extrabold transition-all duration-300',
                    on ? 'scale-[1.18] border-[3px] border-page bg-yellow text-ink' : 'border-2 border-[#55524A] bg-[#2A2925] text-page group-hover:border-yellow',
                  )}
                >
                  {s.n}
                </span>
                <span className={cn('text-center text-[15px] leading-snug font-bold transition-colors sm:text-[16px]', on ? 'text-yellow' : 'text-[#D6D0C4]')}>{t(s.title)}</span>
              </button>
            )
          })}
        </Reveal>

        <div key={step} className="anim-rise grid items-center gap-4 rounded-3xl bg-card px-6 py-6 text-ink sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-6 sm:px-8">
          <span className="font-brand text-[clamp(3.5rem,8vw,5.5rem)] leading-none font-extrabold text-[#F5B400]">{cur.n}</span>
          <div className="flex flex-col gap-2">
            <span className="text-[clamp(1.4rem,2.6vw,1.75rem)] font-bold">{t(cur.title)}</span>
            <span className="text-[17px] leading-[1.7] text-[#3E3B35]">{t(cur.desc)}</span>
            <span className="font-hand text-[17px] text-ink-2">{t(cur.out)}</span>
          </div>
        </div>
      </section>
    </Container>
    </SectionBand>
  )
}
