/**
 * ⚠️ ชุดจอคอม (≥ 1100px) — โค้ดหน้าตาเดิมก่อน v8 ตามที่เจ้าของขอ (27 ก.ย.) · มือถือ/ไอแพดใช้ไฟล์ v8 ในโฟลเดอร์แม่
 * HomePage เลือกชุดด้วย useIsDesktop() — แก้เนื้อหาต้องแก้ทั้งสองชุด
 */
import { useState } from 'react'
import { Reveal } from '@/components/common/Reveal'
import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'
import type { L } from '@portfolio/shared/types'
import { cn } from '@/utils/cn'

/**
 * ไทม์ไลน์ มี.ค. 2569 – เม.ย. 2570 (14 เดือน) · 4 ช่วงกดดูได้ — ตามดีไซน์ v4
 * สติกเกอร์สะพายกระเป๋ายืนอยู่เหนือเดือนปัจจุบัน · เดือนปัจจุบันคำนวณจากวันที่จริง
 */

const START = { y: 2026, m: 3 }
const MONTHS: L[] = [
  l('มี.ค.', 'Mar'), l('เม.ย.', 'Apr'), l('พ.ค.', 'May'), l('มิ.ย.', 'Jun'), l('ก.ค.', 'Jul'), l('ส.ค.', 'Aug'), l('ก.ย.', 'Sep'),
  l('ต.ค.', 'Oct'), l('พ.ย.', 'Nov'), l('ธ.ค.', 'Dec'), l('ม.ค.', 'Jan'), l('ก.พ.', 'Feb'), l('มี.ค.', 'Mar'), l('เม.ย.', 'Apr'),
]
/** เดือนที่ i อยู่ช่วงไหน — มี.ค.–พ.ค. เรียน · มิ.ย.–ก.ค. ฝึกงาน · ส.ค.–ธ.ค. ทำงาน · ม.ค.–เม.ย. สหกิจ */
const phaseOf = (i: number) => (i < 3 ? 0 : i < 5 ? 1 : i < 10 ? 2 : 3)
const COLORS = ['#9C958A', '#2B55E6', '#191816', '#1F9D55']
const LAST = COLORS.length - 1

const PHASES: { when: L; title: L; head: L; body: L; span?: string }[] = [
  { when: l('มี.ค. – พ.ค. 2569', 'Mar – May 2026'), title: l('เรียน', 'Studying'), head: l('เรียน', 'Studying'), body: l('ช่วงเรียนเต็มเวลา ก่อนเริ่มทำงานจริง', 'Full-time study, before starting real work') },
  { when: l('มิ.ย. – ก.ค. 2569', 'Jun – Jul 2026'), title: l('ฝึกงาน 2 เดือน', '2-month internship'), head: l('ฝึกงาน 2 เดือน', '2-month internship'), body: l('เก็บ requirement จัดทำ mockup และเขียนสเปกให้ทีมพัฒนา — หลังจบการฝึกงาน บริษัทชักชวนให้ทำงานต่อ', 'Gathered requirements, built mockups and wrote specs for dev — the company asked me to stay on afterwards') },
  { when: l('ส.ค. – ธ.ค. 2569', 'Aug – Dec 2026'), title: l('เรียนไปด้วย ทำงานไปด้วย', 'Studying and working'), head: l('เรียนไปทำงานไป', 'Study + work'), body: l('จบฝึกงานแล้วทำงานต่อที่บริษัทเดิม (BluePeak) แบบพาร์ตไทม์ — เรียนปี 4 ควบคู่กับงานจริงกับลูกค้า ERP โรงงาน ทั้งลงพื้นที่หน้างาน เข้าประชุม และร่วมนำเสนอขาย', 'After the internship I stayed on part-time at the same company (BluePeak) — year 4 alongside real work with factory ERP clients: on site, in meetings, and in sales calls') },
  { when: l('ม.ค. – เม.ย. 2570', 'Jan – Apr 2027'), title: l('สหกิจ — กำลังหาที่อยู่!', 'Co-op — looking now!'), head: l('สหกิจศึกษา', 'Co-op'), body: l('ที่ผ่านมาได้ทำงานกับธุรกิจ SME — สำหรับสหกิจครั้งนี้ ผมอยากมีโอกาสทำงานกับองค์กรขนาดใหญ่ ในสาย Pre-sales / Solution / BD', 'I’ve worked with SMEs so far — for this co-op I’d like to try a larger organisation, in Pre-sales / Solutions / BD') },
]

