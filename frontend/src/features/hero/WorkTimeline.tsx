import { useState, type CSSProperties } from 'react'
import { Reveal } from '@/components/common/Reveal'
import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'
import type { L } from '@portfolio/shared/types'
import { cn } from '@/utils/cn'

/**
 * ไทม์ไลน์ มี.ค. 2569 – เม.ย. 2570 (14 เดือน) · 4 ช่วงกดดูได้ · v8 `V8*03Stats` (ท่อนล่าง)
 * จอคอม: แถบเดือน 14 ช่อง + การ์ด 4 ช่วงกว้างตามจำนวนเดือน (3fr 2fr 5fr 4fr)
 * ไอแพด: แถบเดือน + การ์ด 2×2 · มือถือ: รายการแนวตั้งมีจุด + เส้นประ (ไม่มีแถบเดือน)
 * หมุด "ตอนนี้ · <เดือน>" เหนือแถบ + ป้าย "ตอนนี้" และสติกเกอร์กัสเท้าคางบนการ์ดช่วงปัจจุบัน · เดือนปัจจุบันคำนวณจากวันที่จริง
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
/** จำนวนเดือนของแต่ละช่วง (ใช้เป็นความยาวแถบ) */
const SPANS = COLORS.map((_, p) => MONTHS.filter((_, i) => phaseOf(i) === p).length)

/** การ์ดช่วงตอนไม่ได้เลือก — สีอ่อนประจำช่วง (ตามดีไซน์) · ตอนเลือก = พื้นดำ เงาเหลือง */
const TINT: CSSProperties[] = [
  { background: '#FFFDF8', border: '1.5px solid #D6CEBD' },
  { background: '#EAF0FF', border: '1.5px solid #2B55E6' },
  { background: '#EFE8DA', border: '1.5px solid #191816' },
  { background: '#F2FBF5', border: '2px dashed #1F7A45' },
]
const PICKED: CSSProperties = { background: '#191816', color: '#FFFDF8', border: '2px solid #191816', boxShadow: '4px 4px 0 #FFC940' }

const PHASES: { when: L; title: L; head: L; body: L }[] = [
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
  const inRange = cur >= 0 && cur < MONTHS.length
  const curPhase = inRange ? phaseOf(cur) : -1
  const [phase, setPhase] = useState(inRange ? curPhase : 2)
  const p = PHASES[phase]

  return (
    <Reveal className="flex flex-col gap-4 md:gap-[22px] lg:gap-7">
      <div className="flex flex-col items-center gap-2 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <h2 className="text-[23px] leading-[1.32] font-bold tracking-[-0.01em] md:text-[31px] lg:text-[40px]">
          <span className="mark px-1">{t(txt.title)}</span>
        </h2>
        <span className="font-hand text-[15px] text-ink-2 md:text-[16px] lg:text-[17px]">{t(txt.hint)}</span>
      </div>

      {/* แถบเดือน 14 ช่อง — ไอแพด/คอม (มือถือใช้จุดในรายการแทน) · การ์ดข้างล่างบอกข้อมูลครบแล้ว เลยซ่อนจาก screen reader */}
      <div aria-hidden="true" className="relative mt-[30px] hidden flex-col gap-2 md:flex">
        {inRange && (
          <span className="absolute -top-[34px] flex -translate-x-1/2 flex-col items-center" style={{ left: `${((cur + 0.5) / MONTHS.length) * 100}%` }}>
            <span className="rounded-full border-[1.5px] border-ink bg-yellow px-2.5 py-0.5 text-[12px] font-extrabold whitespace-nowrap">
              {t(txt.now)} · {t(MONTHS[cur])}
            </span>
            <span className="h-3.5 w-0.5 bg-ink" />
          </span>
        )}
        <div className="grid grid-cols-14 items-center gap-1">
          {SPANS.map((span, i) => (
            <span
              key={i}
              className={cn('rounded-lg transition-all duration-300', i === phase ? 'h-3.5 outline-[3px] outline-offset-2 outline-yellow outline-solid' : 'h-2.5')}
              style={{
                gridColumn: `span ${span}`,
                background: i === LAST ? `repeating-linear-gradient(90deg, ${COLORS[i]} 0 8px, transparent 8px 13px)` : COLORS[i],
              }}
            />
          ))}
        </div>
        <div className="grid grid-cols-14 gap-1">
          {MONTHS.map((m, i) => (
            <span key={i} className={cn('font-code text-center text-[10px] lg:text-[11px]', i === cur ? 'font-bold text-ink' : 'text-[#9C958A]')}>
              {t(m)}
            </span>
          ))}
        </div>
      </div>

      {/* การ์ด 4 ช่วง — มือถือแนวตั้ง (จุด + เส้นประ) · ไอแพด 2×2 · คอม 3fr 2fr 5fr 4fr */}
      <div className="relative flex flex-col gap-3.5 md:mt-1.5 md:grid md:grid-cols-2 md:gap-x-3 md:gap-y-4 lg:grid-cols-[3fr_2fr_5fr_4fr]">
        <span aria-hidden="true" className="absolute top-2.5 bottom-2.5 left-[13px] w-0.5 bg-[repeating-linear-gradient(180deg,#191816_0_6px,transparent_6px_10px)] md:hidden" />
        {PHASES.map((x, i) => {
          const on = i === phase
          const now = i === curPhase
          return (
            <div key={i} className="relative grid grid-cols-[28px_minmax(0,1fr)] items-center gap-3 md:block">
              {/* จุดบนเส้น (มือถือ) — ช่วงปัจจุบันเป็นจุดเหลืองใหญ่ */}
              <span aria-hidden="true" className="flex justify-center md:hidden">
                {now ? (
                  <span className="size-[18px] rounded-full border-[2.5px] border-ink bg-yellow shadow-[0_0_0_5px_rgba(255,201,64,.35)]" />
                ) : (
                  <span
                    className="size-3.5 rounded-full"
                    style={i === LAST ? { background: '#FFFDF8', border: '2px dashed #1F7A45' } : { background: COLORS[i], border: `2px solid ${COLORS[i]}` }}
                  />
                )}
              </span>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setPhase(i)}
                className={cn('relative flex h-full min-h-11 w-full min-w-0 flex-col items-start gap-0.5 rounded-[14px] px-3.5 py-3 text-left transition', !on && 'hover:-translate-y-0.5')}
                style={on ? PICKED : TINT[i]}
              >
                <span className="font-code text-[11.5px] opacity-75">{t(x.when)}</span>
                <span className={cn('text-[14.5px] leading-[1.4] font-bold lg:text-[15px]', now && 'pr-14')}>{t(x.title)}</span>
                {now && (
                  <>
                    <span className="absolute -top-[13px] right-3 rounded-full border-[1.5px] border-ink bg-yellow px-2.5 py-0.5 text-[12px] font-extrabold text-ink">{t(txt.now)}</span>
                    <img src="/stickers/gus-chin.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -right-1.5 -bottom-3 h-[70px] lg:h-[78px]" />
                  </>
                )}
              </button>
            </div>
          )
        })}
      </div>

      <div key={phase} className="anim-rise flex flex-col gap-1 rounded-2xl bg-[#EFE8DA] px-4 py-3.5 text-center md:flex-row md:items-baseline md:gap-4 md:px-5 md:py-4 md:text-left">
        <b className="font-hand shrink-0 text-[16px] font-normal md:text-[18px]">{t(p.head)}</b>
        <span className="text-[14px] leading-[1.65] text-[#3E3B35] md:text-[15px]">{t(p.body)}</span>
      </div>
    </Reveal>
  )
}
