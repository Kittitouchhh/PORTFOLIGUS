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
 * โปรเจคจบการศึกษา — DPU HUB (design-handoff 7.3 ข้อ 6 / V8{D,T,M}06Dpu)
 * โทนม่วง DPU เฉพาะส่วนนี้ · 4 บล็อก: การ์ดม่วงใหญ่ → ปัญหา + ตัวเลข → 4 บริการเป็นแท็บ → ตอนนี้อยู่ตรงไหน
 * จอคอม: การ์ดม่วง ข้อความซ้าย รูปขวา · ปัญหา + 86.7% + 26 ร้าน แถวเดียว · บริการ 4 คอลัมน์ · ความคืบหน้า 4 คอลัมน์
 * ไอแพด: ปัญหาเต็มแถว + ตัวเลข 2 ช่อง · บริการ 2×2 · ความคืบหน้า 2 คอลัมน์
 * มือถือ: หัวข้อจัดกลาง · รูปอยู่ใต้ข้อความ · ปัญหา/ตัวเลขเรียงลง
 */

const PURPLE = '#5B2FD6'

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
  eyebrow: l('โปรเจคจบ', 'Capstone'),
  title: l('โปรเจคจบการศึกษา', 'Senior project'),
  hint: l('ไอเดีย + วิธีคิด', 'The idea + the thinking'),
  badge: l('โปรเจคจบการศึกษา', 'SENIOR PROJECT'),
  status: l('กำลังทำ · ขั้นออกแบบ mockup', 'In progress · mockup stage'),
  studentAlt: l('นักศึกษา', 'A student'),
  hubbyAlt: l('Hubby มาสคอต', 'Hubby, the mascot'),
  lead: l('อยากเปลี่ยนวิถีชีวิตคนในมหาวิทยาลัยให้ดีขึ้น', 'I want to make campus life better for everyone'),
  body: l('สั่งอาหารโดยไม่ต้องรอคิว ดูโต๊ะว่าง ติดตามรถชัตเทิล และฝากซื้อของภายในมหาวิทยาลัย — พัฒนาร่วมกับเพื่อนในทีม 3 คน', 'Order food without queuing, see free tables, track the shuttle, and get things delivered on campus — built with 3 teammates'),
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
    <SectionBand tone="card" className="pt-11 pb-[52px] md:pt-[72px] md:pb-20 lg:pt-24 lg:pb-[104px]">
      <Container>
        <section id="senior-project" ref={ref} className="reveal flex scroll-mt-10 flex-col gap-4 md:gap-[22px] lg:gap-7">
          <div className="snap-part flex flex-col gap-4 md:gap-[22px] lg:gap-7">
            {/* หัวข้อ — มือถือจัดกลาง */}
            <div className="flex flex-col items-center gap-1.5 text-center md:flex-row md:items-end md:justify-between md:text-left">
              <div className="flex flex-col items-center gap-2 md:items-start">
                <p className="font-brand inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.14em] text-ink-2 md:text-[12.5px] lg:text-[13px]">
                  02 <span aria-hidden="true" className="h-0.5 w-[26px] bg-ink-2" /> {t(txt.eyebrow)}
                </p>
                <h2 className="text-[23px] leading-[1.32] font-bold tracking-[-0.01em] md:text-[31px] lg:text-[40px]">
                  <span className="mark px-1 [box-decoration-break:clone]">{t(txt.title)}</span>
                </h2>
              </div>
              <span className="font-hand text-[15px] text-ink-2 md:text-[16px] lg:text-[17px]">{t(txt.hint)}</span>
            </div>

            {/* การ์ดม่วงใหญ่ — มือถือรูปอยู่ใต้ข้อความ */}
            <Reveal variant="pop" className="relative flex flex-col overflow-hidden rounded-[28px] border-2 border-ink bg-[#EEE8FF] shadow-[6px_6px_0_var(--ink)] md:flex-row">
              <div className="relative z-[2] flex min-w-0 flex-col items-center gap-3 px-[18px] pt-[22px] text-center md:flex-1 md:items-start md:py-7 md:pr-0 md:pl-7 md:text-left lg:py-9 lg:pl-10">
                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                  <span className="rounded-full px-3 py-[5px] text-[12.5px] font-bold text-card" style={{ background: PURPLE }}>
                    {t(txt.badge)}
                  </span>
                  <span className="rounded-full border-[1.5px] border-ink bg-card px-3 py-[5px] text-[12.5px] font-bold">
                    <span aria-hidden="true">● </span>
                    {t(txt.status)}
                  </span>
                </div>
                <h3 className="font-brand text-[46px] leading-none font-extrabold tracking-[-0.02em] md:text-[58px] lg:text-[76px]" style={{ color: PURPLE }}>
                  DPU HUB
                </h3>
                <span className="text-[15.5px] leading-[1.45] font-bold md:text-[17px] lg:text-[20px]">{t(txt.lead)}</span>
                <span className="text-[13.5px] leading-[1.7] text-[#3E3B35] md:text-[14px] lg:text-[15px]">{t(txt.body)}</span>
              </div>
              <div className="relative h-[250px] shrink-0 md:h-auto md:w-[300px] lg:w-[460px]">
                <span aria-hidden="true" className="absolute -bottom-[150px] left-1/2 -ml-[150px] size-[300px] rounded-full bg-[#D9CCFF] md:-right-[60px] md:-bottom-[120px] md:left-auto md:ml-0 md:size-[420px]" />
                <img src="/dpu-hub/student.webp" alt={t(txt.studentAlt)} className="absolute bottom-0 left-1/2 -ml-2.5 h-[230px] w-auto max-w-none md:right-10 md:left-auto md:ml-0 md:h-[250px] lg:h-[330px]" />
                <img src="/dpu-hub/hubby.webp" alt={t(txt.hubbyAlt)} className="anim-float absolute bottom-2.5 left-1/2 -ml-[130px] h-[110px] w-auto max-w-none md:right-[170px] md:bottom-4 md:left-auto md:ml-0 lg:right-[250px] lg:h-[150px]" />
              </div>
            </Reveal>

            {/* ปัญหา (ดำ) + 86.7% + 26 ร้าน — คอม 1 แถว / ไอแพด ปัญหาเต็มแถว + ตัวเลข 2 ช่อง / มือถือ เรียงลง */}
            <Reveal stagger className="grid gap-3 md:grid-cols-2 md:gap-3.5 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-[18px]">
              <div className="flex flex-col gap-2 rounded-[22px] bg-ink p-[22px] text-card md:col-span-2 lg:col-span-1">
                <span className="self-start rounded-full bg-yellow px-2.5 py-[3px] text-[12px] font-extrabold text-ink">{t(txt.pStart)}</span>
                <span className="text-[16px] leading-normal font-bold">{t(txt.pHead)}</span>
                <span className="text-[13.5px] leading-[1.65] text-[#C9C3B6]">
                  {t(txt.pBodyA)}
                  <b className="text-card">{t(txt.pBodyB)}</b>
                  {t(txt.pBodyC)}
                </span>
              </div>
              <div className="flex flex-col gap-1.5 rounded-[22px] border-2 border-ink bg-yellow p-5 shadow-[4px_4px_0_var(--ink)]">
                <span className="font-brand text-[40px] leading-none font-extrabold text-ink lg:text-[48px]">86.7%</span>
                <span className="text-[13px] leading-[1.6] text-[#3E3B35]">{t(txt.survey)}</span>
              </div>
              <div className="flex flex-col gap-1.5 rounded-[22px] border-2 border-ink bg-card p-5 shadow-[4px_4px_0_var(--ink)]">
                <span className="flex items-baseline gap-1.5">
                  <span className="font-brand text-[40px] leading-none font-extrabold text-ink lg:text-[48px]">26</span>
                  <span className="text-[14px] font-bold text-ink">{t(txt.shops)}</span>
                </span>
                <span className="text-[13px] leading-[1.6] text-[#3E3B35]">{t(txt.shopsNote)}</span>
              </div>
            </Reveal>
          </div>

          {/* 4 บริการ + ความคืบหน้า */}
          <div className="snap-part flex flex-col gap-4 md:gap-[22px] lg:gap-7">
            <Reveal className="flex flex-col gap-3.5 rounded-3xl border-2 border-ink bg-card p-4 md:p-[22px]">
              <div className="flex flex-col items-center gap-2 text-center md:flex-row md:items-baseline md:justify-between md:text-left">
                <span className="text-[16px] font-bold md:text-[18px]">{t(txt.svc)}</span>
                <span className="text-[13px] text-ink-2">{t(txt.svcHint)}</span>
              </div>
              {/* 4 บริการ: คอม 4 คอลัมน์ ที่เหลือ 2×2 */}
              <div role="tablist" aria-label={t(txt.svc)} className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
                {SERVICES.map((s, i) => {
                  const on = i === svc
                  return (
                    <button
                      key={s.n}
                      type="button"
                      role="tab"
                      id={`dpu-tab-${i}`}
                      aria-selected={on}
                      aria-controls="dpu-panel"
                      onClick={() => setSvc(i)}
                      className={cn(
                        'flex min-w-0 flex-col items-start gap-1 rounded-2xl p-3.5 text-left transition',
                        on ? 'border-2 border-ink text-card shadow-[3px_3px_0_var(--ink)]' : 'border-[1.5px] border-line bg-card hover:-translate-y-0.5 hover:border-ink',
                      )}
                      style={on ? { background: PURPLE } : undefined}
                    >
                      <span className="font-code text-[11.5px] opacity-80">{s.n}</span>
                      <span className="text-[14px] leading-[1.3] font-bold lg:text-[15px]">{s.name}</span>
                      <span className={cn('text-[12.5px] leading-normal', on ? 'text-[#E6DEFF]' : 'text-ink-2')}>{t(s.short)}</span>
                    </button>
                  )
                })}
              </div>
              {/* MVP · ใครต้องอนุมัติ · ภาพที่อยากเห็น — คอม 3 คอลัมน์ ที่เหลือเรียงลง */}
              <div key={svc} id="dpu-panel" role="tabpanel" aria-labelledby={`dpu-tab-${svc}`} className="anim-rise grid gap-3.5 rounded-2xl bg-[#EEE8FF] px-[18px] py-4 lg:grid-cols-3">
                {[
                  { k: txt.mvp, v: t(cur.mvp) },
                  { k: txt.ok, v: t(cur.ok) },
                  { k: txt.vision, v: `“${t(cur.vision)}”` },
                ].map((x, i) => (
                  <div key={i} className="flex flex-col gap-[3px]">
                    <span className="text-[12px] font-extrabold" style={{ color: PURPLE }}>
                      {t(x.k)}
                    </span>
                    <span className="text-[13.5px] leading-[1.6]">{x.v}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* ตอนนี้อยู่ตรงไหน — คอม 4 คอลัมน์ / ที่เหลือ 2 คอลัมน์ */}
            <Reveal className="relative flex flex-col gap-3.5 rounded-3xl bg-ink px-[18px] py-5 text-card md:px-6 md:py-[22px]">
              <div className="flex flex-col gap-2 pr-16 lg:flex-row lg:items-baseline lg:justify-between lg:pr-20">
                <span className="text-[18px] font-bold">{t(txt.where)}</span>
                <span className="text-[13.5px] text-yellow">{t(txt.success)}</span>
              </div>
              <ol className="stagger grid grid-cols-2 gap-x-2.5 gap-y-3 lg:grid-cols-4">
                {PROGRESS.map((p, i) => (
                  <li key={i} className={cn('flex items-center gap-2 text-[13px]', p.s === 1 ? 'font-bold text-yellow' : p.s === 2 ? 'text-card' : 'text-ink-3')}>
                    {p.s === 2 ? (
                      <span aria-hidden="true" className="grid size-5 shrink-0 place-items-center rounded-full bg-[#1F9D55]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFDF8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m5 12 5 5 9-10" />
                        </svg>
                      </span>
                    ) : p.s === 1 ? (
                      <span aria-hidden="true" className="size-5 shrink-0 rounded-full bg-yellow shadow-[0_0_0_4px_rgba(255,201,64,.3)]" />
                    ) : (
                      <span aria-hidden="true" className="size-5 shrink-0 rounded-full border-2 border-dashed border-[#6E6A62]" />
                    )}
                    <span className="min-w-0">
                      {p.s === 2 && <span className="sr-only">✓ </span>}
                      {t(p.t)}
                      {p.s === 1 && t(txt.nowTag)}
                    </span>
                  </li>
                ))}
              </ol>
              <img src="/dpu-hub/hubby-happy.webp" alt="" aria-hidden="true" className="anim-float absolute -top-[46px] right-4 h-[70px] w-auto" />
            </Reveal>
          </div>
        </section>
      </Container>
    </SectionBand>
  )
}

