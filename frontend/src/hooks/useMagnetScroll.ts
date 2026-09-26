import { useEffect } from 'react'

/**
 * เลื่อนแบบแม่เหล็ก (design-handoff 2.1b) — ทำเองด้วย JS แทน CSS scroll-snap
 * เพราะ `mandatory` ของเบราว์เซอร์ดีดกลับจอเดิมเมื่อหมุนล้อทีละนิด (รู้สึกเหมือนเลื่อนไม่ไป)
 *
 * หยุดเลื่อนเมื่อไหร่ → เลื่อนนุ่ม ๆ ไปจอที่ใกล้สุด "ตามทิศที่เลื่อน"
 * - ขยับจากจอเดิมนิดเดียว (< 6% ของจอ) = กลับที่เดิม
 * - จอเดิมกับจอถัดไปอยู่ติดกัน (≤ 1.2 จอ) = พลิกไปจอถัดไปในทิศที่เลื่อน
 * - ช่วงที่เนื้อหาสูงกว่าจอ = อ่านอิสระ ดูดเฉพาะตอนเหลืออีกไม่ถึง 35% ของจอจะถึงจุดถัดไป
 *
 * จุดดูด: แถบที่ไม่สูงเกินจอ (จัดกลาง) · ท่อน .snap-part ใน section สูง · section สูงที่ไม่มีท่อน (ชิดบน)
 * ปิดบนจอ < 1024px, จอเตี้ยกว่า 600px, ผู้ใช้ปิดแอนิเมชัน และตอนป็อปอัปเปิด (html.modal-open)
 */
export function useMagnetScroll() {
  useEffect(() => {
    const ok = () =>
      window.innerWidth >= 1024 &&
      window.innerHeight >= 600 &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !document.documentElement.classList.contains('modal-open')

    const targets = () => {
      const vh = window.innerHeight
      const ys: number[] = []
      const add = (el: Element, align: 'start' | 'center') => {
        const r = el.getBoundingClientRect()
        const top = r.top + window.scrollY
        ys.push(Math.round(align === 'center' && r.height <= vh + 2 ? top + r.height / 2 - vh / 2 : top))
      }
      // data-no-magnet = ไม่ดูด (ปก + ประวัติการศึกษา เลื่อนอิสระ ตามที่เจ้าของขอ)
      document.querySelectorAll('.section-band:not([data-no-magnet])').forEach((band) => {
        const parts = band.querySelectorAll('.snap-part')
        if (band.classList.contains('is-tall') && parts.length) parts.forEach((p) => add(p, 'center'))
        else add(band, 'center')
      })
      const max = document.documentElement.scrollHeight - vh
      return [...new Set(ys.map((y) => Math.min(Math.max(y, 0), max)))].sort((a, b) => a - b)
    }

    let settled = window.scrollY
    let timer = 0

    const settle = () => {
      const y = window.scrollY
      if (!ok()) {
        settled = y
        return
      }
      const vh = window.innerHeight
      const ts = targets()
      const moved = y - settled
      let to: number | undefined
      if (Math.abs(moved) < vh * 0.06) {
        to = ts.reduce((a, b) => (Math.abs(b - y) < Math.abs(a - y) ? b : a), ts[0])
        if (Math.abs(to - y) > vh * 0.25) to = undefined
      } else {
        const ahead = moved > 0 ? ts.find((t) => t > y + 1) : [...ts].reverse().find((t) => t < y - 1)
        const behind = moved > 0 ? [...ts].reverse().find((t) => t <= y + 1) : ts.find((t) => t >= y - 1)
        // จอติดกัน (ห่างกันไม่เกิน ~1 จอ) = พลิกไปจอถัดไปเลย แม้หมุนล้อแค่ติ๊กเดียว
        // ช่วงยาว (เนื้อหาสูงกว่าจอ) = อ่านอิสระ ดูดเฉพาะตอนใกล้จุดถัดไปมาก ๆ
        const gap = ahead !== undefined && behind !== undefined ? Math.abs(ahead - behind) : Infinity
        if (ahead !== undefined && gap <= vh * 1.2) to = ahead
        else if (ahead !== undefined && Math.abs(ahead - y) <= vh * 0.35) to = ahead
      }
      if (to === undefined || Math.abs(to - y) < 2) {
        settled = to ?? y
        return
      }
      settled = to
      window.scrollTo({ top: to, behavior: 'smooth' })
    }

    // scrollend มีใน Chrome/Firefox ใหม่ · Safari ใช้หน่วงเวลาหลังเลื่อนหยุดแทน
    const hasEnd = 'onscrollend' in window
    const onScroll = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(settle, 160)
    }
    if (hasEnd) window.addEventListener('scrollend', settle)
    else window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(timer)
      if (hasEnd) window.removeEventListener('scrollend', settle)
      else window.removeEventListener('scroll', onScroll)
    }
  }, [])
}
