import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

type MarqueeProps<T> = {
  items: readonly T[]
  /** คีย์ของแต่ละชิ้น ต้องไม่ซ้ำกันในลิสต์ */
  keyOf: (item: T, index: number) => string
  /** วาดหนึ่งชิ้น — ตัวเว้นวรรคซ้ายขวาให้ใส่มาในนี้เอง ระยะห่างจะได้ต่อกันสนิทตอนวนซ้ำ */
  renderItem: (item: T, index: number) => ReactNode
  /** พิกเซลต่อวินาทีตอนวิ่งเต็มสปีด ยิ่งน้อยยิ่งอ่านทัน */
  speed?: number
  className?: string
}

/** เวลาที่ใช้ไล่ความเร็วเข้าหาเป้าหมาย (วินาที) — ยิ่งมากยิ่งหน่วงนุ่ม */
const EASE_TAU = 0.42

/**
 * แถบวิ่งที่ "ค่อย ๆ ช้าลงจนหยุด" ตอนเอาเมาส์ไปจ่อ แล้วค่อย ๆ ไหลต่อตอนเอาออก
 *
 * ทำไมไม่ใช้ CSS: animation-duration เปลี่ยนแบบ transition ไม่ได้ ส่วน
 * animation-play-state: paused ก็หยุดพรึบทันทีเหมือนถอดปลั๊ก ไม่ใช่การหน่วง
 * เลยขยับ transform เองทีละเฟรม แล้วให้ตัวคูณความเร็ววิ่งเข้าหา 0 หรือ 1 แบบเอ็กซ์โพเนนเชียล
 *
 * ลิสต์ถูกวาดสองชุด ชุดหลัง aria-hidden ไว้ พอเลื่อนครบความกว้างของชุดแรกก็วนกลับ
 * ตำแหน่งเดิม — ตาจึงเห็นเป็นสายพานไม่รู้จบ
 */
export function Marquee<T>({
  items,
  keyOf,
  renderItem,
  speed = 34,
  className,
}: MarqueeProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLUListElement>(null)
  const holdRef = useRef(false)
  const [held, setHeld] = useState(false)

  const hold = (next: boolean) => {
    holdRef.current = next
    setHeld(next)
  }

  useEffect(() => {
    const track = trackRef.current
    const group = groupRef.current
    if (!track || !group) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let offset = 0
    // ตัวคูณความเร็ว 0–1 เริ่มที่ 0 แล้วไต่ขึ้นเอง ให้แถบออกตัวนุ่ม ๆ ตอนโหลดหน้า
    let factor = 0
    let last = performance.now()
    let frame = 0

    const step = (now: number) => {
      // สลับแท็บกลับมาแล้ว dt จะกระโดดเป็นหลักวินาที ตัดเพดานไว้ไม่ให้แถบดีดไปไกล
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      const target = holdRef.current ? 0 : 1
      factor += (target - factor) * (1 - Math.exp(-dt / EASE_TAU))

      const width = group.offsetWidth
      if (width > 0) {
        offset = (offset + speed * factor * dt) % width
        track.style.transform = `translate3d(${-offset}px, 0, 0)`
      }

      frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [speed, items])

  return (
    <div
      className={cn('marquee', className)}
      onPointerEnter={() => hold(true)}
      onPointerLeave={() => hold(false)}
      // แตะบนมือถือให้หยุดอ่านได้เหมือนกัน แตะซ้ำค่อยปล่อยวิ่งต่อ
      onPointerCancel={() => hold(false)}
      // โฟกัสด้วยคีย์บอร์ดเข้ามาในแถบก็ต้องหยุด ไม่งั้นอ่านสิ่งที่โฟกัสอยู่ไม่ทัน
      onFocusCapture={() => hold(true)}
      onBlurCapture={() => hold(false)}
      data-held={held || undefined}
    >
      <div ref={trackRef} className="marquee-track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            ref={copy === 0 ? groupRef : undefined}
            className="flex shrink-0"
            aria-hidden={copy === 1}
          >
            {items.map((item, index) => (
              <li key={`${copy}-${keyOf(item, index)}`}>{renderItem(item, index)}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
