import { TOP_ID } from '@/constants/sections'

/**
 * ระยะเผื่อด้านบนตอนเลื่อนไปหาหัวข้อ
 * จอกว้างใช้แถบข้าง (ไม่มีแถบบน) เลยเผื่อแค่ที่หายใจ · จอแคบยังมีแถบบนสูง ~72px
 */
export const headerOffset = () => (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 32 : 88)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * เลื่อนไปที่ section แบบนุ่ม ๆ พร้อมหักความสูงของแถบบนออก
 * ไม่ใช้ scrollIntoView เพราะอยากคุมระยะเผื่อเองให้ตรงกับ scrollspy
 */
export function scrollToSection(id: string) {
  const target = id === TOP_ID ? null : document.getElementById(id)

  const top = target
    ? target.getBoundingClientRect().top + window.scrollY - headerOffset()
    : 0

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })

  // เปลี่ยน hash บน address bar ไว้ให้ก๊อปลิงก์ได้ แต่ไม่ให้เบราว์เซอร์กระโดดเอง
  const hash = id === TOP_ID ? window.location.pathname : `#${id}`
  window.history.replaceState(null, '', hash)
}
