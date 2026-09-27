import { useEffect, useRef, useState, type ComponentType } from 'react'
import { createPortal } from 'react-dom'
import { Container } from '@/components/layouts/Container'
import { SectionBand } from '@/components/layouts/SectionBand'
import { TiltMarquee } from '@/components/common/TiltMarquee'
import { Reveal } from '@/components/common/Reveal'
import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'
import { cn } from '@/utils/cn'
import { CASES, userImg, type Demo } from './cases'
import { TrackingDemo } from './playground/TrackingDemo'
import { GraphicDemo } from './playground/GraphicDemo'
import { OutsourceDemo } from './playground/OutsourceDemo'

/**
 * 01 — งาน (design-handoff 7.3 ข้อ 5 / V8{D,T,M}05Work)
 * จอคอม: หัวข้อซ้าย + การ์ด 3 เคสขวาแถวเดียว · การ์ดรายละเอียด ซ้าย ก่อน → หลัง + ผมออกแบบให้ / ขวา demo 540×500
 *        ปุ่มลูกศรกลม ‹ › เกาะขอบการ์ด
 * ไอแพด: การ์ด 3 เคสแถวเดียว · รายละเอียดเรียงลง · demo สูง 440
 * มือถือ: การ์ดเคสปัดซ้าย-ขวา (scroll-snap กว้าง 272) + จุดบอกหน้า · demo สูง 250 · กดแล้วเปิดป็อปอัปเต็มจอ
 * แถบวิ่งเอียงก่อน section นี้อยู่ที่ HomePage (TiltMarquee)
 */

const txt = {
  eyebrow: l('งาน', 'Work'),
  // จอคอมตัดบรรทัดระหว่าง 2 ท่อน
  titleA: l('งานที่ออกแบบ', 'Work I designed '),
  titleB: l('ให้ผู้ใช้จริง', 'for real users'),
  hint: l('กดการ์ดเพื่อดูรายละเอียด ↓', 'Tap a card for details ↓'),
  hintSwipe: l('ปัดซ้าย–ขวาเพื่อเลือกงาน →', 'Swipe to pick a case →'),
  viewing: l('กำลังดูอยู่ด้านล่าง ↓', 'Showing below ↓'),
  view: l('ดูรายละเอียด →', 'See details →'),
  usedBy: l('ใช้โดย: ', 'Used by: '),
  before: l('ก่อน', 'Before'),
  after: l('หลัง', 'After'),
  sadAlt: l('ผู้ใช้ตอนเจอปัญหา', 'The user facing the problem'),
  happyAlt: l('ผู้ใช้หลังได้ระบบใหม่', 'The user with the new system'),
  designed: l('ผมออกแบบให้', 'What I designed'),
  play: l('กดเพื่อลองเล่น', 'Tap to try it'),
  playSub: l('หน้าจอที่ผมออกแบบจริง · ข้อมูลสมมติ', 'The real screen I designed · sample data'),
  playAria: l('กดเพื่อลองเล่นหน้าจอจริง', 'Open the real screen to try it'),
  dialog: l('ลองเล่นหน้าจอจริง', 'Try the real screen'),
  close: l('ปิด', 'Close'),
  caseWord: l('เคส', 'Case'),
  prev: l('งานก่อนหน้า', 'Previous case'),
  next: l('งานถัดไป', 'Next case'),
  nextShort: l('ถัดไป', 'Next'),
  nextCase: l('ดูตัวอย่างต่อไป', 'Next example'),
  backFirst: l('กลับไปดูเคสแรก', 'Back to the first case'),
  pages: l('หน้า', 'Page'),
}

const DEMOS: Record<Demo, ComponentType> = { tt: TrackingDemo, gr: GraphicDemo, os: OutsourceDemo }

/** ขนาดดีไซน์ของ mockup ทุกตัว */
const MW = 648
const MH = 640

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** วัดขนาดกล่องจริง — ใช้คำนวณ scale ของ mockup ในกล่องตัวอย่าง */
function useSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(node)
    return () => ro.disconnect()
  }, [])
  return [ref, size] as const
}

