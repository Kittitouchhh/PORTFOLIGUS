/**
 * ⚠️ ชุดจอคอม (≥ 1100px) — โค้ดหน้าตาเดิมก่อน v8 ตามที่เจ้าของขอ (27 ก.ย.) · มือถือ/ไอแพดใช้ไฟล์ v8 ในโฟลเดอร์แม่
 * HomePage เลือกชุดด้วย useIsDesktop() — แก้เนื้อหาต้องแก้ทั้งสองชุด
 */
import { useEffect, useRef, useState, type ComponentType } from 'react'
import { createPortal } from 'react-dom'
import { Container } from '@/components/layouts/Container'
import { SectionBand } from '@/components/layouts/SectionBand'
import { TiltMarquee } from '@/components/common/TiltMarquee'
import { Reveal } from '@/components/common/Reveal'
import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'
import { cn } from '@/utils/cn'
import { scrollToSection } from '@/utils/scroll'
import { CASES, userImg, type Demo } from '../cases'
import { TrackingDemo } from '../playground/TrackingDemo'
import { GraphicDemo } from '../playground/GraphicDemo'
import { OutsourceDemo } from '../playground/OutsourceDemo'

/**
 * 01 — งาน (design-handoff 2.4 / 04-work-section-B)
 * บน: การ์ดภาพรวม 3 เคส กดเลือก · ล่าง: ก่อน → หลัง + ผมออกแบบให้ | ปุ่มตัวอย่าง mockup (เทาเบลอ)
 * กดปุ่ม → ป็อปอัปเฉพาะตัว mockup กลางจอ + ตัวละครภาพนิ่ง 2 ตัวที่มุมล่าง
 * ท้ายการ์ด: ปุ่ม ‹ › ซ้ายสุด/ขวาสุดสลับเคส + แถบล่าง "ดูตัวอย่างต่อไป" / "ดูหัวข้ออื่นต่อ"
 */

const txt = {
  eyebrow: l('งาน', 'Work'),
  title: l('งานที่ออกแบบให้ผู้ใช้จริง', 'Work I designed for real users'),
  hint: l('กดการ์ดเพื่อดูรายละเอียด ↓', 'Tap a card for details ↓'),
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
  prev: l('เคสก่อนหน้า', 'Previous case'),
  nextCase: l('ดูตัวอย่างต่อไป', 'Next example'),
  backFirst: l('กลับไปดูเคสแรก', 'Back to the first case'),
  moreTopics: l('ดูหัวข้ออื่นต่อ', 'See other topics'),
}

const DEMOS: Record<Demo, ComponentType> = { tt: TrackingDemo, gr: GraphicDemo, os: OutsourceDemo }

/** ขนาดดีไซน์ของ mockup ทุกตัว */
const MW = 648
const MH = 640

/** วัดความกว้างกล่องจริง — ใช้คำนวณ scale ของ mockup ในปุ่มตัวอย่าง */
function useWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [w, setW] = useState(0)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(node)
    return () => ro.disconnect()
  }, [])
  return [ref, w] as const
}

/** ขนาดจอปัจจุบัน — ป็อปอัปคำนวณ scale ให้ mockup ไม่เกิน ~80% ของจอ */
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

