import { useEffect, useState } from 'react'
import { Container } from './Container'
import { LanguageToggle, ThemeToggle } from '@/components/ui/Toggles'
import { useLang } from '@/hooks/useLang'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { CONTACT_ID, SECTIONS, SPY_IDS, TOP_ID } from '@/constants/sections'
import { scrollToSection } from '@/utils/scroll'
import { cn } from '@/utils/cn'

/**
 * แถบบนติดหนึบอยู่กับจอตลอดการเลื่อน
 * กดเมนู = เลื่อนไปหาหัวข้อนั้นในหน้าเดียวกัน ไม่ได้เปลี่ยนหน้า
 *
 * หมายเหตุ: กล่องหน้ากระดาษที่ครอบอยู่ต้องเป็น overflow-clip ไม่ใช่ overflow-hidden
 * ไม่งั้น sticky จะตายทั้งแถบ (ดู MainLayout)
 */
export function Navbar() {
  const { tr } = useLang()
  const [open, setOpen] = useState(false)
  const [lifted, setLifted] = useState(false)
  const active = useActiveSection(SPY_IDS)
  const progress = useScrollProgress()

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // จอกว้างขึ้นแล้วเมนูมือถือต้องไม่ค้างเปิดอยู่
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300',
        lifted && 'shadow-[0_1px_0_var(--line)] backdrop-blur-md',
      )}
      style={lifted ? { background: 'color-mix(in srgb, var(--page) 82%, transparent)' } : undefined}
    >
      <Container className="flex h-20 items-center gap-6">
        <button
          type="button"
          onClick={() => go(TOP_ID)}
          className="display flex items-baseline gap-1 text-xl"
        >
          {tr('brand.short')}
          <span aria-hidden="true" className="text-accent">
            .
          </span>
        </button>

        <nav className="ml-auto hidden items-center gap-1 text-[14px] font-medium lg:flex">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => go(section.id)}
              aria-current={active === section.id ? 'true' : undefined}
              className={cn('nav-link', active === section.id && 'nav-link-active')}
            >
              {tr(section.key)}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 lg:ml-7">
          <LanguageToggle className="hidden sm:flex" />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => go(CONTACT_ID)}
            className="pill pill-solid pill-sm hidden font-medium sm:inline-flex"
          >
            {tr('nav.contact')}
          </button>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label="Menu"
            className="grid size-9 place-items-center rounded-full border border-line text-sm lg:hidden"
          >
            <span aria-hidden="true">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </Container>

      {/* เส้นบอกว่าอ่านไปถึงไหนแล้ว วางชิดขอบล่างของแถบ */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px">
        <div
          className="h-full origin-left bg-accent transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {open && (
        <div style={{ background: 'var(--page)' }} className="border-t border-line lg:hidden">
          <Container className="flex flex-col py-3">
            {[...SECTIONS, { id: CONTACT_ID, key: 'nav.contact' as const }].map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => go(section.id)}
                className={cn(
                  'display flex items-center justify-between border-b border-line px-3 py-3 text-left text-2xl last:border-0',
                  active === section.id && 'nav-link-active rounded-xl border-transparent',
                )}
              >
                {tr(section.key)}
                {active === section.id && (
                  <span aria-hidden="true" className="text-sm">
                    ●
                  </span>
                )}
              </button>
            ))}
            <div className="flex items-center gap-5 pt-4">
              <LanguageToggle className="sm:hidden" />
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
