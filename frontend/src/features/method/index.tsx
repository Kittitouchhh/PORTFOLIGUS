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
 * 03 — วิธีทำงาน (ดีไซน์ v8 · V8*07Method) · พื้นดำทั้งแถบ (SectionBand tone="dark")
 * จอคอม/ไอแพด: วงกลม 7 ขั้นเรียงแถวบนเส้นประ + การ์ดรายละเอียดขาวด้านล่าง
 * มือถือ: รายการแนวตั้งแบบ accordion — ขั้นที่เลือกกางเป็นการ์ดขาว มีป้าย "ได้: …"
 * วงกลม: ขั้นที่ผ่านมาแล้ว = ขอบขาว · ขั้นที่เลือก = เหลือง · ขั้นถัดไป = ขอบเทาจาง
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

/** สีวงกลมตามสถานะ: ผ่านแล้ว / ที่เลือก / ยังไม่ถึง */
function dotCls(i: number, step: number) {
  if (i === step) return 'bg-yellow text-ink shadow-[0_0_0_6px_rgba(255,201,64,.25)]'
  if (i < step) return 'border-[1.5px] border-card bg-[#2C2A26] text-card'
  return 'border-[1.5px] border-[#5B574F] bg-ink text-ink-3 group-hover:border-yellow'
}

/** ป้าย "ได้: …" */
function OutPill({ children, className }: { children: string; className?: string }) {
  return <span className={cn('self-start rounded-full border-[1.5px] border-accent bg-[#FFF5D6] font-bold text-ink', className)}>{children}</span>
}

export function Method() {
  const { t } = useLang()
  const ref = useReveal<HTMLElement>()
  const [step, setStep] = useState(2)
  const cur = STEPS[step]

  return (
    <SectionBand tone="dark" className="py-11 md:pt-[72px] md:pb-20 lg:pt-24 lg:pb-[104px]">
    <Container>
      <section id="method" ref={ref} className="reveal relative flex scroll-mt-10 flex-col gap-4 text-card md:gap-[22px] lg:gap-7">
        <img
          src="/stickers/gus-chin.webp"
          alt=""
          aria-hidden="true"
          className="anim-float pointer-events-none absolute -top-6 -right-3 h-[74px] md:-top-6 md:right-0 md:h-[110px] lg:-top-9 lg:right-3 lg:h-[150px]"
        />
        <div className="relative flex flex-col items-center gap-2.5 text-center md:items-start md:text-left">
          <p className="font-brand text-[12px] font-extrabold tracking-[0.14em] text-[#C9C3B6] md:text-[12.5px] lg:text-[13px]">
            03 <span aria-hidden="true" className="chapter-line mx-1" /> {t(txt.eyebrow)}
          </p>
          <h2 className="px-10 text-[23px] leading-[1.32] font-bold tracking-[-0.01em] md:px-0 md:pr-32 md:text-[31px] lg:text-[40px]">
            {t(txt.t1)}
            <span className="text-yellow">{t(txt.t2)}</span>
          </h2>
          <p className="text-[14px] leading-relaxed text-[#C9C3B6] md:text-[15px] lg:text-[16px]">{t(txt.sub)}</p>
        </div>

        {/* จอคอม/ไอแพด: 7 ขั้นเรียงแถวบนเส้นประ */}
        <Reveal stagger className="relative mt-2.5 hidden grid-cols-7 items-start gap-1.5 md:grid">
          <span
            aria-hidden="true"
            className="absolute inset-x-[7%] top-[27px] h-0.5"
            style={{ background: 'repeating-linear-gradient(90deg, #5B574F 0 6px, transparent 6px 11px)' }}
          />
          {STEPS.map((s, i) => {
            const on = i === step
            return (
              <button key={s.n} type="button" aria-pressed={on} onClick={() => setStep(i)} className="group relative flex min-w-0 flex-col items-center gap-2 text-center">
                <span className="grid h-14 place-items-center">
                  <span
                    className={cn(
                      'relative z-10 grid place-items-center rounded-full font-code text-[15px] font-extrabold transition-all duration-300',
                      on ? 'size-14' : 'size-[46px]',
                      dotCls(i, step),
                    )}
                  >
                    {s.n}
                  </span>
                </span>
                <span className={cn('text-[12px] leading-[1.35] font-bold transition-colors lg:text-[13px]', on ? 'text-yellow' : 'text-[#E9E4DA] group-hover:text-card')}>{t(s.title)}</span>
              </button>
            )
          })}
        </Reveal>

        <div key={step} className="anim-rise hidden items-start gap-5 rounded-3xl bg-card px-6 py-[22px] text-ink md:flex lg:gap-7 lg:px-8 lg:py-7">
          <span className="font-brand text-[64px] leading-[.9] font-extrabold text-[#F5B400] lg:text-[86px]">{cur.n}</span>
          <div className="flex flex-col gap-2">
            <span className="text-[19px] font-bold lg:text-[22px]">{t(cur.title)}</span>
            <span className="text-[15px] leading-[1.7] text-[#3E3B35] lg:text-[16px]">{t(cur.desc)}</span>
            <OutPill className="px-3 py-[5px] text-[13px]">{t(cur.out)}</OutPill>
          </div>
        </div>

        {/* มือถือ: accordion แนวตั้ง */}
        <div className="relative mt-1.5 flex flex-col gap-2.5 md:hidden">
          <span
            aria-hidden="true"
            className="absolute top-5 bottom-5 left-[19px] w-0.5"
            style={{ background: 'repeating-linear-gradient(180deg, #5B574F 0 6px, transparent 6px 11px)' }}
          />
          {STEPS.map((s, i) => {
            const on = i === step
            return (
              <div key={s.n} className={cn('relative grid grid-cols-[40px_minmax(0,1fr)] gap-3', !on && 'items-center')}>
                <span className={cn('relative z-10 grid size-10 place-items-center rounded-full font-code font-extrabold', on ? 'text-[14px]' : 'text-[13px]', dotCls(i, step))}>{s.n}</span>
                {on ? (
                  <div className="anim-pop flex flex-col gap-2 rounded-[18px] bg-card px-4 py-3.5 text-ink">
                    <button type="button" aria-expanded="true" onClick={() => setStep(i)} className="flex min-h-11 items-center justify-between gap-3 text-left">
                      <span className="text-[16px] font-bold">{t(s.title)}</span>
                      <span aria-hidden="true" className="text-[18px] font-bold">−</span>
                    </button>
                    <span className="text-[14px] leading-[1.65] text-[#3E3B35]">{t(s.desc)}</span>
                    <OutPill className="px-2.5 py-1 text-[12.5px]">{t(s.out)}</OutPill>
                  </div>
                ) : (
                  <button
                    type="button"
                    aria-expanded="false"
                    onClick={() => setStep(i)}
                    className="flex min-h-12 items-center justify-between gap-3 rounded-[14px] bg-[#2C2A26] px-4 text-left text-[14.5px] font-bold text-card active:bg-[#3A3833]"
                  >
                    {t(s.title)}
                    <span aria-hidden="true" className="text-[18px] text-ink-3">+</span>
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </Container>
    </SectionBand>
  )
}
