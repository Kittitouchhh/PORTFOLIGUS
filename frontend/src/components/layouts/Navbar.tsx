import { useEffect, useState } from 'react'
import { LangPill } from '@/components/ui/Toggles'
import { ResumeIcon } from '@/components/ui/ResumeIcon'
import { useLang } from '@/hooks/useLang'
import { useResume } from '@/hooks/useResume'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { NAV_ITEMS, SPY_IDS, TOP_ID } from '@/constants/sections'
import { profile } from '@portfolio/shared/content'
import { scrollToSection } from '@/utils/scroll'
import { cn } from '@/utils/cn'

/**
 * แถบบน (จอ < 1100px) ติดหนึบตลอดการเลื่อน — design-handoff 7.1
 * มือถือ: สูง 60 · โลโก้ · ปุ่ม CV เหลือง · ☰
 * ไอแพด: สูง 68 · โลโก้ · TH/EN · ปุ่มเรซูเม่ · ☰
 * กด ☰ = เมนูเต็มจอพื้นดำ รายการ 00–05 ตัวใหญ่ + ปุ่มเหลือง "ดูเรซูเม่ (PDF)" + TH/EN (V8M12Menu)
 *
 * หมายเหตุ: กล่องที่ครอบอยู่ต้องเป็น overflow-clip ไม่ใช่ overflow-hidden ไม่งั้น sticky จะตาย (ดู MainLayout)
 */
export function Navbar() {
  const { tr } = useLang()
  const { openResume } = useResume()
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SPY_IDS) ?? TOP_ID
  const progress = useScrollProgress()

  // จอกว้างขึ้นแล้วเมนูต้องไม่ค้างเปิดอยู่
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1100px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // เมนูเปิด = ล็อกหน้าข้างหลัง + Esc ปิด
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.documentElement.classList.add('modal-open')
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    scrollToSection(id)
  }

  const resume = () => {
    setOpen(false)
    openResume()
  }

  const logo = (dark = false) => (
    <button type="button" onClick={() => go(TOP_ID)} className={cn('font-brand text-[21px] font-extrabold', dark ? 'text-card' : 'text-ink')}>
      Kittitouch<span className="text-[#F5B400]">.</span>
    </button>
  )

  return (
    <>
    <header className="sticky top-0 z-50 border-b-[1.5px] border-ink bg-[rgba(246,242,234,.96)] backdrop-blur-md lg:hidden">
      <div className="flex h-[60px] items-center justify-between px-4 md:h-[68px] md:px-8">
        {logo()}
        <div className="flex items-center gap-2">
          <LangPill className="hidden md:flex" />
          <button
            type="button"
            onClick={openResume}
            className="inline-flex h-10 items-center gap-[7px] rounded-full border-[1.5px] border-ink bg-yellow px-3 text-[13px] font-bold text-ink shadow-[2px_2px_0_var(--ink)] transition active:translate-x-px active:translate-y-px active:shadow-none"
          >
            <ResumeIcon />
            <span className="md:hidden">CV</span>
            <span className="hidden md:inline">{tr('resume.short')}</span>
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-label={tr('nav.menuOpen')}
            className="grid size-11 place-items-center rounded-full border-[1.5px] border-ink bg-card text-ink"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* เส้นบอกว่าอ่านไปถึงไหนแล้ว ชิดขอบล่างของแถบ */}
      <div aria-hidden="true" className="absolute inset-x-0 -bottom-[1.5px] h-[3px]">
        <div className="h-full origin-left bg-yellow transition-transform duration-150 ease-out" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>

      {/* เมนูเต็มจอ — อยู่นอก <header> เพราะ backdrop-blur ของแถบจะกัก position: fixed ไว้ในแถบ */}
      {open && (
        <div role="dialog" aria-modal="true" aria-label={tr('nav.menuOpen')} className="fixed inset-0 z-[60] flex flex-col bg-ink lg:hidden" style={{ animation: 'backdropIn .2s ease both' }}>
          <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-[#3A3833] px-4 md:h-[68px] md:px-8">
            {logo(true)}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={tr('nav.menuClose')}
              autoFocus
              className="grid size-11 place-items-center rounded-full border-[1.5px] border-card text-card"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col overflow-y-auto px-5 pt-3 md:px-10">
            {NAV_ITEMS.map((item) => {
              const on = item.id === active
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  aria-current={on ? 'true' : undefined}
                  className="flex min-h-14 items-center gap-3.5 border-b border-[#3A3833] px-1.5 text-left text-card"
                >
                  <span className={cn('font-code text-[12px]', on ? 'text-yellow' : 'text-ink-3')}>{item.no}</span>
                  <span className={cn('text-[22px] font-bold', on && 'text-yellow')}>{tr(item.key)}</span>
                </button>
              )
            })}
          </nav>
          <div className="mt-auto flex flex-col gap-3 px-5 pt-6 pb-[26px] md:px-10">
            <button
              type="button"
              onClick={resume}
              className="flex h-14 items-center justify-center gap-2.5 rounded-2xl border-2 border-ink bg-yellow text-[16px] font-bold text-ink"
            >
              <ResumeIcon size={20} />
              {tr('resume.menu')}
            </button>
            <div className="flex items-center justify-between gap-3">
              <LangPill />
              <span className="truncate text-[12.5px] text-ink-3">{profile.email}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
