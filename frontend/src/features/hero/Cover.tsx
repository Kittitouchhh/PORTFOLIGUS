import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'
import { cn } from '@/utils/cn'
import { scrollToSection } from '@/utils/scroll'

/**
 * ปก (จอ 1) แบบ B "บัตรพนักงานใบแรก" — design-handoff 2.1 / v8 `V8*01Cover`
 * บัตรห้อยคอหล่นลงมาจากบนแล้วแกว่งเบา ๆ (จุดหมุนที่ตัวหนีบ) · รูป hover/แตะ สลับชุดนักศึกษา ↔ ลำลอง
 * ข้อความ: ป้ายสหกิจ → H1 สองบรรทัด → แนะนำตัว → เคยทำ/อยากต่อยอด → เลื่อนดูงาน (โผล่ทีละอย่าง) · ไม่มีปุ่ม CTA ตามที่เจ้าของขอ
 * จอคอม (≥ lg): บัตร 300 ซ้าย ข้อความขวา สูงเต็มจอ
 * ไอแพด (md): บัตร 262 ซ้าย หัวข้อขวา แล้ว "เคยทำ → อยากต่อยอด" เต็มแถวด้านล่าง
 * มือถือ: บัตร 248 กลางจอ (เห็นชื่อ + หัวข้อในจอแรก) ข้อความจัดกลาง เคยทำ ↓ อยากต่อยอด เรียงลง
 * ข้อความบนบัตรห้ามตัดบรรทัด (whitespace-nowrap)
 * จอ ≥ xl: เลื่อนลง → สายคล้องยืดยาว บัตรตามลงมาจนเกาะช่องซ้ายของ "ประวัติการศึกษา" ([data-badge-slot]) แล้วหยุด
 *   ใช้ transform + สายส่วนต่อแบบ absolute ไม่ดันเลย์เอาต์ (ไม่งั้นปกจะสูงขึ้นแล้วดัน section ถัดไปวนไม่จบ)
 *   กริดจอคอมต้องตรงกับกริดใน Education.tsx (xl: 26rem + ช่องขวา · gap 3rem)
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
  // อังกฤษย่อให้สั้น — บัตรมือถือกว้างแค่ 248 และห้ามตัดบรรทัด
  nickC: l(' · วิศวกรรมคอมพิวเตอร์ ปี 4', ' · Comp. Eng., year 4'),
  ready: l('พร้อมเริ่มงาน', 'Available'),
  readyWhen: l('ม.ค. – เม.ย. 2570', 'Jan – Apr 2027'),
}

const an = (k: 'gRise' | 'gPop' | 'gSlide', d: number, dur = 0.7): CSSProperties => ({
  animation: `${k} ${dur}s cubic-bezier(.2,.8,.2,1) ${d}s both`,
})

/** บาร์โค้ดตกแต่ง — ความกว้างแต่ละแท่ง */
const BARS = [3, 1, 4, 2, 1, 3, 2, 4, 1, 3]

/** ความยาวสายคล้องบนจอคอม — ใช้ทั้งตัวสายและตำแหน่งสติกเกอร์ */
const LANYARD_LG = 'clamp(80px,14vh,160px)'