const txt = {
  title: l('ทำงานจริง ระหว่างเรียนปี 4', 'Working for real during year 4'),
  hint: l('กดแต่ละช่วงดูได้นะ ↓', 'Tap each stage ↓'),
  now: l('ตอนนี้', 'Now'),
}

function nowIndex() {
  const d = new Date()
  return (d.getFullYear() - START.y) * 12 + d.getMonth() + 1 - START.m
}

export function WorkTimeline() {
  const { t } = useLang()
  const cur = nowIndex()
  const [phase, setPhase] = useState(cur >= 0 && cur < MONTHS.length ? phaseOf(cur) : 2)
  const p = PHASES[phase]

  return (
    <Reveal className="flex flex-col gap-5 rounded-[32px] border-2 border-ink bg-card p-6 sm:p-9">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.25] font-bold">
          <span className="mark px-1.5">{t(txt.title)}</span>
        </h2>
        <span className="font-hand text-[18px] text-ink-2">{t(txt.hint)}</span>
      </div>

      <div className="overflow-x-auto pb-1">
        <ol className="relative grid min-w-[40rem] grid-cols-14 gap-1 pt-[4.5rem]">
          {cur >= 0 && cur < MONTHS.length && (
            <img
              src="/stickers/gus-backpack.webp"
              alt=""
              aria-hidden="true"
              className="anim-float absolute top-0 w-[5.4rem] -translate-x-1/2"
              style={{ left: `${((cur + 0.5) / MONTHS.length) * 100}%` }}
            />
          )}
          {MONTHS.map((m, i) => {
            const ph = phaseOf(i)
            const on = ph === phase
            const now = i === cur
            return (
              <li key={i} className="flex flex-col items-center gap-2">
                <span
                  className={cn('block w-full rounded-full transition-all duration-300', on ? 'h-[18px]' : 'h-3', now && 'outline-[3px] outline-yellow outline-solid')}
                  style={
                    ph === LAST
                      ? { border: `2px dashed ${COLORS[LAST]}`, background: on ? '#D8F2E2' : 'transparent' }
                      : { background: COLORS[ph], opacity: on ? 1 : 0.35 }
                  }
                />
                <span className={cn('text-[12px]', now ? 'rounded-full bg-yellow px-2 font-extrabold text-ink' : 'font-semibold text-ink-2')}>
                  {now ? t(txt.now) : t(m)}
                </span>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-[3fr_2fr_5fr_4fr]">
        {PHASES.map((x, i) => {
          const on = i === phase
          return (
            <button
              key={i}
              type="button"
              aria-pressed={on}
              onClick={() => setPhase(i)}
              className={cn('flex flex-col items-start gap-0.5 rounded-[14px] border-2 px-4 py-3 text-left transition', !on && i === LAST && 'border-dashed', !on && 'bg-card hover:-translate-y-0.5')}
              style={{ borderColor: COLORS[i], ...(on ? { background: COLORS[i], color: '#FFFDF8', boxShadow: '4px 4px 0 #191816' } : {}) }}
            >
              <span className="text-[12px] font-bold opacity-80">{t(x.when)}</span>
              <span className="text-[16px] font-bold">{t(x.title)}</span>
            </button>
          )
        })}
      </div>

      <div key={phase} className="anim-rise flex flex-col gap-2 rounded-[18px] border-[1.5px] border-dashed border-[#9C958A] bg-page px-5 py-4 sm:flex-row sm:items-center sm:gap-4">
        <span className="font-hand shrink-0 text-[22px]">{t(p.head)}</span>
        <span className="text-[16px] leading-relaxed text-[#3E3B35]">{t(p.body)}</span>
      </div>
    </Reveal>
  )
}
