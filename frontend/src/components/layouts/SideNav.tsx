import { useEffect, useState } from 'react'
import { useLang } from '@/hooks/useLang'
import { useResume } from '@/hooks/useResume'
import { useActiveSection } from '@/hooks/useActiveSection'
import { LangPill } from '@/components/ui/Toggles'
import { ResumeIcon } from '@/components/ui/ResumeIcon'
import { CONTACT_ID, NAV_ITEMS, TOP_ID } from '@/constants/sections'
import { scrollToSection } from '@/utils/scroll'
import { cn } from '@/utils/cn'

/**
 * จอคอม (≥ 1100px) — design-handoff 7.1 / V8D01Cover
 * ซ้าย: แถบเมนูแคปซูลแคบลอยกลางจอ · รูปตัวเอง (กดกลับบน) · จุด 00–05 · ปุ่มกลม CV (เปิดป็อปอัปเรซูเม่)
 * ขวาบน: ปุ่มลอย TH/EN · ดูเรซูเม่ · ทักมา
 * แถบเปลี่ยนเป็นสีเข้มเองตอนกลางจออยู่บนแถบพื้นดำ (วิธีทำงาน · รูปจากงานจริง)
 */

const SPY = NAV_ITEMS.map((x) => x.id)

/** กลางจอตอนนี้อยู่บนแถบพื้นดำไหม */
function useOverDark() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      const mid = window.innerHeight / 2
      const bands = document.querySelectorAll<HTMLElement>('.section-band[data-tone="dark"]')
      setDark([...bands].some((b) => {
        const r = b.getBoundingClientRect()
        return r.top <= mid && r.bottom >= mid
      }))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return dark
}

export function SideNav() {
  const { tr } = useLang()
  const { openResume } = useResume()
  const active = useActiveSection(SPY) ?? TOP_ID
  const dark = useOverDark()
  const activeIdx = Math.max(0, NAV_ITEMS.findIndex((x) => x.id === active))

  return (
    <>
      <aside
        className={cn(
          'fixed top-1/2 left-5 z-50 hidden w-14 -translate-y-1/2 flex-col items-center gap-3 rounded-full border-[1.5px] py-3 transition-colors duration-500 lg:flex',
          dark ? 'border-card/30 bg-[#22211e] shadow-[3px_3px_0_var(--yellow)]' : 'border-ink bg-card shadow-[3px_3px_0_var(--ink)]',
        )}
        aria-label="Section navigation"
      >
        {/* รูปตัวเองวงกลม = โลโก้ กดแล้วกลับขึ้นบน */}
        <button type="button" onClick={() => scrollToSection(TOP_ID)} className="group" aria-label={tr('nav.top')}>
          <img
            src="/photos/portrait-uniform.webp"
            alt=""
            className="size-10 rounded-full border-[1.5px] border-ink object-cover object-[center_18%] transition group-hover:scale-105"
          />
        </button>
        <span aria-hidden="true" className={cn('h-2.5 w-0.5', dark ? 'bg-card/25' : 'bg-line')} />

        <nav className="flex flex-col items-center gap-3">
          {NAV_ITEMS.map((item, i) => {
            const on = item.id === active
            const passed = i < activeIdx
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                aria-current={on ? 'true' : undefined}
                aria-label={tr(item.key)}
                className="group relative grid size-[34px] place-items-center"
              >
                <span
                  className={cn(
                    'font-code grid place-items-center rounded-full text-[11px] font-extrabold transition-all duration-300',
                    on
                      ? 'size-[34px] border-2 border-ink bg-yellow text-ink'
                      : passed
                        ? cn('size-[26px] border-[1.5px]', dark ? 'border-yellow text-yellow' : 'border-ink bg-ink text-card')
                        : cn('size-[26px] border-[1.5px]', dark ? 'border-card/30 text-card/60' : 'border-[#C9C3B6] text-ink-3'),
                  )}
                >
                  {item.no}
                </span>
                {/* ชื่อหัวข้อ — โผล่ตอนชี้ */}
                <span className="pointer-events-none absolute left-full ml-4 -translate-x-2 rounded-full border-2 border-ink bg-ink px-3.5 py-1.5 text-[13px] font-semibold whitespace-nowrap text-page opacity-0 shadow-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                  {tr(item.key)}
                </span>
              </button>
            )
          })}
        </nav>

        <span aria-hidden="true" className={cn('h-2.5 w-0.5', dark ? 'bg-card/25' : 'bg-line')} />
        <button
          type="button"
          onClick={openResume}
          aria-label={tr('resume.view')}
          title={tr('resume.view')}
          className="grid size-10 place-items-center rounded-full border-[1.5px] border-ink bg-yellow text-ink transition hover:-translate-y-0.5"
        >
          <ResumeIcon size={18} />
        </button>
        <span className={cn('-mt-2 text-[10px] font-bold', dark ? 'text-card/70' : 'text-ink-2')}>CV</span>
      </aside>

      {/* ปุ่มลอยขวาบน */}
      <div className="fixed top-6 right-8 z-50 hidden items-center gap-2.5 lg:flex">
        <LangPill />
        <button
          type="button"
          onClick={openResume}
          className="inline-flex h-11 items-center gap-[7px] rounded-full border-[1.5px] border-ink bg-yellow px-4 text-[14px] font-bold text-ink shadow-[2px_2px_0_var(--ink)] transition hover:-translate-y-0.5"
        >
          <ResumeIcon />
          {tr('resume.view')}
        </button>
        <button
          type="button"
          onClick={() => scrollToSection(CONTACT_ID)}
          className="inline-flex h-11 items-center gap-2 rounded-full border-[1.5px] border-ink bg-ink px-[18px] text-[14px] font-bold text-card transition hover:-translate-y-0.5"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFC940" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 11V6.5a1.5 1.5 0 0 1 3 0V11M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0v7M7 11a1.5 1.5 0 0 0-3 0c0 5 3 9 8 9a6 6 0 0 0 6-6v-2" />
          </svg>
          {tr('nav.hello')}
        </button>
      </div>
    </>
  )
}
