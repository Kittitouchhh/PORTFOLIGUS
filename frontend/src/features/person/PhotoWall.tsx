import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Reveal } from '@/components/common/Reveal'
import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'
import type { L } from '@portfolio/shared/types'
import { cn } from '@/utils/cn'

/**
 * รูปจากงานจริง (ดีไซน์ v8 · V8*09Photos + แบบ A — design-handoff 7.5 / 7.5.1) · อยู่บนแถบพื้นดำ
 * บน: รูปเด่น 2 รูปแบบโพลารอยด์ + เทป · ล่าง: แท็บ 3 หมวด + กล่องรูป
 * ≥ 768px: กล่องขาว ทุกรูปของแท็บอยู่ "แถวเดียว" สูงเท่ากัน กว้างตามสัดส่วนจริง เต็มกล่องพอดี ไม่ครอป (JustifiedRow)
 * < 768px: ไม่มีกล่อง — ปัดดูทีละรูป (สูง 300, scroll-snap) + จุดบอกลำดับ · แท็บเลื่อนแนวนอนได้
 * เปลี่ยนหมวดเองทุก 6 วินาที · ชี้/แตะรูป = หยุด · หยุดเมื่อ section ไม่อยู่ในจอ หรือผู้ใช้ปิดแอนิเมชัน
 * เปลี่ยนแท็บ = crossfade 250ms · กดรูปเพื่อขยาย
 */

/** รูป 1 ใบ: ที่อยู่ไฟล์ · คำบรรยาย · สัดส่วน กว้าง/สูง */
type Pic = { src: string; cap: L; ar: number }

const BIG: { src: string; cap: L; tag?: L; rot: string; shadow: string; tape: string; tapeSide: string; img: string }[] = [
  {
    src: '/photos/present-users-30.webp',
    cap: l('นำเสนองานให้ผู้ใช้จริง 20+ คน', 'Presenting to 20+ real users'),
    tag: l('นำเสนอกับผู้ใช้งาน', 'With users'),
    rot: '-rotate-1',
    shadow: 'shadow-[6px_6px_0_var(--yellow)]',
    tape: 'rgba(255,201,64,.9)',
    tapeSide: 'left-10 -rotate-[4deg]',
    img: 'aspect-[4/3]',
  },
  {
    src: '/photos/meet-requirement.webp',
    cap: l('ประชุมเก็บ requirement กับลูกค้า', 'Requirement meeting with the client'),
    rot: 'rotate-[1.2deg]',
    shadow: 'shadow-[6px_6px_0_#DCE4FB]',
    tape: 'rgba(220,228,251,.95)',
    tapeSide: 'right-10 rotate-[5deg]',
    // มือถือ 3:4 · จอใหญ่ยืดสูงเท่ารูปซ้าย
    img: 'aspect-[3/4] md:aspect-auto md:min-h-0 md:flex-1',
  },
]