/** ขนาดจอปัจจุบัน — ป็อปอัปคำนวณ scale ให้ mockup พอดีจอ */
function useViewport() {
  const get = () => ({ w: window.innerWidth, h: window.innerHeight })
  const [vp, setVp] = useState(get)
  useEffect(() => {
    const on = () => setVp(get())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return vp
}

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

const Arrow = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
    <path d={dir === 'left' ? 'M19 12H5M11 6l-6 6 6 6' : 'M5 12h14M13 6l6 6-6 6'} />
  </svg>
)

const Check = () => (
  <span aria-hidden="true" className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-[#1F9D55]">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFDF8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5 9-10" />
    </svg>
  </span>
)

/**
 * ป็อปอัปลองเล่น mockup
 * จอคอม/ไอแพด: mockup กลางจอบนพื้นดำโปร่ง + ตัวละครภาพนิ่ง 2 ตัวที่มุมล่าง
 * มือถือ: เต็มจอ พื้นดำ แถบหัว (ชื่อ + ✕) แล้ว mockup ย่อให้พอดีจอ
 */
function MockupModal({ demo, user, onClose }: { demo: Demo; user: 1 | 2 | 3; onClose: () => void }) {
  const { t } = useLang()
  const Mock = DEMOS[demo]
  const { w, h } = useViewport()
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  // เก็บ onClose ล่าสุดไว้ใน ref — effect ด้านล่างจะได้ทำงานครั้งเดียวตอนเปิด
  const closeFn = useRef(onClose)
  useEffect(() => {
    closeFn.current = onClose
  }, [onClose])
  const mobile = w < 768
  const s = mobile ? Math.min((w - 24) / MW, (h - 56 - 24) / MH) : Math.min(1.46, (w * 0.8) / MW, (h * 0.8) / MH)

  // ล็อกหน้าข้างหลัง · โฟกัสปุ่มปิด · Esc ปิด · Tab วนอยู่ในป็อปอัป · ปิดแล้วคืนโฟกัส
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    document.documentElement.classList.add('modal-open')
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return closeFn.current()
      if (e.key !== 'Tab' || !dialogRef.current) return
      const items = dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('modal-open')
      prev?.focus()
    }
  }, [])

  const mock = (
    <div className="absolute top-0 left-0 overflow-hidden rounded-[10px] shadow-[0_0_0_1.5px_#191816,0_24px_60px_rgba(0,0,0,.5)]" style={{ width: MW, height: MH, transform: `scale(${s})`, transformOrigin: '0 0' }}>
      <Mock />
    </div>
  )

  if (mobile) {
    return createPortal(
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={t(txt.dialog)} className="rm-still fixed inset-0 z-[100] flex flex-col bg-ink text-page [animation:backdropIn_.2s_ease-out_both]">
        <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-[#3A3833] pr-2 pl-4">
          <span className="truncate text-[15px] font-bold">{t(txt.dialog)}</span>
          <button ref={closeRef} type="button" onClick={onClose} aria-label={t(txt.close)} className="grid size-11 place-items-center rounded-full bg-yellow text-ink">
            <CloseIcon />
          </button>
        </div>
        {/* แตะพื้นที่ว่างรอบ mockup = ปิด */}
        <div className="flex flex-1 items-center justify-center overflow-hidden" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <div className="relative [animation:popIn_.35s_cubic-bezier(.2,.8,.2,1)_both]" style={{ width: MW * s, height: MH * s }}>
            {mock}
          </div>
        </div>
      </div>,
      document.body,
    )
  }

  const charH = 'min(255px, 30vh)'

  return createPortal(
    <div className="rm-still fixed inset-0 z-[100]">
      <div onClick={onClose} className="absolute inset-0 bg-[rgba(25,24,22,.86)] backdrop-blur-[4px] [animation:backdropIn_.25s_ease-out_both]" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={t(txt.dialog)} className="pointer-events-auto relative [animation:popIn_.4s_cubic-bezier(.2,.8,.2,1)_both]" style={{ width: MW * s, height: MH * s }}>
          {mock}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t(txt.close)}
            className="absolute -top-7 -right-7 grid size-14 place-items-center rounded-full border-2 border-ink bg-yellow text-ink shadow-[3px_3px_0_var(--ink)] transition hover:scale-105"
          >
            <CloseIcon />
          </button>
        </div>
      </div>
      <img src={userImg(user).still} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-[52px] left-4 z-[2] w-auto [animation:charPopL_.6s_.25s_cubic-bezier(.2,.8,.2,1)_both]" style={{ height: charH }} />
      <img src="/stickers/gus-laptop-still.webp" alt="" aria-hidden="true" className="pointer-events-none absolute right-4 bottom-[52px] z-[2] w-auto [animation:charPopR_.6s_.4s_cubic-bezier(.2,.8,.2,1)_both]" style={{ height: charH }} />
    </div>,
    document.body,
  )
}

