/**
 * ⚠️ ชุดจอคอม (≥ 1100px) — โค้ดหน้าตาเดิมก่อน v8 ตามที่เจ้าของขอ (27 ก.ย.) · มือถือ/ไอแพดใช้ไฟล์ v8 ในโฟลเดอร์แม่
 * HomePage เลือกชุดด้วย useIsDesktop() — แก้เนื้อหาต้องแก้ทั้งสองชุด
 */
import { useEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/common/Reveal'
import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'
import type { L } from '@portfolio/shared/types'
import { cn } from '@/utils/cn'

/**
 * รูปประสบการณ์ (design-handoff 2.8 · อัปเดต 26 ก.ย.) — รูปใหญ่ 2 รูปบน + แท็บ 3 หมวด
 * แกลเลอรีพื้นขาวสะอาด: รูปสัดส่วนจริงไม่ครอป (โรงงาน 6 รูป 2 แถว) จัดเป็นแถวกึ่งกลาง ความสูงแถวเท่ากัน (rowH × สัดส่วน)
 * เปลี่ยนหมวดเองทุก 6 วินาที · ชี้ที่รูป = หยุด · หยุดเมื่อ section ไม่อยู่ในจอ หรือผู้ใช้ปิดแอนิเมชัน
 * มือถือ: รูปเรียงลงทีละรูปเต็มความกว้าง · กดรูปเพื่อขยาย
 */

/** [src, คำบรรยาย, สัดส่วน กว้าง/สูง] */
type Pic = { src: string; cap: L; ar: number }

const BIG: { src: string; cap: L; tag?: L; rot: string; tape: string; tapeSide: string }[] = [
  { src: '/photos/present-users-30.webp', cap: l('นำเสนองานให้ผู้ใช้จริง 20+ คน', 'Presenting to 20+ real users'), tag: l('นำเสนอกับผู้ใช้งาน', 'With users'), rot: '-rotate-1', tape: 'rgba(255,201,64,.9)', tapeSide: 'left-10 -rotate-[4deg]' },
  { src: '/photos/meet-requirement.webp', cap: l('ประชุมเก็บ requirement กับลูกค้า', 'Requirement meeting with the client'), rot: 'rotate-[1.2deg]', tape: 'rgba(220,228,251,.95)', tapeSide: 'right-10 rotate-[5deg]' },
]

const GROUPS: { name: L; note: L; rowH: number; color: string; soft: string; icon: string; rows: Pic[][] }[] = [
  {
    name: l('ไปดูโรงงาน', 'Factory visits'),
    note: l('ลงไปดูของจริง ก่อนออกแบบระบบให้', 'Seeing the real thing before designing'),
    rowH: 236,
    color: '#24A89A',
    soft: '#D9EEEC',
    icon: 'M3 21V9l6 4V9l6 4V5h6v16z M7 17h2 M12 17h2 M17 17h2',
    rows: [
      [
        { src: '/photos/factory-sewing.webp', cap: l('เดินดูไลน์เย็บกับหัวหน้างาน', 'Walking the sewing line with the supervisor'), ar: 1.011 },
        { src: '/photos/factory-line.webp', cap: l('คุยกับหัวหน้างานกลางไลน์ผลิต', 'Talking with the supervisor on the production floor'), ar: 0.75 },
        { src: '/photos/factory-printer.webp', cap: l('คุยขั้นตอนหน้าเครื่องพิมพ์', 'Talking through steps at the printer'), ar: 0.75 },
      ],
      [
        { src: '/photos/factory-stock.webp', cap: l('ดูของที่รอแพ็กส่งจริง', 'Goods waiting to be packed'), ar: 0.75 },
        { src: '/photos/factory-fabric.webp', cap: l('ดูคลังผ้าม้วนกับหัวหน้างาน', 'The fabric-roll store with the supervisor'), ar: 0.75 },
        { src: '/photos/factory-boxes.webp', cap: l('ไล่ดูชั้นเก็บกล่องในคลังสินค้า', 'Walking the box shelves in the warehouse'), ar: 0.75 },
      ],
    ],
  },
  {
    name: l('เสนอขายลูกค้า', 'Client pitches'),
    note: l('เข้าห้องนำเสนอระบบให้ลูกค้าพร้อมทีม', 'Pitching the system to clients with the team'),
    rowH: 236,
    color: '#2B55E6',
    soft: '#DCE4FB',
    icon: 'M3 4h18v12H3z M8 20h8 M12 16v4 M7 12l3-3 3 2 4-4',
    rows: [
      [
        { src: '/photos/pitch-present.webp', cap: l('นำเสนอระบบให้ลูกค้า', 'Presenting the system'), ar: 1.778 },
        { src: '/photos/pitch-team.webp', cap: l('ทีมที่เข้าไปนำเสนอ', 'The pitch team'), ar: 1.242 },
      ],
      [
        { src: '/photos/pitch-setup.webp', cap: l('เตรียมเปิดสไลด์นำเสนอ', 'Setting up the slides'), ar: 1.402 },
        { src: '/photos/pitch-qa.webp', cap: l('ฟังคำถามจากลูกค้า', 'Taking the client’s questions'), ar: 1.693 },
      ],
    ],
  },
  {
    name: l('ประชุม', 'Meetings'),
    note: l('นั่งคุยกับผู้ใช้จนเข้าใจตรงกัน', 'Talking with users until we agree'),
    rowH: 236,
    color: '#E0A100',
    soft: '#FFE7A3',
    icon: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z M8.5 12h.01 M12 12h.01 M15.5 12h.01',
    rows: [
      [
        { src: '/photos/meet-training.webp', cap: l('สอนผู้ใช้ใช้งานระบบ', 'Training users on the system'), ar: 1.284 },
        { src: '/photos/meet-data.webp', cap: l('สรุปข้อมูลกับทีมลูกค้า', 'Going over data with the client team'), ar: 1.584 },
      ],
      [
        { src: '/photos/meet-walkthrough.webp', cap: l('ไล่หน้าจอกับผู้ใช้ทีละขั้น', 'Walking through screens with users'), ar: 1.332 },
        { src: '/photos/meet-requirement.webp', cap: l('ประชุมเก็บ requirement กับลูกค้า', 'Requirement meeting with the client'), ar: 1.316 },
      ],
    ],
  },
]

const INTERVAL = 6000
/** ระยะห่างระหว่างรูปในแถว (px) */
const GAP = 20

const txt = {
  title1: l('ประสบการณ์ที่โรงงาน ออฟฟิศ', 'At the factory, the office'),
  title2: l('และห้องประชุมกับลูกค้า', 'and in client meetings'),
  note: l('รูปจากงานจริง', 'Photos from real work'),
  pics: l(' รูป', ' photos'),
  auto: l('เปลี่ยนหมวดเองทุก 6 วินาที · ชี้ที่รูปเพื่อหยุด', 'Switches every 6 seconds · hover a photo to pause'),
  paused: l('⏸ หยุดไว้ตอนชี้รูปอยู่', '⏸ Paused while you’re looking'),
  tabs: l('หมวดรูป', 'Photo categories'),
  close: l('ปิด', 'Close'),
}

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function PhotoWall() {
  const { t } = useLang()
  const [tab, setTab] = useState(0)
  /** เพิ่มทุกครั้งที่เริ่มนับใหม่ — ใช้เป็น key ให้แถบความคืบหน้าวิ่งใหม่ */
  const [tick, setTick] = useState(0)
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState<{ src: string; cap: L } | null>(null)
  const [box, setBox] = useState({ w: 0, h: 0 })
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const boxRef = useRef<HTMLDivElement | null>(null)
  const [still] = useState(reducedMotion)
  const g = GROUPS[tab]
  const paused = hover || !visible || !!open

  // หมุนหมวดเอง — จับเวลาใหม่ทุกครั้งที่เปลี่ยนหมวด/กลับมาเล่นต่อ
  useEffect(() => {
    if (still || paused) return
    const id = window.setTimeout(() => {
      setTab((x) => (x + 1) % GROUPS.length)
      setTick((x) => x + 1)
    }, INTERVAL)
    return () => window.clearTimeout(id)
  }, [tab, tick, paused, still])

  // หยุดเมื่อ section ไม่อยู่ในจอ
  useEffect(() => {
    const node = wrapRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return setVisible(true)
    const io = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting)
      if (e.isIntersecting) setTick((x) => x + 1)
    }, { threshold: 0.25 })
    io.observe(node)
    return () => io.disconnect()
  }, [])

  // วัดกล่องแกลเลอรี → ย่อ rowH ให้แถวที่ยาวสุดพอดีกล่อง
  useEffect(() => {
    const node = boxRef.current
    if (!node) return
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(node)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const pick = (i: number) => {
    setTab(i)
    setTick((x) => x + 1)
  }

  const boxW = box.w
  const stacked = boxW > 0 && boxW < 600
  // ย่อ rowH ให้พอดีทั้งความกว้าง (แถวยาวสุด) และความสูงกล่อง (เผื่อคำบรรยายใต้รูป ~30px ต่อแถว)
  const fitW = Math.min(...g.rows.map((r) => (boxW - GAP * (r.length - 1)) / r.reduce((s, p) => s + p.ar, 0)))
  const fitH = box.h > 200 ? (box.h - GAP * (g.rows.length - 1)) / g.rows.length - 30 : Infinity
  const rowH = boxW ? Math.min(g.rowH, fitW, fitH) : g.rowH
  let n = 0

  return (
    <div ref={wrapRef} className="flex flex-col gap-7">
      <div className="snap-part flex flex-col gap-7">
      <Reveal className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.3] font-bold">
          <span className="mark px-1.5">
            {t(txt.title1)}
            <br />
            {t(txt.title2)}
          </span>
        </h2>
        <span className="font-hand text-[18px] text-ink-2">{t(txt.note)}</span>
      </Reveal>

      <Reveal stagger className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
        {BIG.map((p) => (
          <figure key={p.src} className={cn('relative flex flex-col gap-3 rounded-xl border-2 border-ink bg-card p-3.5 shadow-[8px_8px_0_var(--ink)]', p.rot)}>
            <span aria-hidden="true" className={cn('absolute -top-3.5 z-10 h-[26px] w-[110px] border border-ink/25', p.tapeSide)} style={{ background: p.tape }} />
            <button type="button" onClick={() => setOpen(p)} className="group block overflow-hidden rounded-md">
              <img src={p.src} alt={t(p.cap)} loading="lazy" className="h-72 w-full object-cover object-[center_40%] transition duration-500 group-hover:scale-105 lg:h-[min(470px,50vh)]" />
            </button>
            <figcaption className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-hand text-[clamp(1.1rem,1.8vw,1.4rem)]">{t(p.cap)}</span>
              {p.tag && <span className="rounded-full bg-ink px-3 py-1 text-[13px] font-bold text-yellow">{t(p.tag)}</span>}
            </figcaption>
          </figure>
        ))}
      </Reveal>
      </div>

      <div className="snap-part flex flex-col gap-7">
      <div className="flex flex-wrap items-end gap-4">
        <div role="tablist" aria-label={t(txt.tabs)} className="rm-still grid w-full grid-cols-3 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:gap-3.5">
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
                  'relative flex h-[58px] items-center justify-center gap-3 overflow-hidden rounded-[16px] border-[2.5px] border-ink px-2 pb-1 sm:justify-start sm:rounded-[20px] sm:pr-5 sm:pl-3 transition-[transform,box-shadow] duration-200 sm:h-[70px] sm:pr-[22px]',
                  on ? '-translate-y-1 -rotate-[1.5deg] bg-ink text-page' : 'text-ink shadow-[4px_4px_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-[3px] hover:-rotate-1 hover:shadow-[6px_7px_0_var(--ink)]',
                )}
                style={on ? { boxShadow: `5px 5px 0 ${x.color}` } : { background: x.soft }}
              >
                <span
                  className="hidden size-10 shrink-0 place-items-center rounded-[14px] border-2 sm:grid sm:size-11"
                  style={
                    on
                      ? { background: x.color, borderColor: x.color, color: '#FFFDF8' }
                      : { background: '#FFFDF8', borderColor: '#191816', color: x.color, animation: `tabNudge 2.4s ease-in-out ${i * 0.3}s infinite` }
                  }
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={x.icon} />
                  </svg>
                </span>
                <span className="flex flex-col items-center gap-px text-center sm:items-start sm:text-left">
                  <span className="text-[14px] leading-[1.2] font-bold sm:text-[18px]">{t(x.name)}</span>
                  <span className={cn('font-brand text-[12px] font-semibold', on ? 'text-yellow' : 'text-ink-2')}>
                    {x.rows.flat().length}
                    {t(txt.pics)}
                  </span>
                </span>
                {on && !still && (
                  <span className="absolute inset-x-0 bottom-0 h-[5px] bg-page/20">
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
        <span className="ml-auto flex flex-col items-end gap-1 text-right">
          <span className="font-hand text-[18px] text-ink-2">{t(g.note)}</span>
          {!still && <span className="text-[12px] text-[#8A8478]">{hover ? t(txt.paused) : t(txt.auto)}</span>}
        </span>
      </div>

      <div
        ref={boxRef}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false)
          setTick((x) => x + 1)
        }}
        className="flex flex-col justify-center gap-5 rounded-3xl border-[1.5px] border-[#DDD5C6] bg-white p-4 shadow-[0_1px_0_#DDD5C6,0_18px_40px_-28px_rgba(25,24,22,.35)] sm:p-7 lg:h-[min(612px,calc(100svh-150px))]"
      >
        <div key={tab} className="rm-still flex flex-col gap-5">
          {g.rows.map((r, ri) => (
            <div key={ri} className={cn('flex justify-center gap-5', stacked && 'flex-col')}>
              {r.map((p) => {
                const i = n++
                return (
                  <figure key={p.src} className="flex flex-col gap-2" style={{ animation: `photoIn .5s ${i * 0.08}s cubic-bezier(.2,.8,.2,1) both` }}>
                    <button type="button" onClick={() => setOpen(p)} className="group block overflow-hidden rounded-[14px] border border-[#E7E0D3]">
                      <img
                        src={p.src}
                        alt={t(p.cap)}
                        loading="lazy"
                        className="block object-cover transition duration-500 group-hover:scale-[1.03]"
                        style={stacked ? { width: '100%', aspectRatio: String(p.ar) } : { height: rowH, width: Math.round(rowH * p.ar) }}
                      />
                    </button>
                    <figcaption className="flex items-center gap-2 text-[14px] text-ink-2">
                      <span className="size-[7px] shrink-0 rounded-full" style={{ background: g.color }} />
                      {t(p.cap)}
                    </figcaption>
                  </figure>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      </div>

      {open && (
        <div role="dialog" aria-modal="true" aria-label={t(open.cap)} onClick={() => setOpen(null)} className="anim-pop fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4 backdrop-blur-sm">
          <figure className="max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={open.src} alt={t(open.cap)} className="max-h-[80vh] w-auto rounded-md object-contain" />
            <figcaption className="mt-3 flex items-center justify-between gap-4 text-[14px] text-white/85">
              <span className="font-hand text-[18px]">{t(open.cap)}</span>
              <button type="button" onClick={() => setOpen(null)} className="rounded-full bg-white px-3 py-1 font-semibold text-black">
                {t(txt.close)} ✕
              </button>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}
