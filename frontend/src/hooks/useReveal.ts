import { useEffect, useRef } from 'react'

/**
 * ใส่คลาส .reveal-in ให้ element เมื่อเลื่อนมาถึง
 * ทำงานครั้งเดียวต่อ element แล้วเลิกสังเกตการณ์
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // เบราว์เซอร์เก่าหรือผู้ใช้ปิดแอนิเมชัน — แสดงผลทันที
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      node.classList.add('reveal-in')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('reveal-in')
          observer.unobserve(entry.target)
        }
      },
      // threshold เป็นสัดส่วนของตัว element — section ที่สูงกว่าจอสิบเท่า (ผลงาน, แล็บ)
      // ไม่มีวันโผล่ถึง 10% เลยค้างโปร่งใสทั้งก้อน ใช้ 0 แล้วให้ rootMargin คุมจังหวะแทน
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return ref
}
