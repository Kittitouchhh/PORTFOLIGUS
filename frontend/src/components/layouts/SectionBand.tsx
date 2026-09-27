import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

/**
 * แถบพื้นหลังเต็มความกว้างของแต่ละ section (design-handoff 7.2)
 * ปก ครีม+จุด → การศึกษา/ตัวเลข card → ไทม์ไลน์ paper → เครื่องมือ card → แถบวิ่ง → งาน work
 * → โปรเจคจบ card → วิธีทำงาน dark → ตัวตน paper → รูปจากงานจริง dark → ติดต่อ paper → footer ดำ
 * บนพื้น dark: หัวข้อสีขาว ส่วนไฮไลต์ใช้ป้ายเหลืองทึบ (.mark-solid) ไม่ใช้ไฮไลต์ครึ่งบรรทัด
 * จอกว้าง: แถบสูงอย่างน้อย 1 จอ เนื้อหาอยู่กลางแนวตั้ง → ดูดแล้วบน/ล่างเว้นเท่ากันพอดี
 * แถบที่สูงกว่าจอได้คลาส is-tall (วัดจริงด้วย ResizeObserver) → แม่เหล็ก (useMagnetScroll) ดูดที่ท่อน .snap-part หรือชิดบนแทนกลางจอ
 *
 * ย่อให้พอดีจอ: ถ้าเนื้อหาสูงกว่าจอลบขอบบน/ล่าง (เช่น เบราว์เซอร์ซูม 110% หรือจอโน้ตบุ๊กเตี้ย)
 * ใช้ CSS zoom ย่อทั้งก้อนให้พอดี — ทำทีละท่อนถ้ามี .snap-part (ชดเชย min-height ของท่อนให้ยังเต็ม 1 จอ)
 */
export type BandTone = 'paper' | 'card' | 'work' | 'dark'

const TONES: Record<BandTone, string> = {
  paper: 'bg-page border-t border-[#E4DCCC]',
  card: 'bg-card border-t border-[#E4DCCC]',
  work: 'bg-[#FFF5D6] border-t border-[#E4DCCC]',
  dark: 'band-dark bg-ink text-page',
}

/** ขอบบน/ล่างขั้นต่ำเวลาย่อให้พอดีจอ (px) */
const MARGIN = 48
/** ย่อได้ไม่ต่ำกว่านี้ — เล็กกว่านี้อ่านไม่ออก ปล่อยให้เลื่อนอ่านแทน */
const MIN_ZOOM = 0.62

const desktop = () => window.innerWidth >= 1100 && window.innerHeight >= 600

/** ความสูงจริงของเนื้อหาในท่อน (ท่อนมี min-height 1 จอ เลยวัดจากลูกบนสุดถึงล่างสุดแทน) */
function contentHeight(el: HTMLElement) {
  const kids = [...el.children] as HTMLElement[]
  if (!kids.length) return el.offsetHeight
  const top = Math.min(...kids.map((k) => k.getBoundingClientRect().top))
  const bottom = Math.max(...kids.map((k) => k.getBoundingClientRect().bottom))
  return bottom - top
}

export function SectionBand({
  tone,
  id,
  className,
  noMagnet = false,
  children,
}: {
  tone: BandTone
  id?: string
  className?: string
  /** true = แม่เหล็กไม่ดูดแถบนี้ */
  noMagnet?: boolean
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = ref.current
    const inner = innerRef.current
    if (!node || !inner) return
    let frame = 0

    const fit = () => {
      frame = 0
      const parts = [...node.querySelectorAll<HTMLElement>('.snap-part')]
      // ล้างค่าเดิมก่อนวัดขนาดจริง
      inner.style.zoom = ''
      parts.forEach((p) => {
        p.style.zoom = ''
        p.style.minHeight = ''
      })
      if (desktop()) {
        const vh = window.innerHeight
        if (parts.length) {
          parts.forEach((p) => {
            const z = Math.max(MIN_ZOOM, Math.min(1, (vh - MARGIN * 2) / contentHeight(p)))
            if (z < 1) {
              p.style.zoom = String(z)
              p.style.minHeight = `${100 / z}svh`
            }
          })
        } else {
          const cs = getComputedStyle(node)
          const pad = Math.max(MARGIN * 2, parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom))
          const z = Math.max(MIN_ZOOM, Math.min(1, (vh - pad) / inner.offsetHeight))
          if (z < 1) inner.style.zoom = String(z)
        }
      }
      node.classList.toggle('is-tall', node.offsetHeight > window.innerHeight + 2)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(fit)
    }

    fit()
    // วัดใหม่เมื่อเนื้อหาเปลี่ยน (สลับเคส/แท็บ รูปโหลดเสร็จ ฟอนต์มา) หรือขนาดจอเปลี่ยน
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null
    ro?.observe(inner)
    window.addEventListener('resize', schedule)
    document.fonts?.ready.then(schedule)
    return () => {
      cancelAnimationFrame(frame)
      ro?.disconnect()
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <div
      ref={ref}
      id={id}
      data-no-magnet={noMagnet || undefined}
      data-tone={tone}
      className={cn('section-band flow-root lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center', TONES[tone], className)}
    >
      <div ref={innerRef} className="w-full">
        {children}
      </div>
    </div>
  )
}
