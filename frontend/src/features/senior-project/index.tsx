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
 * โปรเจคจบการศึกษา — DPU HUB (design-handoff 2.6 / DpuHub.dc.html)
 * โทนม่วง DPU เฉพาะส่วนนี้ · 4 บล็อก: หัว → ปัญหา+ตัวเลข → 4 บริการเป็นแท็บ → ตอนนี้อยู่ตรงไหน
 */

const PURPLE = '#6A2CF5'

/** vision = ภาพที่อยากเห็นเมื่อบริการนี้สำเร็จ (เป็นข้อความ) */
const SERVICES: { n: string; name: string; short: L; mvp: L; ok: L; vision: L }[] = [
  { n: '01', name: 'Queue-Free Order', short: l('สั่งอาหารล่วงหน้า และทราบเวลารอโดยประมาณ', 'Order ahead and know how long you’ll wait'), mvp: l('ร้านนำร่อง 1 ร้าน และนักศึกษา 10 คน ทดลองสั่ง ชำระเงิน และรับอาหารจริงครบทุกขั้นตอน', '1 pilot stall + 10 students ordering, paying and collecting for real, end to end'), ok: l('ร้านค้า + ฝ่ายที่ดูแลผู้เช่าพื้นที่', 'The stalls + the team that manages tenants'), vision: l('นักศึกษามารับอาหารได้พอดีกับที่อาหารเสร็จ โดยไม่ต้องยืนต่อคิว', 'Students walk up just as their food is ready — nobody stands in line') },
  { n: '02', name: 'Table Vision', short: l('ตรวจสอบโต๊ะว่างก่อนเดินไป ด้วยกล้องและ AI', 'See free tables before walking over, with a camera + AI'), mvp: l('ทดลอง 1 โซน ด้วยกล้อง 1 ตัว แสดงสถานะโต๊ะได้ตรงกับความเป็นจริง', 'One zone, one camera, table status matching reality'), ok: l('ฝ่ายอาคาร + ฝ่ายกฎหมาย/PDPA (ไม่เก็บภาพ ไม่ระบุตัวบุคคล)', 'Facilities + legal/PDPA (no images stored, nobody identified)'), vision: l('เปิดดูจากมือถือก่อนลงมา ทราบทันทีว่าโต๊ะใดว่าง และนั่งได้เลย', 'Check your phone on the way down, see a free table, and sit straight down') },
  { n: '03', name: 'Shuttle Tracker', short: l('ทราบตำแหน่งรถชัตเทิล และเวลาที่จะมาถึง', 'Know where the shuttle is and when it arrives'), mvp: l('รถ 1 คัน แชร์ตำแหน่งจริง ผู้ใช้เปิดดูแล้วเห็นเวลาที่แม่นยำ', 'One bus sharing its real location, accurate for whoever checks'), ok: l('ฝ่ายยานพาหนะ + ความร่วมมือจากคนขับ', 'The transport office + the drivers’ cooperation'), vision: l('รอที่ป้ายเพียงไม่กี่นาที เพราะทราบเวลาที่รถจะมาถึง', 'Only a few minutes at the stop, because you know when the bus arrives') },
  { n: '04', name: 'Campus Delivery', short: l('ฝากซื้อ/ส่งของ ผ่านผู้ที่เดินทางเส้นทางนั้นอยู่แล้ว', 'Get things bought or delivered by someone already going that way'), mvp: l('มีผู้ฝากซื้อจริง มีผู้รับงานจริง และส่งถึงมือจริงอย่างน้อย 1 รอบ', 'One real request, one real runner, one real delivery'), ok: l('กองกิจการนักศึกษา', 'Student Affairs'), vision: l('เพื่อนที่เดินทางผ่านเส้นทางนั้นอยู่แล้ว นำของมาส่งให้ถึงหน้าห้องเรียน', 'A friend already heading that way drops it off at your classroom door') },
]