export function Cover() {
  const { t, lang } = useLang()
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
    <div className="relative">
      {/* พื้นลายจุด + แสงเหลืองหลังบัตร */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 -right-[50vw] -left-[50vw] bg-[radial-gradient(rgba(25,24,22,.08)_1px,transparent_1.2px)] bg-[length:22px_22px]" />
      <div aria-hidden="true" className="pointer-events-none absolute top-[90px] left-1/2 h-[420px] w-[520px] -translate-x-[60%] rounded-full bg-[radial-gradient(circle,rgba(255,214,107,.55)_0%,rgba(255,214,107,0)_65%)] md:top-[52px] md:left-[-100px] md:h-[520px] md:w-[600px] md:translate-x-0 lg:top-[120px] lg:left-[2%] lg:h-[620px] lg:w-[760px]" />

      {/*
        กริดเดียวทุกจอ:
        มือถือ 1 คอลัมน์ · ไอแพด [300 | ข้อความ] + แถวล่างเต็มกว้าง (กล่องข้อความเป็น md:contents ลูกเลยเป็นช่องกริดเอง)
        จอคอม [บัตร | ข้อความทั้งก้อน] สูงเต็มจอ ข้อความอยู่กลางแนวตั้ง บัตรห้อยจากขอบบน
      */}
      <div className="relative grid w-full gap-y-5 pb-7 md:grid-cols-[300px_minmax(0,1fr)] md:gap-x-9 md:gap-y-10 md:pb-14 lg:min-h-[100svh] lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-center lg:gap-x-12 lg:pb-0 xl:grid-cols-[26rem_minmax(0,1fr)]">
        {/* บัตรห้อยคอ */}
        <div className="relative flex justify-center md:self-start">
          <div className="cover-badge flex origin-top flex-col items-center">
            <span className="h-7 w-6 border-x-2 border-ink bg-[repeating-linear-gradient(180deg,#2B55E6_0_12px,#2448C4_12px_24px)] md:h-[68px] lg:h-[var(--lanyard)]" style={{ '--lanyard': LANYARD_LG } as CSSProperties} />
            <div ref={moveRef} className="relative flex flex-col items-center">
              {/* สายส่วนต่อ ยืดตามระยะที่บัตรเลื่อนลง */}
              <span ref={extRef} aria-hidden="true" className="absolute bottom-[calc(100%-4px)] h-0 w-6 border-x-2 border-ink bg-[repeating-linear-gradient(0deg,#2B55E6_0_12px,#2448C4_12px_24px)]" />
              <div className="cover-swing flex origin-top flex-col items-center">
                <span className="-mt-0.5 h-[26px] w-[50px] rounded-[7px] border-2 border-ink bg-[#C9C3B6]" />
                {/* ข้อความบนบัตรห้ามตัดบรรทัด */}
                <div className="relative -mt-1 w-[248px] overflow-hidden rounded-[22px] border-2 border-ink bg-card whitespace-nowrap shadow-[8px_9px_0_var(--ink)] md:w-[262px] lg:w-[300px]">
                  <div className="flex h-11 items-center justify-between border-b-2 border-ink bg-yellow px-[18px]">
                    <span className="font-brand text-[15px] font-extrabold tracking-[0.08em]">CO-OP 2027</span>
                    <span className="h-2.5 w-9 rounded-[5px] border-2 border-ink bg-page" />
                  </div>
                  <div className="flex flex-col items-center gap-3 px-4 py-[18px] text-center md:px-5">
                    <div
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                      onClick={() => setHover((h) => !h)}
                      className="relative h-[98px] w-[84px] cursor-pointer overflow-hidden rounded-2xl border-2 border-ink md:h-[128px] md:w-[108px] lg:h-[156px] lg:w-[132px]"
                    >
                      <img src="/photos/portrait-uniform.webp" alt={t(txt.name)} className={cn('absolute inset-0 h-full w-full object-cover object-[center_18%] transition-opacity duration-300', hover && 'opacity-0')} />
                      <img src="/photos/portrait-casual.webp" alt="" className={cn('absolute inset-0 h-full w-full object-cover object-[center_22%] transition-opacity duration-300', !hover && 'opacity-0')} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {/* ชื่ออังกฤษยาวกว่า ย่อลงนิดให้พอดีบัตรโดยไม่ตัดบรรทัด */}
                      <span className={cn('leading-[1.3] font-bold text-ink', lang === 'en' ? 'text-[15px] lg:text-[19px]' : 'text-[17px] lg:text-[20px]')}>{t(txt.name)}</span>
                      <span className="text-[12px] text-[#3E3B35]">
                        {t(txt.nickA)}
                        <b>{t(txt.nickB)}</b>
                        {t(txt.nickC)}
                      </span>
                    </div>
                    <div className="flex w-full items-end justify-between border-t-[1.5px] border-dashed border-line pt-2.5 text-left">
                      <div className="flex flex-col">
                        <span className="text-[10.5px] font-bold text-ink-2">{t(txt.ready)}</span>
                        <span className="font-code text-[12.5px] font-bold text-ink">{t(txt.readyWhen)}</span>
                      </div>
                      <span aria-hidden="true" className="flex h-6 items-stretch gap-[2px]">
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
          {/* สติกเกอร์กัสสะพายกระเป๋า — ยึดจากกึ่งกลางช่อง ให้เกาะขอบซ้ายล่างของบัตรทุกจอ */}
          <img
            src="/stickers/gus-backpack.webp"
            alt=""
            aria-hidden="true"
            className="absolute top-[170px] left-1/2 -ml-[172px] w-[72px] -rotate-6 md:top-[300px] md:-ml-[162px] md:w-24 lg:top-[calc(var(--lanyard)+210px)] lg:-ml-[214px] lg:w-[120px]"
            style={{ '--lanyard': LANYARD_LG } as CSSProperties}
          />
        </div>

        {/* ข้อความ — ไอแพดใช้ md:contents ให้หัวข้ออยู่ขวาบัตร และ "เคยทำ → อยากต่อยอด" ลงไปเต็มแถวล่าง */}
        <div className="flex flex-col gap-5 md:contents lg:flex lg:pt-[30px]">
          <div className="flex flex-col items-center gap-3 text-center md:items-start md:gap-4 md:pt-6 md:text-left lg:gap-5 lg:pt-0">
            <span style={an('gRise', 1.0)} className="g-intro inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-card px-3.5 py-[7px] text-[13px] font-semibold text-ink">
              <span className="size-2 shrink-0 rounded-full bg-[#1F9D55] shadow-[0_0_0_3px_rgba(31,157,85,.2)]" />
              {t(txt.pill)}
            </span>
            <h1 className="text-[21px] leading-[1.45] font-bold !text-ink md:text-[29px] md:leading-[1.36] lg:text-[clamp(2.25rem,3.1vw,2.75rem)] lg:leading-[1.3] lg:tracking-[-0.015em]">
              <span style={an('gRise', 1.2)} className="g-intro block">{t(txt.h1a)}</span>
              <span style={an('gRise', 1.45)} className="g-intro block">
                <span className="cover-mark px-1">{t(txt.h1b)}</span>
              </span>
            </h1>
            <p style={an('gRise', 1.8)} className="g-intro max-w-[620px] text-[14px] leading-[1.65] text-[#3E3B35] md:text-[15px] md:leading-[1.7] lg:text-[17px]">
              {t(txt.intro1)} {t(txt.intro2)}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 md:col-span-2 md:items-stretch lg:col-span-1 lg:mt-1">
            <span style={an('gRise', 2.05)} className="g-intro text-center text-[13px] font-bold text-ink-2 md:text-left">{t(txt.roles)}</span>
            <div className="flex flex-col items-center gap-1.5 md:flex-row md:items-stretch md:gap-3">
              <span style={an('gSlide', 2.25)} className="g-intro flex shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-ink bg-card px-4 py-3 md:items-start">
                <span className="text-[11px] font-bold text-ink-2">{t(txt.did)}</span>
                <span className="text-[13px] font-bold whitespace-nowrap text-ink md:text-[14.5px] lg:text-[16px]">Business Analyst</span>
              </span>
              {/* มือถือ: ลูกศรลง · ไอแพด/คอม: ลูกศรขวา */}
              <span aria-hidden="true" style={an('gRise', 2.4)} className="g-intro self-center text-[18px] leading-none font-extrabold md:hidden">↓</span>
              <svg style={an('gRise', 2.4)} className="g-intro hidden shrink-0 self-center md:block" width="34" height="20" viewBox="0 0 48 20" fill="none" stroke="#191816" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 10h40" />
                <path d="m34 3 8 7-8 7" />
              </svg>
              <span style={an('gPop', 2.5)} className="g-intro flex min-w-0 flex-col items-center rounded-2xl bg-ink px-4 py-3 text-center text-page shadow-[4px_4px_0_var(--yellow)] md:grow md:items-start md:text-left">
                <span className="text-[11px] font-bold text-yellow">{t(txt.want)}</span>
                <span className="text-[13px] leading-[1.45] font-bold md:text-[14.5px] lg:text-[16px]">
                  Pre-sales · Solution Consultant
                  <br />
                  Business Development
                </span>
                <span className="mt-[3px] text-[11.5px] leading-snug text-[#C9C3B6]">{t(txt.other)}</span>
              </span>
            </div>
            <button type="button" onClick={() => scrollToSection('work')} style={an('gRise', 2.9)} className="g-intro font-hand mt-1 inline-flex min-h-11 items-center self-center text-[15px] text-ink-2 transition hover:text-ink md:mt-2 md:text-[17px] lg:self-start lg:text-[18px]">
              {t(txt.scroll)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