const ICON_PROPS = { width: 19, height: 19, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const

const GROUPS: { name: L; note: L; color: string; icon: ReactNode; pics: Pic[] }[] = [
  {
    name: l('ไปดูโรงงาน', 'Factory visits'),
    note: l('ลงไปดูของจริง ก่อนออกแบบระบบให้', 'Seeing the real thing before designing the system'),
    color: '#24A89A',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 20V10l6 3V10l6 3V6l6 3v11z" />
        <path d="M7 17h2M12 17h2M17 17h1" />
      </svg>
    ),
    pics: [
      { src: '/photos/factory-sewing.webp', cap: l('เดินดูไลน์เย็บกับหัวหน้างาน', 'Walking the sewing line with the supervisor'), ar: 1.011 },
      { src: '/photos/factory-line.webp', cap: l('คุยกับหัวหน้างานกลางไลน์ผลิต', 'Talking with the supervisor on the production floor'), ar: 0.75 },
      { src: '/photos/factory-printer.webp', cap: l('คุยขั้นตอนหน้าเครื่องพิมพ์', 'Talking through steps at the printer'), ar: 0.75 },
      { src: '/photos/factory-stock.webp', cap: l('ดูของที่รอแพ็กส่งจริง', 'Goods waiting to be packed'), ar: 0.75 },
      { src: '/photos/factory-fabric.webp', cap: l('ดูคลังผ้าม้วนกับหัวหน้างาน', 'The fabric-roll store with the supervisor'), ar: 0.75 },
      { src: '/photos/factory-boxes.webp', cap: l('ไล่ดูชั้นเก็บกล่องในคลังสินค้า', 'Walking the box shelves in the warehouse'), ar: 0.75 },
    ],
  },
  {
    name: l('เสนอขายลูกค้า', 'Client pitches'),
    note: l('นำเสนอระบบและตอบคำถามลูกค้าเอง', 'Presenting the system and answering client questions myself'),
    color: '#2B55E6',
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="4" width="18" height="12" rx="1.5" />
        <path d="M12 16v4M8 20h8" />
        <path d="m7 12 3-3 2 2 4-4" />
      </svg>
    ),
    pics: [
      { src: '/photos/pitch-present.webp', cap: l('นำเสนอระบบให้ลูกค้า', 'Presenting the system'), ar: 1.778 },
      { src: '/photos/pitch-team.webp', cap: l('ทีมที่เข้าไปนำเสนอ', 'The pitch team'), ar: 1.242 },
      { src: '/photos/pitch-setup.webp', cap: l('เตรียมเปิดสไลด์นำเสนอ', 'Setting up the slides'), ar: 1.402 },
      { src: '/photos/pitch-qa.webp', cap: l('ฟังคำถามจากลูกค้า', 'Taking the client’s questions'), ar: 1.693 },
    ],
  },
  {
    name: l('ประชุม', 'Meetings'),
    note: l('นั่งไล่หน้าจอกับผู้ใช้และทีมลูกค้า', 'Going through screens with users and the client team'),
    color: '#E0A100',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M4 5h16v11H9l-5 4z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
      </svg>
    ),
    pics: [
      { src: '/photos/meet-training.webp', cap: l('สอนผู้ใช้ใช้งานระบบ', 'Training users on the system'), ar: 1.284 },
      { src: '/photos/meet-data.webp', cap: l('สรุปข้อมูลกับทีมลูกค้า', 'Going over data with the client team'), ar: 1.584 },
      { src: '/photos/meet-walkthrough.webp', cap: l('ไล่หน้าจอกับผู้ใช้ทีละขั้น', 'Walking through screens with users'), ar: 1.332 },
      { src: '/photos/meet-requirement.webp', cap: l('ประชุมเก็บ requirement กับลูกค้า', 'Requirement meeting with the client'), ar: 1.316 },
    ],
  },
]

const INTERVAL = 6000
/** ระยะ crossfade ตอนเปลี่ยนแท็บ (ms) */
const FADE = 250
/** มือถือ: รูปสูง 300 กว้างตามสัดส่วน ไม่เกิน 330 */
const SWIPE_H = 300
const SWIPE_MAX_W = 330
/** สีจุดหน้าคำบรรยายรูป */
const DOT = '#24A89A'

const txt = {
  title1: l('ประสบการณ์ที่โรงงาน ออฟฟิศ', 'At the factory, the office'),
  title2: l('และห้องประชุมกับลูกค้า', 'and in client meetings'),
  note: l('รูปจากงานจริง', 'Photos from real work'),
  pics: l(' รูป', ' photos'),
  auto: l('เปลี่ยนหมวดเองทุก 6 วิ · ชี้ที่รูปเพื่อหยุด', 'switches every 6 s · hover a photo to pause'),
  paused: l('หยุดไว้ตอนชี้รูปอยู่', 'paused while you’re looking'),
  swipe: l('ปัดดูรูปถัดไป', 'swipe for the next one'),
  tabs: l('หมวดรูป', 'Photo categories'),
  close: l('ปิด', 'Close'),
}

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** ซ่อน scrollbar ของแถบที่เลื่อนแนวนอนได้ (แท็บ/รูปบนมือถือ) */
const NO_BAR = '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

/**
 * แถวรูปแบบ justified: ทุกรูปอยู่แถวเดียว สูงเท่ากัน กว้างตามสัดส่วนจริง รวมกันเต็มความกว้างพอดี
 * h = (boxWidth − gap·(n−1)) / Σar · กว้างแต่ละรูป = h·ar — วัด boxWidth ด้วย ResizeObserver
 * ระหว่างยังไม่ได้วัด ใช้ flex-grow ตามสัดส่วนแทน (ผลเท่ากัน) กันหน้ากระพริบ
 */