/**
 * กล่องตัวอย่าง mockup (สูง 250 / 440 / 500) — กดแล้วเปิดป็อปอัป
 * ตัว mockup ในกล่องเป็นภาพตัวอย่างเท่านั้น (inert + pointer-events: none) · ปุ่มจริงคือปุ่มโปร่งใสที่วางทับเต็มกล่อง
 * (เดิมทั้งกล่องเป็น <button> ที่มีปุ่มแท็บของ demo อยู่ข้างใน = button ซ้อน button)
 */
function Teaser({ demo, onOpen }: { demo: Demo; onOpen: () => void }) {
  const { t } = useLang()
  const Mock = DEMOS[demo]
  const [ref, { w, h }] = useSize<HTMLDivElement>()
  // ดีไซน์: จอคอม .74 · ไอแพด .9 · มือถือ .5 — กล่องแคบกว่านั้นก็ย่อให้พอดีความกว้าง
  const base = h >= 480 ? 0.74 : h >= 400 ? 0.9 : 0.5
  const s = Math.min(base, ((w || MW) - 24) / MW)
  return (
    <div ref={ref} className="group relative h-[250px] w-full overflow-hidden rounded-[18px] border-2 border-ink bg-[#E9E6DF] md:h-[440px] lg:h-[500px]">
      <div
        inert
        aria-hidden="true"
        className="pointer-events-none absolute top-3.5 left-1/2 opacity-80 grayscale-[.25] select-none"
        style={{ width: MW, height: MH, marginLeft: -MW / 2, transform: `scale(${s})`, transformOrigin: '50% 0' }}
      >
        <Mock />
      </div>
      <span aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[rgba(25,24,22,.32)] text-card transition-colors group-hover:bg-[rgba(25,24,22,.22)]">
        <span className="grid size-[68px] place-items-center rounded-full border-2 border-ink bg-yellow text-ink shadow-[0_0_0_8px_rgba(255,201,64,.3)] transition group-hover:scale-110">
          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </span>
        <span className="rounded-full bg-ink px-4 py-2 text-[14px] font-bold">{t(txt.play)}</span>
        <span className="px-4 text-center text-[12px] opacity-90">{t(txt.playSub)}</span>
      </span>
      <button type="button" onClick={onOpen} aria-label={t(txt.playAria)} className="absolute inset-0 z-[1] cursor-pointer rounded-[16px] focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-[#2B55E6]" />
    </div>
  )
}

/** ตำแหน่ง scrollLeft ที่ทำให้การ์ดใบที่ k ชิดซ้าย (ชนขอบขวาได้ไม่เกิน scroll สูงสุด) */
function cardLeft(row: HTMLElement, k: number) {
  const card = row.children[k] as HTMLElement | undefined
  if (!card) return 0
  const pad = parseFloat(getComputedStyle(row).paddingLeft) || 0
  return Math.max(0, Math.min(card.offsetLeft - pad, row.scrollWidth - row.clientWidth))
}

