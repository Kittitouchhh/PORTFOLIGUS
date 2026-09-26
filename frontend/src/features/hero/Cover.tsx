import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'
import { cn } from '@/utils/cn'
import { scrollToSection } from '@/utils/scroll'

/**
 * ปก (จอ 1) แบบ B "บัตรพนักงานใบแรก" — design-handoff 2.1 / 00-cover-B.dc.html
 * ซ้าย: บัตรห้อยคอหล่นลงมาจากบนแล้วแกว่งเบา ๆ (จุดหมุนที่ปลายสาย) · รูป hover สลับชุดนักศึกษา ↔ ลำลอง
 * ขวา: ป้ายสหกิจ → H1 สองบรรทัด → แนะนำตัว → กล่องตำแหน่ง → เลื่อนดูงาน (โผล่ทีละอย่าง)
 * ไม่มีปุ่ม CTA ตามที่เจ้าของขอ · มือถือ: บัตรอยู่บน ย่อ ~80% ข้อความอยู่ล่าง
 * จอ ≥ xl: เลื่อนลง → สายคล้องยืดยาว บัตรตามลงมาจนเกาะช่องซ้ายของ "ประวัติการศึกษา" ([data-badge-slot]) แล้วหยุด
 *   ใช้ transform + สายส่วนต่อแบบ absolute ไม่ดันเลย์เอาต์ (ไม่งั้นปกจะสูงขึ้นแล้วดัน section ถัดไปวนไม่จบ)
 */

const txt = {
  pill: l('กำลังหาที่ฝึกงานสหกิจ · ม.ค. – เม.ย. 2570', 'Looking for a co-op placement · Jan – Apr 2027'),
  h1a: l('พร้อมก้าวต่อในบทบาทที่ใช่', 'Ready for the right next role'),
  h1b: l('และสร้างคุณค่าให้กับองค์กรของคุณ', 'and to create value for your organisation'),
  intro1: l('สวัสดีครับ ผมชื่อกิตติธัช สกุลศักดิ์พินิจ นักศึกษาวิศวกรรมคอมพิวเตอร์ ปี 4', 'Hi, I’m Kittitouch Sakulsakpinit, a 4th-year Computer Engineering student'),
  intro2: l('มหาวิทยาลัยธุรกิจบัณฑิตย์ กำลังหาที่ฝึกงานสหกิจเต็มเวลา', 'at Dhurakij Pundit University, looking for a full-time co-op placement'),
  roles: l('ตำแหน่งที่เคยทำ และอยากต่อยอด', 'The role I’ve done, and where I want to grow'),
  did: l('เคยทำ', 'Done'),
  want: l('อยากต่อยอด', 'Next'),
  other: l('หรือตำแหน่งอื่น ๆ ที่ช่วยองค์กรของคุณได้ครับ', 'or any other role where I can help your company'),
  scroll: l('เลื่อนดูงานจริง ↓', 'See the real work ↓'),
  name: l('กิตติธัช สกุลศักดิ์พินิจ', 'Kittitouch Sakulsakpinit'),
  nickA: l('ชื่อเล่น ', 'Nickname '),
  nickB: l('กัส', 'Gus'),
  nickC: l(' · วิศวกรรมคอมพิวเตอร์ ปี 4', ' · Computer Engineering, year 4'),
  ready: l('พร้อมเริ่มงาน', 'Available'),
  readyWhen: l('ม.ค. – เม.ย. 2570', 'Jan – Apr 2027'),
}

const an = (k: 'gRise' | 'gPop' | 'gSlide', d: number, dur = 0.7): CSSProperties => ({
  animation: `${k} ${dur}s cubic-bezier(.2,.8,.2,1) ${d}s both`,
})

/** บาร์โค้ดตกแต่ง — ความกว้างแต่ละแท่ง */
const BARS = [3, 1, 4, 2, 1, 3, 2, 4, 1, 3]