function JustifiedRow({ pics, onOpen }: { pics: Pic[]; onOpen: (p: Pic) => void }) {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement | null>(null)
  const [row, setRow] = useState({ w: 0, gap: 14 })

  useEffect(() => {
    const node = ref.current
    if (!node) return
    // gap อ่านจาก CSS จริง (ไอแพด 10 · จอคอม 14)
    const measure = () => setRow({ w: node.clientWidth, gap: parseFloat(getComputedStyle(node).columnGap) || 0 })
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(node)
    return () => ro.disconnect()
  }, [])

  const sum = pics.reduce((s, p) => s + p.ar, 0)
  // ปัดลงนิดหน่อย กันผลรวมเกินกล่องจากทศนิยม
  const h = row.w ? Math.floor(((row.w - row.gap * (pics.length - 1)) / sum) * 100) / 100 : 0

  return (
    <div ref={ref} className="flex items-start gap-2.5 lg:gap-3.5">
      {pics.map((p) => (
        <figure key={p.src} className="m-0 flex min-w-0 flex-col gap-2" style={h ? { flex: `0 0 ${h * p.ar}px` } : { flex: `${p.ar} 1 0%` }}>
          <button
            type="button"
            onClick={() => onOpen(p)}
            className="group block w-full overflow-hidden rounded-xl border-[1.5px] border-ink"
            style={h ? { height: h } : { aspectRatio: String(p.ar) }}
          >
            <img src={p.src} alt={t(p.cap)} loading="lazy" className="block size-full object-cover transition duration-500 group-hover:scale-[1.03]" />
          </button>
          <figcaption className="flex items-start gap-1.5 text-[12.5px] leading-[1.45] text-[#3E3B35]">
            <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: DOT }} />
            {t(p.cap)}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

/** มือถือ: ปัดดูทีละรูป (scroll-snap) + จุดบอกลำดับ "1 / 6 · ปัดดูรูปถัดไป" */
function SwipeRow({ pics, onOpen, onHold }: { pics: Pic[]; onOpen: (p: Pic) => void; onHold: () => void }) {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement | null>(null)
  const [idx, setIdx] = useState(0)

  const onScroll = () => {
    const node = ref.current
    if (!node) return
    const kids = [...node.children] as HTMLElement[]
    const pad = parseFloat(getComputedStyle(node).paddingLeft) || 0
    // เลื่อนสุดขวาแล้ว = รูปสุดท้าย (รูปท้าย ๆ snap ชิดซ้ายไม่ได้)
    if (node.scrollLeft >= node.scrollWidth - node.clientWidth - 2) return setIdx(kids.length - 1)
    let best = 0
    kids.forEach((k, i) => {
      if (Math.abs(k.offsetLeft - pad - node.scrollLeft) < Math.abs(kids[best].offsetLeft - pad - node.scrollLeft)) best = i
    })
    setIdx(best)
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={ref}
        onScroll={onScroll}
        onTouchStart={onHold}
        onPointerDown={onHold}
        className={cn('-mx-5 flex snap-x snap-mandatory scroll-px-5 items-start gap-3 overflow-x-auto px-5', NO_BAR)}
      >
        {pics.map((p) => (
          <figure key={p.src} className="m-0 flex shrink-0 snap-start flex-col gap-2" style={{ width: `min(${Math.round(Math.min(SWIPE_H * p.ar, SWIPE_MAX_W))}px, calc(100vw - 40px))` }}>
            <button type="button" onClick={() => onOpen(p)} className="block overflow-hidden rounded-[14px] border-[1.5px] border-ink" style={{ height: SWIPE_H }}>
              <img src={p.src} alt={t(p.cap)} loading="lazy" className="block size-full object-cover" />
            </button>
            <figcaption className="text-[12.5px] leading-[1.45] text-[#E9E4DA]">{t(p.cap)}</figcaption>
          </figure>
        ))}
      </div>
      <div className="flex items-center justify-center gap-1.5">
        {pics.map((p, i) => (
          <span key={p.src} aria-hidden="true" className={cn('h-1.5 rounded-[3px] transition-all duration-200', i === idx ? 'w-[18px] bg-yellow' : 'w-1.5 bg-[#5B574F]')} />
        ))}
        <span aria-live="polite" className="font-code ml-2 text-[12px] text-[#C9C3B6]">
          {idx + 1} / {pics.length} · {t(txt.swipe)}
        </span>
      </div>
    </div>
  )
}

export function PhotoWall() {
  const { t } = useLang()
  const [tab, setTab] = useState(0)
  /** แท็บก่อนหน้า — ค้างไว้ 250ms ให้ค่อย ๆ จางออก (crossfade) */
  const [prev, setPrev] = useState<number | null>(null)
  /** เพิ่มทุกครั้งที่เริ่มนับใหม่ — ใช้เป็น key ให้แถบความคืบหน้าวิ่งใหม่ */
  const [tick, setTick] = useState(0)
  const [hover, setHover] = useState(false)
  /** มือถือ: แตะ/ปัดรูปแล้ว = หยุดเปลี่ยนเอง จนกว่าจะกดแท็บเองหรือเลื่อนออกจาก section */
  const [hold, setHold] = useState(false)
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState<{ src: string; cap: L } | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const tabsRef = useRef<HTMLDivElement | null>(null)
  const [still] = useState(reducedMotion)
  const g = GROUPS[tab]
  const paused = hover || hold || !visible || !!open

  // หมุนหมวดเอง — จับเวลาใหม่ทุกครั้งที่เปลี่ยนหมวด/กลับมาเล่นต่อ
  useEffect(() => {
    if (still || paused) return
    const id = window.setTimeout(() => {
      setPrev(tab)
      setTab((tab + 1) % GROUPS.length)
      setTick((x) => x + 1)
    }, INTERVAL)
    return () => window.clearTimeout(id)
  }, [tab, tick, paused, still])

  // เก็บแท็บเก่าทิ้งหลังจางออกเสร็จ
  useEffect(() => {
    if (prev === null) return
    const id = window.setTimeout(() => setPrev(null), FADE)
    return () => window.clearTimeout(id)
  }, [prev, tab])

  // มือถือ: แท็บที่เลือกต้องมองเห็นในแถบเลื่อนแนวนอน (เลื่อนเฉพาะแถบ ไม่เลื่อนหน้า)
  useEffect(() => {
    const list = tabsRef.current
    const btn = list?.children[tab] as HTMLElement | undefined
    if (!list || !btn || list.scrollWidth <= list.clientWidth) return
    list.scrollTo({ left: btn.offsetLeft - 20, behavior: still ? 'auto' : 'smooth' })
  }, [tab, still])

  // หยุดเมื่อ section ไม่อยู่ในจอ
  useEffect(() => {
    const node = wrapRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return setVisible(true)
    const io = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting)
      if (e.isIntersecting) setTick((x) => x + 1)
      else setHold(false)
    }, { threshold: 0.25 })
    io.observe(node)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const pick = (i: number) => {
    setHold(false)
    setTick((x) => x + 1)
    if (i === tab) return
    if (!still) setPrev(tab)
    setTab(i)
  }

  /** เนื้อหาของแท็บหนึ่ง: หัวกล่อง + แถวรูป (≥768) / ปัดทีละรูป (<768) */
  const pane = (gi: number, leaving: boolean) => {
    const x = GROUPS[gi]
    const n = x.pics.length
    return (
      <div
        key={leaving ? `out-${gi}` : `in-${gi}`}
        aria-hidden={leaving || undefined}
        inert={leaving || undefined}
        className={cn('rm-still col-start-1 row-start-1 flex min-w-0 flex-col gap-3 md:gap-4', leaving && 'pointer-events-none')}
        style={still ? undefined : { animation: `backdropIn ${FADE}ms ease ${leaving ? 'reverse' : 'normal'} both` }}
      >
        <div className="flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-1 md:justify-between">
          <span className="text-center text-[14px] font-bold text-card md:text-left md:text-[15px] md:text-ink lg:text-[17px]">{t(x.note)}</span>
          <span className="font-code hidden text-[12px] text-ink-2 md:inline">
            {n}
            {t(txt.pics)}
            {!still && ` · ${hover ? t(txt.paused) : t(txt.auto)}`}
          </span>
        </div>
        <div className="hidden md:block">
          <JustifiedRow pics={x.pics} onOpen={setOpen} />
        </div>
        <div className="md:hidden">
          <SwipeRow pics={x.pics} onOpen={setOpen} onHold={() => setHold(true)} />
        </div>
      </div>
    )
  }

  return (
    <div ref={wrapRef} className="flex flex-col gap-4 md:gap-[22px] lg:gap-7">
      <div className="snap-part flex flex-col gap-4 md:gap-[22px] lg:gap-7">
        <Reveal className="flex flex-col items-center gap-2.5 text-center md:items-start md:text-left">
          <h2 className="text-[23px] leading-[1.32] font-bold tracking-[-0.01em] md:text-[31px] lg:text-[40px]">
            {t(txt.title1)}
            <br />
            <span className="mark [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">{t(txt.title2)}</span>
          </h2>
          <span className="font-hand text-[15px] text-[#C9C3B6] md:text-[16px] lg:text-[17px]">{t(txt.note)}</span>
        </Reveal>

        <Reveal stagger className="flex flex-col gap-[26px] px-1.5 pt-3 pb-1.5 md:flex-row md:items-stretch md:gap-6 md:px-2 md:pt-2.5 md:pb-0 lg:gap-9">
          {BIG.map((p, i) => (
            <figure
              key={p.src}
              // flex ตามสัดส่วนเฉพาะตอนเรียงแนวนอน — ตอน flex-col ห้ามใช้ flex-basis 0 (จะยุบ)
              className={cn('relative m-0 flex min-w-0 flex-col gap-2.5 rounded-md border-2 border-ink bg-card px-3 pt-3 pb-3.5', i === 0 ? 'md:flex-[1.5_1_0%]' : 'md:flex-[1_1_0%]', p.rot, p.shadow)}
            >
              <span aria-hidden="true" className={cn('absolute -top-3 z-10 h-6 w-[90px]', p.tapeSide)} style={{ background: p.tape }} />
              <button type="button" onClick={() => setOpen(p)} className={cn('group relative block w-full overflow-hidden', p.img)}>
                <img src={p.src} alt={t(p.cap)} loading="lazy" className="absolute inset-0 block size-full object-cover transition duration-500 group-hover:scale-105" />
              </button>
              <figcaption className="flex items-center justify-between gap-2 text-[13.5px] text-ink">
                <span>{t(p.cap)}</span>
                {p.tag && <span className="rounded-full bg-ink px-2.5 py-[3px] text-[11.5px] font-bold whitespace-nowrap text-yellow">{t(p.tag)}</span>}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>

      <div className="snap-part flex flex-col gap-4 pt-1.5 md:gap-[22px] md:pt-2.5 lg:gap-7">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label={t(txt.tabs)}
          className={cn('-mx-5 flex gap-2.5 overflow-x-auto px-5 pt-1 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pt-0 md:pb-1', NO_BAR)}
        >
          {GROUPS.map((x, i) => {
            const on = i === tab
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => pick(i)}
                className={cn(
                  'relative flex h-[50px] shrink-0 items-center gap-2.5 overflow-hidden rounded-2xl pr-3.5 pl-2 text-left transition-[background-color,border-color,box-shadow] duration-200 md:h-14 md:pr-[18px]',
                  on ? 'border-2 border-card bg-card text-ink' : 'border-[1.5px] border-[#5B574F] text-card hover:border-ink-3',
                )}
                style={on ? { boxShadow: `4px 4px 0 ${x.color}` } : undefined}
              >
                <span className="grid size-[34px] shrink-0 place-items-center rounded-[11px] text-card md:size-[38px]" style={{ background: on ? x.color : '#2C2A26' }}>
                  {x.icon}
                </span>
                <span className="flex flex-col leading-[1.25]">
                  <span className="text-[14px] font-bold md:text-[16px]">{t(x.name)}</span>
                  <span className="text-[11.5px] font-bold" style={{ color: on ? x.color : '#9C958A' }}>
                    {x.pics.length}
                    {t(txt.pics)}
                  </span>
                </span>
                {on && !still && (
                  <span aria-hidden="true" className="absolute inset-x-2.5 bottom-1.5 h-1 overflow-hidden rounded-sm bg-ink/10">
                    <span
                      key={tick}
                      className="block h-full origin-left"
                      style={{ background: x.color, animation: `tabProgress ${INTERVAL}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }}
                    />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* กล่องรูป: ≥768 กล่องขาวขอบดำ · มือถือไม่มีกล่อง รูปอยู่บนพื้นดำเลย */}
        <div
          role="tabpanel"
          aria-label={t(g.name)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false)
            setTick((x) => x + 1)
          }}
          onTouchStart={() => setHold(true)}
          className="grid grid-cols-[minmax(0,1fr)] md:rounded-[22px] md:border-2 md:border-ink md:bg-card md:p-[18px] lg:p-6"
        >
          {prev !== null && prev !== tab && pane(prev, true)}
          {pane(tab, false)}
        </div>
      </div>

      {open && (
        <div role="dialog" aria-modal="true" aria-label={t(open.cap)} onClick={() => setOpen(null)} className="anim-pop fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4 backdrop-blur-sm">
          <figure className="max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={open.src} alt={t(open.cap)} className="max-h-[80vh] w-auto rounded-md object-contain" />
            <figcaption className="mt-3 flex items-center justify-between gap-4 text-[14px] text-white/85">
              <span className="font-hand text-[18px]">{t(open.cap)}</span>
              <button type="button" onClick={() => setOpen(null)} className="min-h-11 rounded-full bg-white px-4 font-semibold text-black">
                {t(txt.close)} ✕
              </button>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}