function MockupModal({ demo, user, onClose }: { demo: Demo; user: 1 | 2 | 3; onClose: () => void }) {
  const { t } = useLang()
  const Mock = DEMOS[demo]
  const { w, h } = useViewport()
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const mobile = w < 768
  const s = mobile ? Math.min((w - 24) / MW, (h - 96) / MH) : Math.min(1.46, (w * 0.8) / MW, (h * 0.8) / MH)

  // ล็อกหน้าข้างหลัง · โฟกัสปุ่มปิด · Esc ปิด · Tab วนอยู่ในป็อปอัป · ปิดแล้วคืนโฟกัส
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    document.documentElement.classList.add('modal-open')
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
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
  }, [onClose])

  const charH = 'min(255px, 30vh)'

  return createPortal(
    <div className="rm-still fixed inset-0 z-[100]">
      <div onClick={onClose} className="absolute inset-0 bg-[rgba(25,24,22,.86)] backdrop-blur-[4px] [animation:backdropIn_.25s_ease-out_both]" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={t(txt.dialog)} className="pointer-events-auto relative [animation:popIn_.4s_cubic-bezier(.2,.8,.2,1)_both]" style={{ width: MW * s, height: MH * s }}>
          <div className="absolute top-0 left-0 overflow-hidden rounded-[10px] shadow-[0_0_0_1.5px_#191816,0_24px_60px_rgba(0,0,0,.5)]" style={{ width: MW, height: MH, transform: `scale(${s})`, transformOrigin: '0 0' }}>
            <Mock />
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t(txt.close)}
            className="absolute -top-5 -right-3 grid size-12 place-items-center rounded-full border-2 border-ink bg-yellow text-[20px] font-bold text-ink shadow-[3px_3px_0_var(--ink)] transition hover:scale-105 sm:-top-7 sm:-right-7 sm:size-14 sm:text-[22px]"
          >
            ✕
          </button>
        </div>
      </div>
      {!mobile && (
        <>
          <img src={userImg(user).still} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-[52px] left-4 z-[2] w-auto [animation:charPopL_.6s_.25s_cubic-bezier(.2,.8,.2,1)_both]" style={{ height: charH }} />
          <img src="/stickers/gus-laptop-still.webp" alt="" aria-hidden="true" className="pointer-events-none absolute right-4 bottom-[52px] z-[2] w-auto [animation:charPopR_.6s_.4s_cubic-bezier(.2,.8,.2,1)_both]" style={{ height: charH }} />
        </>
      )}
    </div>,
    document.body,
  )
}

function Teaser({ demo, tint, onOpen }: { demo: Demo; tint: string; onOpen: () => void }) {
  const { t } = useLang()
  const Mock = DEMOS[demo]
  const [ref, w] = useWidth<HTMLButtonElement>()
  // ดีไซน์: กล่อง 560 → mockup scale .82 · กล่องเล็กลงก็ย่อตามสัดส่วน
  const s = (w || 560) * (0.82 / 560)
  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      aria-label={t(txt.playAria)}
      className="group relative block aspect-[560/540] w-full overflow-hidden rounded-[18px] border-2 border-ink"
      style={{ background: tint }}
    >
      <div
        inert
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 overflow-hidden rounded-[14px] shadow-[0_0_0_2px_#191816] blur-[1.5px] grayscale transition duration-300 group-hover:blur-[0.5px]"
        style={{ width: MW, height: MH, marginLeft: -MW / 2, marginTop: -MH / 2, transform: `scale(${s})` }}
      >
        <Mock />
      </div>
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 bg-[rgba(40,38,34,.45)] text-card">
        <span className="grid size-[76px] place-items-center rounded-full border-[3px] border-ink bg-yellow pl-1.5 text-[28px] text-ink shadow-[5px_5px_0_var(--ink)] transition group-hover:scale-110 sm:size-[92px] sm:text-[34px]">▶</span>
        <span className="rounded-full border-2 border-card bg-ink px-5 py-2.5 text-[18px] font-bold sm:text-[20px]">{t(txt.play)}</span>
        <span className="px-4 text-center text-[14px] font-semibold opacity-90">{t(txt.playSub)}</span>
      </span>
    </button>
  )
}

