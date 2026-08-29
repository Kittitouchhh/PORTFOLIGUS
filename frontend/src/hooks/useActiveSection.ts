import { useEffect, useState } from 'react'
import { HEADER_OFFSET } from '@/utils/scroll'

/**
 * บอกว่าตอนนี้อ่านค้างอยู่ section ไหน เอาไปไฮไลต์เมนู
 *
 * ใช้ตำแหน่ง scroll ตรง ๆ แทน IntersectionObserver เพราะ section ยาวไม่เท่ากัน
 * ตัวสั้น ๆ อย่าง stats จะชิงเข้าเกณฑ์ของ observer ทั้งที่ยังไม่ได้อ่านถึง
 *
 * @param ids ต้องเป็น array ที่ reference ไม่เปลี่ยนทุก render
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0

      // ถึงท้ายหน้าแล้วให้หัวข้อสุดท้ายติดไว้เลย ไม่งั้นมันจะไฮไลต์ไม่ถึงตลอดกาล
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) {
        setActive(ids.at(-1) ?? null)
        return
      }

      // เส้นวัดอยู่ใต้แถบบนเล็กน้อย — หัวข้อไหนผ่านเส้นนี้ไปแล้วเป็นตัวล่าสุดคือตัวที่กำลังอ่าน
      const line = window.scrollY + HEADER_OFFSET + 24
      let current: string | null = null

      for (const id of ids) {
        const node = document.getElementById(id)
        if (!node) continue
        if (node.getBoundingClientRect().top + window.scrollY <= line) current = id
      }

      setActive(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
