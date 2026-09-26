import { useLang } from '@/hooks/useLang'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { CONTACT_ID, SECTIONS, TOP_ID } from '@/constants/sections'
import type { UiKey } from '@/constants/uiText'
import { scrollToSection } from '@/utils/scroll'
import { cn } from '@/utils/cn'

/**
 * แถบข้างซ้าย (จอกว้างเท่านั้น) แทนแถบบน
 * รางแนวตั้ง 00–05 เติมสีตามที่เลื่อนลงไป · จุดที่กำลังอ่านเป็นวงเหลือง + ชื่อหัวข้อเด้งออกมาข้าง ๆ
 * แถบเปลี่ยนเป็นสีเข้มเองตอนอยู่ในหัวข้อพื้นเข้ม (วิธีคิด) ให้กลืนกับหน้า
 */

const ITEMS: { id: string; key: UiKey; no: string }[] = [
  { id: TOP_ID, key: 'nav.top', no: '00' },
  ...SECTIONS.map((s, i) => ({ id: s.id, key: s.key, no: String(i + 1).padStart(2, '0') })),
  { id: CONTACT_ID, key: 'nav.contact', no: String(SECTIONS.length + 1).padStart(2, '0') },
]
const SPY = ITEMS.map((x) => x.id)

export function SideNav() {
  const { tr, lang, setLang } = useLang()
  const active = useActiveSection(SPY) ?? TOP_ID
  const progress = useScrollProgress()
  const dark = active === 'method'
  const activeIdx = Math.max(0, ITEMS.findIndex((x) => x.id === active))

  return (
    <aside
      className={cn(
        'fixed top-3 bottom-3 left-3 z-50 hidden w-[84px] flex-col items-center rounded-[28px] border-2 py-4 transition-colors duration-500 lg:flex',
        dark ? 'border-page/20 bg-[#22211e] text-page' : 'border-ink bg-card text-ink',
      )}
      aria-label="Section navigation"
    >
      {/* รูปตัวเองวงกลม = โลโก้ กดแล้วกลับขึ้นบน */}
      <button type="button" onClick={() => scrollToSection(TOP_ID)} className="group relative" aria-label={tr('nav.top')}>
        <img
          src="/photos/portrait-casual.webp"
          alt=""
          className="size-14 rounded-full border-2 border-ink object-cover object-top transition group-hover:scale-105"
        />
        <span className="absolute -right-1 -bottom-1 size-4 rounded-full border-2 border-card bg-emerald-500" />
      </button>

      {/* ราง + จุด */}
      <nav className="relative my-6 flex flex-1 flex-col items-center justify-between">
        <span aria-hidden="true" className={cn('absolute top-2 bottom-2 w-[3px] rounded-full', dark ? 'bg-page/15' : 'bg-line')} />
        <span
          aria-hidden="true"
          className="absolute top-2 w-[3px] rounded-full bg-yellow transition-[height] duration-200 ease-out"
          style={{ height: `calc((100% - 1rem) * ${progress})` }}
        />
        {ITEMS.map((item, i) => {
          const on = item.id === active
          const passed = i < activeIdx
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              aria-current={on ? 'true' : undefined}
              className="group relative z-10 grid place-items-center"
            >
              <span
                className={cn(
                  'font-brand grid place-items-center rounded-full border-2 font-extrabold transition-all duration-300',
                  on
                    ? 'size-11 border-ink bg-yellow text-[13px] text-ink shadow-[3px_3px_0_var(--ink)]'
                    : passed
                      ? cn('size-8 text-[11px]', dark ? 'border-yellow bg-[#22211e] text-yellow' : 'border-ink bg-ink text-page')
                      : cn('size-8 text-[11px]', dark ? 'border-page/30 bg-[#22211e] text-page/60' : 'border-line bg-card text-ink-3'),
                )}
              >
                {item.no}
              </span>
              {/* ชื่อหัวข้อ — ตัวที่อ่านอยู่โชว์ค้าง ตัวอื่นโผล่ตอนชี้ */}
              <span
                className={cn(
                  'pointer-events-none absolute left-full ml-5 rounded-full border-2 border-ink bg-ink px-3.5 py-1.5 text-[13px] font-semibold whitespace-nowrap text-page shadow-md transition-all duration-300',
                  on ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100',
                )}
              >
                {tr(item.key)}
              </span>
            </button>
          )
        })}
      </nav>

      {/* ภาษา + ทักมา */}
      <div className="flex flex-col items-center gap-2">
        <div className={cn('flex flex-col rounded-full border p-1 text-[11px] font-bold', dark ? 'border-page/20' : 'border-line')}>
          {(['th', 'en'] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className={cn(
                'rounded-full px-2 py-1.5 uppercase transition',
                lang === code ? (dark ? 'bg-yellow text-ink' : 'bg-ink text-page') : 'opacity-60 hover:opacity-100',
              )}
            >
              {code}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => scrollToSection(CONTACT_ID)}
          className="grid size-12 place-items-center rounded-full border-2 border-ink bg-yellow text-[18px] text-ink shadow-[3px_3px_0_var(--ink)] transition hover:-translate-y-0.5"
          aria-label={tr('nav.hello')}
          title={tr('nav.hello')}
        >
          ✉
        </button>
      </div>
    </aside>
  )
}