export function Cover() {
  const { t } = useLang()
  const [hover, setHover] = useState(false)
  const moveRef = useRef<HTMLDivElement | null>(null)
  const extRef = useRef<HTMLSpanElement | null>(null)

  // บัตรตามลงมาตอนเลื่อน
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1280px)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    let travel = 0
    let frame = 0
    const apply = (y: number) => {
      travel = y
      const tf = y ? `translateY(${y}px)` : ''
      if (moveRef.current) moveRef.current.style.transform = tf
      if (extRef.current) extRef.current.style.height = `${y + 4}px`
    }
    const update = () => {
      frame = 0
      const move = moveRef.current
      const slot = document.querySelector<HTMLElement>('[data-badge-slot]')
      if (!move || !slot || !wide.matches || still.matches || !slot.offsetHeight) return apply(0)
      const m = move.getBoundingClientRect()
      const r = slot.getBoundingClientRect()
      // ระยะที่บัตรต้องเลื่อนให้กึ่งกลางบัตรตรงกับกึ่งกลางช่อง (คิดจากตำแหน่งเดิมก่อนเลื่อน)
      const max = Math.max(0, r.top + r.height / 2 - (m.top - travel + m.height / 2))
      apply(Math.round(Math.min(Math.max(window.scrollY, 0), max)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    wide.addEventListener('change', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      wide.removeEventListener('change', onScroll)
    }
  }, [])

  return (
    <div className="relative flex min-h-[100svh] items-center py-10 lg:py-0">
      {/* พื้นลายจุด + แสงเหลืองหลังบัตร */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 -right-[50vw] -left-[50vw] bg-[radial-gradient(rgba(25,24,22,.08)_1px,transparent_1.2px)] bg-[length:26px_26px]" />
      <div aria-hidden="true" className="pointer-events-none absolute top-[29%] left-1/2 -translate-x-[70%] size-[35rem] rounded-full bg-[radial-gradient(circle,rgba(255,214,107,.55)_0%,rgba(255,214,107,0)_65%)]" />

      <div className="relative mx-auto grid w-full items-center gap-10 lg:w-auto lg:grid-cols-[22rem_minmax(0,42rem)] lg:justify-center lg:gap-16 xl:grid-cols-[24rem_minmax(0,44rem)] xl:gap-24">
        {/* บัตรห้อยคอ */}
        <div className="relative mx-auto -mt-10 w-[80%] max-w-[26rem] origin-top scale-90 sm:w-full sm:scale-100 lg:-mt-0 lg:self-start">
          <div className="cover-badge flex origin-top flex-col items-center">
            <span className="h-[18vh] w-[30px] border-x-2 border-ink bg-[repeating-linear-gradient(180deg,#2B55E6_0_16px,#2448C4_16px_32px)] lg:h-[25vh]" />
            <div ref={moveRef} className="relative flex w-full flex-col items-center">
            {/* สายส่วนต่อ ยืดตามระยะที่บัตรเลื่อนลง */}
            <span ref={extRef} aria-hidden="true" className="absolute bottom-[calc(100%-4px)] h-0 w-[30px] border-x-2 border-ink bg-[repeating-linear-gradient(0deg,#2B55E6_0_16px,#2448C4_16px_32px)]" />
            <div className="cover-swing flex w-full origin-top flex-col items-center">
            <span className="-mt-0.5 h-8 w-[60px] rounded-[9px] border-2 border-ink bg-[#C9C3B6]" />
            <div className="relative -mt-1.5 w-full max-w-[23.75rem] overflow-hidden rounded-[26px] border-2 border-ink bg-card shadow-[10px_12px_0_var(--ink),0_50px_70px_-30px_rgba(25,24,22,.45)]">
              <div className="flex h-[60px] items-center justify-between border-b-2 border-ink bg-yellow px-5">
                <span className="font-brand text-[18px] font-extrabold tracking-[0.08em]">CO-OP 2027</span>
                <span className="h-3 w-11 rounded-md border-2 border-ink bg-page" />
              </div>
              <div className="flex flex-col items-center gap-3.5 px-6 pt-6 pb-6 text-center">
                <div
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  onClick={() => setHover((h) => !h)}
                  className="relative h-[200px] w-[170px] cursor-pointer overflow-hidden rounded-[18px] border-2 border-ink"
                >
                  <img src="/photos/portrait-uniform.webp" alt={t(txt.name)} className={cn('absolute inset-0 h-full w-full object-cover object-[center_18%] transition-opacity duration-300', hover && 'opacity-0')} />
                  <img src="/photos/portrait-casual.webp" alt="" className={cn('absolute inset-0 h-full w-full object-cover object-[center_22%] transition-opacity duration-300', !hover && 'opacity-0')} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[clamp(1.4rem,2.2vw,1.75rem)] leading-tight font-bold text-ink">{t(txt.name)}</span>
                  <span className="text-[15px] text-[#3E3B35]">
                    {t(txt.nickA)}
                    <b>{t(txt.nickB)}</b>
                    {t(txt.nickC)}
                  </span>
                </div>
                <div className="flex w-full items-end justify-between border-t-[1.5px] border-dashed border-line pt-3.5 text-left">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-bold text-ink-2">{t(txt.ready)}</span>
                    <span className="font-code text-[15px] font-bold text-ink">{t(txt.readyWhen)}</span>
                  </div>
                  <span aria-hidden="true" className="flex h-8 items-stretch gap-[3px]">
                    {BARS.map((w, i) => (
                      <i key={i} className="bg-ink" style={{ width: w }} />
                    ))}
                  </span>
                </div>
              </div>
            </div>
            </div>
            </div>
          </div>
          <img src="/stickers/gus-backpack.webp" alt="" aria-hidden="true" className="absolute bottom-[-2rem] -left-16 w-32 -rotate-6 sm:-left-24 sm:w-[170px] lg:bottom-[6%]" />
        </div>

        {/* ข้อความ */}
        <div className="flex flex-col gap-5 text-left lg:gap-[22px]">
          <span style={an('gRise', 1.0)} className="g-intro inline-flex items-center gap-2.5 self-start rounded-full border-[1.5px] border-ink bg-card px-4 py-2 text-[14px] font-semibold text-ink sm:text-[16px]">
            <span className="size-2.5 rounded-full bg-[#1F9D55] shadow-[0_0_0_4px_rgba(31,157,85,.2)]" />
            {t(txt.pill)}
          </span>
          <h1 className="text-[clamp(1.9rem,3.1vw,2.6rem)] leading-[1.25] font-bold tracking-[-0.02em] !text-ink">
            <span style={an('gRise', 1.2)} className="g-intro block">{t(txt.h1a)}</span>
            <span style={an('gRise', 1.45)} className="g-intro block">
              <span className="cover-mark px-1.5">{t(txt.h1b)}</span>
            </span>
          </h1>
          <p style={an('gRise', 1.8)} className="g-intro text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.7] text-[#3E3B35]">
            {t(txt.intro1)}
            <br />
            {t(txt.intro2)}
          </p>
          <div className="mt-2 flex flex-col gap-2.5">
            <span style={an('gRise', 2.05)} className="g-intro text-[14px] font-semibold text-ink-2">{t(txt.roles)}</span>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <span style={an('gSlide', 2.25)} className="g-intro flex flex-col justify-center rounded-2xl border-2 border-ink bg-card px-4.5 py-3">
                <span className="text-[12px] font-bold text-ink-2">{t(txt.did)}</span>
                <span className="text-[18px] font-bold whitespace-nowrap text-ink">Business Analyst</span>
              </span>
              <svg style={an('gRise', 2.4)} className="g-intro shrink-0 rotate-90 self-center sm:rotate-0" width="34" height="20" viewBox="0 0 48 20" fill="none" stroke="#191816" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 10h40" />
                <path d="m34 3 8 7-8 7" />
              </svg>
              <span style={an('gPop', 2.5)} className="g-intro flex flex-col justify-center rounded-2xl bg-ink px-4.5 py-3 text-page shadow-[4px_4px_0_var(--yellow)]">
                <span className="text-[12px] font-bold text-yellow">{t(txt.want)}</span>
                <span className="text-[17px] leading-[1.35] font-bold">
                  Pre-sales · Solution Consultant
                  <br />
                  Business Development
                </span>
                <span className="mt-1.5 border-t border-page/20 pt-1.5 text-[13px] leading-snug text-page/80">{t(txt.other)}</span>
              </span>
            </div>
          </div>
          <button type="button" onClick={() => scrollToSection('work')} style={an('gRise', 2.9)} className="g-intro font-hand mt-4 self-start text-[18px] text-ink-2 transition hover:text-ink">
            {t(txt.scroll)}
          </button>
        </div>
      </div>
    </div>
  )
}
