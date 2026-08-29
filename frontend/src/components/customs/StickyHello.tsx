import { useEffect, useState } from 'react'
import { ContactPopup } from './ContactPopup'
import { useLang } from '@/hooks/useLang'
import { CONTACT_ID } from '@/constants/sections'

/** เลื่อนพ้นหน้าแรกไปเท่าไหร่ถึงจะโผล่ (เท่าของความสูงจอ) */
const SHOW_AFTER = 0.8

/**
 * ปุ่มลอยติดจอมุมขวาล่าง — โผล่มาตอนเลื่อนพ้นหน้าแรก แล้วลอยขึ้นลงเบา ๆ
 * กดแล้วได้นามบัตรใบเดียวกับที่กดจากรูปหน้าแรก
 *
 * ซ่อนตัวเองตอนหัวข้อ "ติดต่อ" อยู่ในจอ เพราะตรงนั้นมีฟอร์มจริงอยู่แล้ว
 * ปุ่มลอยทับฟอร์มของตัวเองคือการตะโกนซ้ำในที่ที่คนตั้งใจมาอยู่แล้ว
 */
export function StickyHello() {
  const { tr } = useLang()
  const [visible, setVisible] = useState(false)
  const [atContact, setAtContact] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * SHOW_AFTER)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const contact = document.getElementById(CONTACT_ID)
    if (!contact) return

    const observer = new IntersectionObserver(
      ([entry]) => setAtContact(entry.isIntersecting),
      { rootMargin: '-20% 0px -10% 0px' },
    )
    observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  const shown = visible && !atContact

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-hidden={!shown}
        tabIndex={shown ? 0 : -1}
        className={[
          'fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full border border-line',
          'bg-invert-bg px-4 py-3 text-[13px] font-semibold text-invert-fg',
          'shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] transition-all duration-500',
          shown
            ? 'anim-float translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0',
        ].join(' ')}
      >
        <span aria-hidden="true" className="anim-wiggle inline-block text-base">
          👋
        </span>
        <span className="hidden sm:inline">{tr('sticky.hello')}</span>
      </button>

      <ContactPopup open={open} onClose={() => setOpen(false)} />
    </>
  )
}