function Cases() {
  const { t } = useLang()
  const [i, setI] = useState(0)
  const [modal, setModal] = useState(false)
  const rowRef = useRef<HTMLDivElement | null>(null)
  const c = CASES[i]
  const u = userImg(c.user)
  const last = CASES.length - 1
  const go = (k: number) => {
    setI(k)
    setModal(false)
  }

  // มือถือ: ปัดแถวการ์ดแล้วหยุด → เลือกเคสตามการ์ดที่ชิดซ้าย (จอใหญ่แถวไม่เลื่อน เลยไม่ทำงาน)
  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    let tm = 0
    const onScroll = () => {
      window.clearTimeout(tm)
      tm = window.setTimeout(() => {
        if (row.scrollWidth <= row.clientWidth + 1) return
        let best = 0
        CASES.forEach((_, k) => {
          if (Math.abs(cardLeft(row, k) - row.scrollLeft) < Math.abs(cardLeft(row, best) - row.scrollLeft)) best = k
        })
        setI(best)
      }, 120)
    }
    row.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(tm)
      row.removeEventListener('scroll', onScroll)
    }
  }, [])

  // เปลี่ยนเคสจากปุ่ม → เลื่อนแถวการ์ดให้การ์ดนั้นมาอยู่ในจอ
  useEffect(() => {
    const row = rowRef.current
    if (!row || row.scrollWidth <= row.clientWidth + 1) return
    const left = cardLeft(row, i)
    if (Math.abs(row.scrollLeft - left) > 4) row.scrollTo({ left, behavior: reducedMotion() ? 'auto' : 'smooth' })
  }, [i])

  return (
    <SectionBand tone="work" id="work" className="pb-[52px] md:pb-20">
      <TiltMarquee className="mb-6 pt-9 md:mb-8" />
      <Container>
        {/* หัวข้อ (มือถือจัดกลาง) · การ์ดเลือกเคส 3 ใบ — จอคอมอยู่แถวเดียวกัน */}
        <div className="mb-4 grid grid-cols-[minmax(0,1fr)] gap-4 md:mb-[22px] md:gap-[22px] lg:mb-7 lg:grid-cols-[330px_minmax(0,1fr)] lg:items-end lg:gap-9">
          <Reveal className="flex flex-col items-center gap-1.5 text-center md:items-stretch md:gap-2 md:text-left lg:gap-2.5">
            <p className="font-brand inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.14em] text-ink-2 md:text-[12.5px] lg:text-[13px]">
              01 <span aria-hidden="true" className="h-0.5 w-[26px] bg-ink-2" /> {t(txt.eyebrow)}
            </p>
            <div className="flex flex-col items-center gap-1.5 md:flex-row md:items-end md:justify-between md:gap-4 lg:flex-col lg:items-start lg:gap-2.5">
              <h2 className="text-[23px] leading-[1.32] font-bold tracking-[-0.01em] md:text-[31px] lg:text-[40px]">
                <span className="mark px-1 [box-decoration-break:clone]">
                  {t(txt.titleA)}
                  <br className="hidden lg:inline" />
                  {t(txt.titleB)}
                </span>
              </h2>
              <span className="font-hand text-[15px] text-ink-2 md:hidden">{t(txt.hintSwipe)}</span>
              <span className="font-hand hidden shrink-0 text-ink-2 md:inline md:text-[16px] lg:text-[17px]">{t(txt.hint)}</span>
            </div>
          </Reveal>

          <div>
            <div
              ref={rowRef}
              className="relative -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3.5 overflow-x-auto px-5 pt-1 pb-2.5 [scrollbar-width:none] md:mx-0 md:snap-none md:overflow-visible md:p-0 lg:gap-4 [&::-webkit-scrollbar]:hidden"
            >
              {CASES.map((x, k) => {
                const on = k === i
                return (
                  <button
                    key={x.num}
                    type="button"
                    aria-pressed={on}
                    onClick={() => go(k)}
                    className={cn(
                      'flex w-[272px] shrink-0 snap-start flex-col overflow-hidden rounded-[20px] border-2 border-ink bg-card text-left text-ink transition-transform duration-200 md:w-auto md:min-w-0 md:flex-1',
                      on ? 'shadow-[6px_6px_0_var(--yellow),6px_6px_0_2px_var(--ink)]' : 'opacity-[.92] shadow-[4px_4px_0_var(--ink)] hover:-translate-y-0.5 hover:opacity-100',
                    )}
                  >
                    <span className="flex h-[104px] items-end justify-between border-b-2 border-ink px-3.5 md:h-[84px] lg:h-[100px]" style={{ background: x.tint }}>
                      <span className="font-brand self-center text-[30px] leading-none font-extrabold md:text-[24px] lg:text-[28px]">{x.num}</span>
                      <img src={userImg(x.user).happy} alt="" aria-hidden="true" className="h-24 w-auto md:h-[76px] lg:h-[92px]" />
                    </span>
                    <span className="flex flex-col gap-1.5 px-3.5 pt-3 pb-3.5">
                      <span className="text-[15px] leading-[1.4] font-bold md:text-[14px] lg:text-[15px]">{t(x.code)}</span>
                      <span className="self-start rounded-full bg-ink px-2.5 py-[3px] text-[12px] font-bold text-yellow">{t(x.big)}</span>
                      <span className={cn('text-[12.5px] font-bold', on ? 'text-[#2B55E6]' : 'text-ink-2')}>{on ? t(txt.viewing) : t(txt.view)}</span>
                    </span>
                  </button>
                )
              })}
            </div>
            {/* มือถือ: จุดบอกหน้า */}
            <div className="mt-1.5 flex items-center justify-center gap-2 md:hidden" aria-hidden="true">
              {CASES.map((x, k) => (
                <span key={x.num} className={cn('h-2 rounded-full transition-all', k === i ? 'w-[22px] bg-ink' : 'w-2 bg-[#C9C3B6]')} />
              ))}
              <span className="ml-1.5 font-code text-[12px] text-ink-2">
                {i + 1} / {CASES.length}
              </span>
            </div>
            <span className="sr-only md:hidden" aria-live="polite">
              {t(txt.pages)} {i + 1} / {CASES.length}
            </span>
          </div>
        </div>

        <div className="relative -mx-1 md:mx-0">
          {/* จอคอม: ‹ › กลมเกาะขอบการ์ด */}
          {[
            { k: i - 1, side: 'left' as const, label: txt.prev },
            { k: i + 1, side: 'right' as const, label: txt.next },
          ].map((a) => {
            const off = a.k < 0 || a.k > last
            return (
              <button
                key={a.side}
                type="button"
                disabled={off}
                onClick={() => go(a.k)}
                aria-label={off ? t(a.label) : `${t(a.label)} · ${t(txt.caseWord)} ${CASES[a.k].num}`}
                className={cn(
                  'absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border-2 transition lg:grid',
                  a.side === 'left' ? '-left-6' : '-right-6',
                  off ? 'cursor-not-allowed border-[#C9C3B6] bg-card text-ink-3' : 'border-ink bg-yellow text-ink shadow-[3px_3px_0_var(--ink)] hover:scale-110',
                )}
              >
                <Arrow dir={a.side} />
              </button>
            )
          })}

          <Reveal className="flex flex-col gap-3.5 rounded-[24px] border-2 border-ink bg-card px-4 py-[18px] shadow-[5px_5px_0_var(--ink)] md:gap-4 md:rounded-[26px] md:px-[22px] md:pt-6 md:pb-5 md:shadow-[6px_6px_0_var(--ink)] lg:gap-5 lg:rounded-[28px] lg:px-[30px] lg:pt-7 lg:pb-6">
            <div className="flex flex-col items-center gap-3.5 text-center md:flex-row md:items-start md:text-left">
              <span className="font-brand grid size-[42px] shrink-0 place-items-center rounded-full border-2 border-ink text-[15px] font-extrabold" style={{ background: c.tint }}>
                {c.num}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[16px] leading-[1.45] font-bold md:text-[19px] lg:text-[22px]">{t(c.title)}</span>
                <span className="text-[13px] text-ink-2">
                  {t(txt.usedBy)}
                  {t(c.context)}
                </span>
              </div>
            </div>

            <div key={c.num} className="flex flex-col gap-3.5 [animation:photoIn_.45s_ease-out_both] md:gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-7 xl:grid-cols-[minmax(0,1fr)_540px]">
              {/* ซ้าย: ก่อน → หลัง + ผมออกแบบให้ */}
              <div className="flex flex-col gap-3.5 md:gap-4 lg:gap-3.5">
                <div className="grid grid-cols-2 items-stretch gap-2.5 md:grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)]">
                  <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-page px-3 py-3.5 text-center">
                    <span className="text-[12px] font-extrabold tracking-[0.08em] text-ink-2">{t(txt.before)}</span>
                    <img src={u.sad} alt={t(txt.sadAlt)} className="h-[70px] w-auto md:h-[84px]" />
                    <span className="text-[12px] leading-[1.55] text-[#3E3B35] md:text-[13px]">{t(c.problem)}</span>
                  </div>
                  <span aria-hidden="true" className="hidden justify-center self-center md:flex">
                    <Arrow dir="right" />
                  </span>
                  <div className="flex flex-col items-center gap-1.5 rounded-2xl border-2 border-ink px-3 py-3.5 text-center" style={{ background: c.tint }}>
                    <span className="text-[12px] font-extrabold tracking-[0.08em]">{t(txt.after)}</span>
                    <img src={u.happy} alt={t(txt.happyAlt)} className="h-[70px] w-auto md:h-[84px]" />
                    <span className="text-[12.5px] font-bold md:text-[13.5px]">{t(c.big)}</span>
                    <span className="text-[12px] leading-[1.55] text-[#3E3B35] md:text-[13px]">{t(c.small)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border-[1.5px] border-dashed border-line p-3.5">
                  <img src="/stickers/gus-laptop-still.webp" alt="" aria-hidden="true" className="size-14 shrink-0 object-contain md:size-[72px]" />
                  <div className="flex flex-col gap-[5px]">
                    <span className="text-[14px] font-extrabold">{t(txt.designed)}</span>
                    {c.did.map((d, k) => (
                      <span key={k} className="flex items-start gap-2 text-[12.5px] leading-normal text-[#3E3B35] md:text-[13.5px]">
                        <Check />
                        {t(d)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ขวา (จอคอม) / ล่าง: กล่องตัวอย่าง mockup */}
              <Teaser demo={c.demo} onOpen={() => setModal(true)} />
            </div>

            {/* แถบล่าง: อยู่เคสไหน · ดูตัวอย่างต่อไป */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-t-[1.5px] border-dashed border-line pt-3.5">
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="text-[12.5px] font-bold text-ink-2">{t(txt.caseWord)}</span>
                {CASES.map((x, k) => (
                  <button
                    key={x.num}
                    type="button"
                    onClick={() => go(k)}
                    aria-current={k === i ? 'true' : undefined}
                    aria-label={`${t(txt.caseWord)} ${x.num}`}
                    className={cn(
                      'font-brand grid size-11 place-items-center rounded-full text-[13px] font-extrabold transition',
                      k === i ? 'bg-ink text-yellow' : 'border-[1.5px] border-ink bg-card hover:-translate-y-0.5',
                    )}
                  >
                    {x.num}
                  </button>
                ))}
                <span className="font-code hidden text-[12px] whitespace-nowrap text-ink-2 md:inline">/ {String(CASES.length).padStart(2, '0')}</span>
              </div>
              <button
                type="button"
                onClick={() => go(i === last ? 0 : i + 1)}
                aria-label={`${i === last ? t(txt.backFirst) : t(txt.nextCase)} · ${t(txt.caseWord)} ${CASES[i === last ? 0 : i + 1].num}`}
                className="inline-flex h-[46px] items-center gap-2 rounded-full border-2 border-ink bg-yellow px-3.5 text-[14px] font-bold whitespace-nowrap text-ink shadow-[3px_3px_0_var(--ink)] transition hover:-translate-y-0.5 md:px-[18px]"
              >
                <span className="md:hidden">{t(txt.nextShort)}</span>
                <span className="hidden md:inline">
                  {i === last ? t(txt.backFirst) : t(txt.nextCase)} {CASES[i === last ? 0 : i + 1].num}
                </span>
                <Arrow dir="right" />
              </button>
            </div>
          </Reveal>
        </div>
      </Container>
      {modal && <MockupModal demo={c.demo} user={c.user} onClose={() => setModal(false)} />}
    </SectionBand>
  )
}

export function Work() {
  return <Cases />
}