const PROGRESS: { t: L; s: 0 | 1 | 2 }[] = [
  { t: l('สอบหัวข้อผ่าน', 'Proposal approved'), s: 2 },
  { t: l('แบบสอบถาม 60 คน', 'Survey of 60 people'), s: 2 },
  { t: l('สำรวจ 26 ร้าน', 'Surveyed 26 stalls'), s: 2 },
  { t: l('เคาะสถาปัตยกรรม', 'Architecture decided'), s: 2 },
  { t: l('ทำ mockup', 'Building mockups'), s: 1 },
  { t: l('ขออนุญาต 4 ฝ่าย', 'Approval from 4 offices'), s: 0 },
  { t: l('นำร่องกับคนใช้จริง', 'Pilot with real users'), s: 0 },
]

const txt = {
  title: l('โปรเจคจบการศึกษา', 'Senior project'),
  hint: l('ไอเดีย + วิธีคิด', 'The idea + the thinking'),
  badge: l('โปรเจคจบการศึกษา', 'SENIOR PROJECT'),
  status: l('กำลังทำ · ขั้นออกแบบ mockup', 'In progress · mockup stage'),
  lead: l('อยากเปลี่ยนวิถีชีวิตคนในมหาวิทยาลัยให้ดีขึ้น', 'I want to make campus life better for everyone'),
  body: l('สั่งอาหารโดยไม่ต้องรอคิว ดูโต๊ะว่าง ติดตามรถชัตเทิล และฝากซื้อของภายในมหาวิทยาลัย — พัฒนาร่วมกับเพื่อนในทีม 3 คน', 'Order food without queuing, see free tables, track the shuttle, and get things delivered on campus — built with 3 teammates'),
  hubby: l('ผม Hubby มาสคอตของระบบ!', 'I’m Hubby, the mascot!'),
  pStart: l('เริ่มจากปัญหาโรงอาหาร', 'It started with the canteen'),
  pHead: l('ผู้ใช้บริการหนาแน่น รออาหารนาน และไม่ทราบว่าโต๊ะใดว่าง ทั้งที่ช่วงพักมีเวลาจำกัด', 'Crowded, long waits for food, no idea which tables are free — with only a short break'),
  pBodyA: l('เมื่อพิจารณาลึกลงไป ปัญหาอื่นภายในมหาวิทยาลัยก็มีต้นเหตุเดียวกัน คือ ', 'Looking deeper, other campus problems share one cause: '),
  pBodyB: l('เสียเวลาไปกับความไม่แน่นอน', 'time lost to uncertainty'),
  pBodyC: l(' — ไม่ทราบว่ารถจะมาถึงเมื่อใด หรือต้องเดินไปรับของด้วยตนเองหรือไม่', ' — not knowing when the bus comes, or whether you have to fetch things yourself'),
  survey: l('แบบสอบถามรอบแรก 60 คน — 52 คนระบุว่าเป็นปัญหาที่พบในชีวิตประจำวัน', 'First survey of 60 people — 52 said it’s a real everyday problem'),
  shops: l('ร้าน', 'stalls'),
  shopsNote: l('ลงสำรวจโรงอาหารด้วยตนเอง พบว่ามีร้านที่เกิดคิวจริงราว 8 ร้าน — ทำให้ทราบว่าควรเริ่มนำร่องที่ใด', 'I walked the canteen myself and found real queues at about 8 stalls — so we know where to pilot'),
  svc: l('4 บริการ ในแพลตฟอร์มเดียว', '4 services, one platform'),
  svcHint: l('กดดูแต่ละบริการ ↓', 'Tap each service ↓'),
  mvp: l('MVP ของบริการนี้', 'MVP for this service'),
  ok: l('ต้องได้รับอนุมัติจากหน่วยงานใดก่อนเปิดใช้งาน', 'Who has to approve before launch'),
  vision: l('ภาพที่อยากเห็นเมื่อมันสำเร็จ', 'What success looks like'),
  where: l('ตอนนี้อยู่ตรงไหน', 'Where it stands'),
  success: l('ความสำเร็จสำหรับผม คือมีผู้ใช้งานจริง ไม่ใช่จำนวนฟีเจอร์', 'Success for me = real users, not the number of features'),
  nowTag: l(' (ตอนนี้)', ' (now)'),
}

