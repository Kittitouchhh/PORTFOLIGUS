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
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return ref
}