function Cases() {
  const { t } = useLang()
  const [i, setI] = useState(0)
  const [modal, setModal] = useState(false)
  const c = CASES[i]
  const u = userImg(c.user)
  const go = (k: number) => {
    setI(k)
    setModal(false)
  }

  return (
    <SectionBand tone="card" id="work" className="pb-12">
      {/* แถบวิ่งเอียงอยู่ในจอเดียวกับงาน — ดูดมาที่ส่วนงานแล้วเห็นแถบด้วย */}
      <TiltMarquee className="mb-8 pt-6" />
      <Container className="lg:px-20">
        {/* หัวข้อซ้าย · การ์ดเลือกเคส 3 ใบแบบย่อ ขวา — ให้จอนี้เห็นรายละเอียด + mockup ในจอเดียว */}
        <div className="mb-6 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <Reveal className="flex flex-col gap-2">
            <p className="font-brand text-[15px] font-extrabold tracking-[0.12em] text-ink-2">
              01 <span aria-hidden="true" className="chapter-line mx-1" /> {t(txt.eyebrow)}
            </p>
            <h2 className="text-[clamp(2rem,3.4vw,2.6rem)] leading-[1.15] font-bold">
              <span className="mark px-1.5">{t(txt.title)}</span>
            </h2>
          </Reveal>
          <div className="flex flex-col gap-2 xl:items-end">
            <span className="font-hand text-[17px] text-ink-2">{t(txt.hint)}</span>
            <Reveal stagger className="-mx-5 flex gap-3 overflow-x-auto px-5 pt-1 pb-2 sm:mx-0 sm:overflow-visible sm:p-0">
              {CASES.map((x, k) => {
                const on = k === i
                return (
                  <button
                    key={x.num}
                    type="button"
                    aria-pressed={on}
                    onClick={() => go(k)}
                    className={cn(
                      'flex w-[15.5rem] shrink-0 items-stretch overflow-hidden rounded-[18px] border-2 border-ink bg-card text-left text-ink transition-transform duration-200 sm:w-auto sm:flex-1 xl:w-[15rem] xl:flex-none',
                      on ? '-translate-y-1 shadow-[5px_5px_0_var(--yellow),5px_5px_0_2px_var(--ink)]' : 'shadow-[3px_3px_0_var(--ink)] hover:-translate-y-0.5',
                    )}
                  >
                    <span className="relative flex w-[4.5rem] shrink-0 flex-col items-center justify-end border-r-2 border-ink" style={{ background: x.tint }}>
                      <span className="font-brand absolute top-1.5 left-2 text-[16px] leading-none font-extrabold">{x.num}</span>
                      <img src={userImg(x.user).happy} alt="" aria-hidden="true" className="h-[3.4rem]" />
                    </span>
                    <span className="flex min-w-0 flex-col gap-1 px-3 py-2.5">
                      <span className="font-code truncate text-[11px] font-semibold text-ink-2">{t(x.code)}</span>
                      <span className="self-start rounded-lg bg-ink px-2.5 py-1 text-[12px] leading-snug font-bold text-yellow">{t(x.big)}</span>
                      <span className="font-hand text-[13.5px] text-ink-2">{on ? t(txt.viewing) : t(txt.view)}</span>
                    </span>
                  </button>
                )
              })}
            </Reveal>
          </div>
        </div>

        <div className="relative">
        {/* ‹ › ซ้ายสุด/ขวาสุด — บอกด้วยว่าจะไปเคสไหน */}
        {[
          { k: (i + CASES.length - 1) % CASES.length, side: 'left', label: txt.prev, icon: 'm15 18-6-6 6-6' },
          { k: (i + 1) % CASES.length, side: 'right', label: txt.nextCase, icon: 'm9 18 6-6-6-6' },
        ].map((a) => (
          <button
            key={a.side}
            type="button"
            onClick={() => go(a.k)}
            aria-label={`${t(a.label)} · ${t(txt.caseWord)} ${CASES[a.k].num}`}
            className={cn(
              'group absolute top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-1 sm:flex',
              a.side === 'left' ? '-left-4 lg:-left-9' : '-right-4 lg:-right-9',
            )}
          >
            <span className="grid size-12 place-items-center rounded-full border-2 border-ink bg-yellow shadow-[3px_3px_0_var(--ink)] transition group-hover:scale-110 lg:size-14">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#191816" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={a.icon} />
              </svg>
            </span>
            <span className="font-brand rounded-full border-[1.5px] border-ink bg-card px-2 text-[12px] font-extrabold">{CASES[a.k].num}</span>
          </button>
        ))}
        <Reveal className="flex flex-col gap-[18px] rounded-[28px] border-2 border-ink bg-card p-5 shadow-[8px_8px_0_var(--ink)] sm:p-7 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="font-brand grid size-12 shrink-0 place-items-center rounded-full border-2 border-ink text-[18px] font-extrabold" style={{ background: c.tint }}>
              {c.num}
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-[18px] leading-[1.35] font-bold sm:text-[20px]">{t(c.title)}</span>
              <span className="text-[14px] font-semibold text-ink-2">
                {t(txt.usedBy)}
                {t(c.context)}
              </span>
            </div>
          </div>

          <div key={c.num} className="grid items-start gap-7 [animation:photoIn_.45s_ease-out_both] xl:grid-cols-[minmax(0,1fr)_400px]">
            {/* ซ้าย: ก่อน → หลัง + ผมออกแบบให้ */}
            <div className="flex flex-col gap-3.5">
              <div className="grid grid-cols-1 items-stretch gap-1.5 sm:grid-cols-[1fr_34px_1fr]">
                <div className="flex flex-col items-center gap-2 rounded-[18px] bg-page p-4 text-center">
                  <span className="text-[13px] font-extrabold tracking-[0.08em] text-ink-2">{t(txt.before)}</span>
                  <img src={u.sad} alt={t(txt.sadAlt)} className="size-20 object-contain" />
                  <span className="text-[15px] leading-[1.55]">{t(c.problem)}</span>
                </div>
                <span aria-hidden="true" className="rotate-90 self-center text-center text-[26px] font-bold sm:rotate-0">→</span>
                <div className="flex flex-col items-center gap-2 rounded-[18px] border-2 border-ink p-4 text-center" style={{ background: c.tint }}>
                  <span className="text-[13px] font-extrabold tracking-[0.08em]">{t(txt.after)}</span>
                  <img src={u.happy} alt={t(txt.happyAlt)} className="size-20 object-contain" />
                  <span className="text-[19px] leading-[1.35] font-bold">{t(c.big)}</span>
                  <span className="text-[13.5px] text-[#3E3B35]">{t(c.small)}</span>
                </div>
              </div>
              <div className="flex items-start gap-3.5 rounded-[18px] border-[1.5px] border-dashed border-line px-[18px] py-4">
                <img src="/stickers/gus-laptop-still.webp" alt="" aria-hidden="true" className="w-[70px] shrink-0" />
                <div className="flex flex-col gap-1.5">
                  <span className="text-[14px] font-extrabold">{t(txt.designed)}</span>
                  {c.did.map((d, k) => (
                    <span key={k} className="flex gap-2 text-[15px] leading-[1.45]">
                      <b className="text-[#1F9D55]">✓</b>
                      {t(d)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ขวา: ปุ่มตัวอย่าง mockup */}
            <div className="mx-auto w-full max-w-[400px]">
              <Teaser demo={c.demo} tint={c.tint} onOpen={() => setModal(true)} />
            </div>
          </div>

          {/* แถบล่าง: อยู่เคสไหน · ดูตัวอย่างต่อไป · ไปหัวข้ออื่น */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t-[1.5px] border-dashed border-line pt-4">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-bold text-ink-2">{t(txt.caseWord)}</span>
              {CASES.map((x, k) => (
                <button
                  key={x.num}
                  type="button"
                  onClick={() => go(k)}
                  aria-current={k === i ? 'true' : undefined}
                  className={cn(
                    'font-brand grid h-9 min-w-11 place-items-center rounded-full border-2 border-ink px-2 text-[14px] font-extrabold transition',
                    k === i ? 'bg-ink text-yellow' : 'bg-card hover:-translate-y-0.5',
                  )}
                >
                  {x.num}
                </button>
              ))}
              <span className="font-brand ml-1 text-[13px] text-ink-3">/ {String(CASES.length).padStart(2, '0')}</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => go((i + 1) % CASES.length)}
                className="flex items-center gap-2 rounded-full border-2 border-ink bg-yellow px-5 py-2.5 text-[15px] font-bold shadow-[3px_3px_0_var(--ink)] transition hover:-translate-y-0.5"
              >
                {i === CASES.length - 1 ? t(txt.backFirst) : t(txt.nextCase)}
                <span className="font-brand text-[13px]">{CASES[(i + 1) % CASES.length].num} →</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('senior-project')}
                className="flex items-center gap-2 rounded-full border-2 border-ink bg-card px-5 py-2.5 text-[15px] font-bold transition hover:-translate-y-0.5"
              >
                {t(txt.moreTopics)} ↓
              </button>
            </div>
          </div>
        </Reveal>
        </div>
      </Container>
      {modal && <MockupModal demo={c.demo} user={c.user} onClose={() => setModal(false)} />}
    </SectionBand>
  )
}

export function WorkDesktop() {
  return (
    <Cases />
  )
}