export function SeniorProject() {
  const { t } = useLang()
  const ref = useReveal<HTMLElement>()
  const [svc, setSvc] = useState(0)
  const cur = SERVICES[svc]

  return (
    <SectionBand tone="paper" className="py-12 lg:py-[60px]">
    <Container>
      <section id="senior-project" ref={ref} className="reveal flex scroll-mt-10 flex-col gap-6">
        <div className="snap-part flex flex-col gap-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.25] font-bold">
            <span className="mark px-1.5">{t(txt.title)}</span>
          </h2>
          <span className="font-hand text-[18px] text-ink-2">{t(txt.hint)}</span>
        </div>

        {/* หัว */}
        <Reveal variant="pop" className="relative grid overflow-hidden rounded-[32px] border-2 border-ink bg-[#F1EBFF] shadow-[8px_8px_0_var(--ink)] lg:h-[380px] lg:grid-cols-[minmax(0,1fr)_26rem]">
          <div className="flex flex-col gap-3.5 px-6 pt-8 pb-8 sm:px-11 sm:pt-10">
            <div className="flex flex-wrap gap-2.5">
              <span className="font-brand rounded-full px-3.5 py-1.5 text-[13px] font-extrabold tracking-[0.1em] text-white" style={{ background: PURPLE }}>{t(txt.badge)}</span>
              <span className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-card px-3.5 py-1 text-[13px] font-bold">
                <span className="size-2 rounded-full bg-[#F5B400]" />
                {t(txt.status)}
              </span>
            </div>
            <h3 className="font-brand mt-1.5 text-[clamp(3.2rem,7vw,4.75rem)] leading-[0.95] font-extrabold tracking-[-0.03em] !text-[#3B1A9E]">DPU HUB</h3>
            <span className="text-[clamp(1.25rem,2.2vw,1.6rem)] leading-[1.35] font-bold">{t(txt.lead)}</span>
            <span className="max-w-[35rem] text-[16.5px] leading-[1.7] text-[#3E3B35]">{t(txt.body)}</span>
          </div>
          <div className="relative h-72 lg:h-auto">
            <span aria-hidden="true" className="absolute -top-10 -right-16 size-[23.75rem] rounded-full bg-[#DCCFFF]" />
            <img src="/dpu-hub/student.webp" alt="" className="absolute right-9 -bottom-1.5 h-[17rem] lg:h-[340px]" />
            <img src="/dpu-hub/hubby.webp" alt="Hubby" className="anim-float absolute bottom-2 left-2 w-32 lg:left-0 lg:w-[170px]" />
            <span className="font-hand absolute top-6 left-5 -rotate-[4deg] rounded-[14px_14px_14px_4px] border-[1.5px] border-ink bg-card px-3 py-1 text-[16px] lg:top-[70px]">{t(txt.hubby)}</span>
          </div>
        </Reveal>

        {/* ปัญหา */}
        <Reveal stagger className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="flex flex-col gap-2.5 rounded-3xl bg-ink px-7 py-6 text-page">
            <span className="font-hand text-[18px] text-yellow">{t(txt.pStart)}</span>
            <span className="text-[20px] leading-normal font-bold">{t(txt.pHead)}</span>
            <span className="text-[15px] leading-[1.7] text-[#D6D0C4]">
              {t(txt.pBodyA)}
              <b className="text-page">{t(txt.pBodyB)}</b>
              {t(txt.pBodyC)}
            </span>
          </div>
          <div className="flex -rotate-1 flex-col gap-2 rounded-3xl border-2 border-ink bg-yellow px-7 py-6 shadow-[5px_5px_0_var(--ink)]">
            <span className="font-brand text-[62px] leading-none font-extrabold">86.7%</span>
            <span className="text-[15.5px] leading-relaxed">{t(txt.survey)}</span>
          </div>
          <div className="flex rotate-1 flex-col gap-2 rounded-3xl border-2 border-ink bg-card px-7 py-6 shadow-[5px_5px_0_var(--ink)]">
            <span className="font-brand text-[62px] leading-none font-extrabold">
              26<span className="text-[22px]"> {t(txt.shops)}</span>
            </span>
            <span className="text-[15.5px] leading-relaxed">{t(txt.shopsNote)}</span>
          </div>
        </Reveal>

        </div>

        {/* 4 บริการ + ความคืบหน้า */}
        <div className="snap-part flex flex-col gap-6">
        <Reveal className="flex flex-col gap-5 rounded-[28px] border-2 border-ink bg-card px-6 py-7 sm:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-[clamp(1.3rem,2.2vw,1.6rem)] font-bold">{t(txt.svc)}</span>
            <span className="font-hand text-[17px] text-ink-2">{t(txt.svcHint)}</span>
          </div>
          <div role="tablist" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {SERVICES.map((s, i) => {
              const on = i === svc
              return (
                <button
                  key={s.n}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setSvc(i)}
                  className={cn('flex flex-col items-start gap-1 rounded-[18px] border-2 border-ink px-4 py-4 text-left transition', on ? '-translate-y-[3px] text-white shadow-[4px_4px_0_var(--ink)]' : 'bg-card hover:-translate-y-0.5')}
                  style={on ? { background: PURPLE } : undefined}
                >
                  <span className="font-brand text-[14px] font-extrabold opacity-70">{s.n}</span>
                  <span className="text-[clamp(1rem,1.5vw,1.2rem)] font-bold">{s.name}</span>
                  <span className="text-[14px] leading-normal opacity-85">{t(s.short)}</span>
                </button>
              )
            })}
          </div>
          {/* ซ้าย MVP (+ ใครต้องไฟเขียว) · ขวา ภาพที่อยากเห็นเมื่อสำเร็จ (ข้อความ) */}
          <div key={svc} className="anim-rise grid items-stretch gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-[18px] bg-[#F1EBFF] px-5 py-5">
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-bold tracking-[0.04em] text-[#5A3FB5]">{t(txt.mvp)}</span>
                <span className="text-[17px] leading-relaxed font-semibold">{t(cur.mvp)}</span>
              </div>
              <div className="mt-auto flex flex-col gap-1 border-t-[1.5px] border-dashed border-[#CBB8FF] pt-3">
                <span className="text-[12.5px] font-bold tracking-[0.04em] text-ink-2">{t(txt.ok)}</span>
                <span className="text-[14.5px] leading-relaxed">{t(cur.ok)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-[18px] border-2 border-dashed px-5 py-5" style={{ borderColor: PURPLE }}>
              <span className="self-start rounded-full px-3 py-1 text-[12.5px] font-bold text-white" style={{ background: PURPLE }}>
                {t(txt.vision)}
              </span>
              <p className="font-hand my-auto text-[clamp(1.3rem,1.9vw,1.6rem)] leading-[1.45] text-[#3B1A9E]">“{t(cur.vision)}”</p>
            </div>
          </div>
        </Reveal>

        {/* ความคืบหน้า */}
        <Reveal className="relative flex flex-col gap-4.5 rounded-[28px] bg-ink px-6 pt-7 pb-8 text-page sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 pr-24">
            <span className="text-[22px] font-bold">{t(txt.where)}</span>
            <span className="font-hand text-[clamp(1.1rem,2vw,1.4rem)] text-yellow">{t(txt.success)}</span>
          </div>
          <ol className="stagger grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {PROGRESS.map((p, i) => (
              <li key={i} className="flex flex-col gap-2">
                <span
                  className="block h-2.5 rounded-full"
                  style={{
                    background: p.s === 2 ? '#FFC940' : p.s === 1 ? 'repeating-linear-gradient(45deg,#FFC940 0 8px,#A58BFF 8px 16px)' : '#3A3833',
                  }}
                />
                <span className={cn('text-[14px] leading-snug', p.s === 1 ? 'font-bold text-yellow' : p.s === 2 ? 'font-semibold text-page' : 'font-medium text-ink-3')}>
                  {p.s === 2 ? '✓ ' : p.s === 1 ? '● ' : ''}
                  {t(p.t)}
                  {p.s === 1 && t(txt.nowTag)}
                </span>
              </li>
            ))}
          </ol>
          <img src="/dpu-hub/hubby-happy.webp" alt="" aria-hidden="true" className="anim-float absolute -top-16 right-7 w-24" />
        </Reveal>
        </div>
      </section>
    </Container>
    </SectionBand>
  )
}
