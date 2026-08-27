import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Container } from './Container'
import { LanguageToggle, ThemeToggle } from '@/components/ui/Toggles'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'
import type { UiKey } from '@/constants/uiText'

const navItems: { to: string; key: UiKey }[] = [
  { to: ROUTES.ABOUT, key: 'nav.about' },
  { to: ROUTES.SKILLS, key: 'nav.skills' },
  { to: ROUTES.PROCESS, key: 'nav.process' },
  { to: ROUTES.WORK, key: 'nav.work' },
  { to: ROUTES.EXPERIENCE, key: 'nav.experience' },
  { to: ROUTES.LEARNING, key: 'nav.learning' },
]

export function Navbar() {
  const { tr } = useLang()
  const { profile } = useContent()
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const { pathname } = useLocation()

  // เปลี่ยนหน้าแล้วเมนูมือถือต้องปิดเอง ไม่ใช่ค้างบังหน้าใหม่
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ปิดเมนูมือถือเมื่อจอกว้างขึ้น จะได้ไม่ค้าง
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-300"
      style={solid ? { background: 'var(--page)' } : undefined}
    >
      <Container className="flex h-20 items-center gap-6">
        <Link to={ROUTES.HOME} className="display flex items-baseline gap-1 text-xl">
          {tr('brand.short')}
          <span aria-hidden="true" className="text-accent">
            .
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 text-[14px] font-medium lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn('nav-link', isActive && 'nav-link-active')
              }
            >
              {tr(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 lg:ml-7">
          <LanguageToggle className="hidden sm:flex" />
          <ThemeToggle />

          <Link
            to={ROUTES.CONTACT}
            className="pill pill-solid pill-sm hidden font-medium sm:inline-flex"
          >
            {profile.email}
          </Link>

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

      {open && (
        <div style={{ background: 'var(--page)' }} className="border-t border-line lg:hidden">
          <Container className="flex flex-col py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'display flex items-center justify-between border-b border-line px-3 py-3 text-2xl last:border-0',
                    isActive && 'nav-link-active rounded-xl border-transparent',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {tr(item.key)}
                    {isActive && (
                      <span aria-hidden="true" className="text-sm">
                        ●
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <div className="flex items-center gap-5 pt-4">
              <LanguageToggle className="sm:hidden" />
              <Link to={ROUTES.CONTACT} className="pill pill-solid pill-sm">
                {tr('nav.contact')}
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
