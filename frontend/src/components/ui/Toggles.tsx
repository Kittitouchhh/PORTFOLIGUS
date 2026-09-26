import { useLang } from '@/hooks/useLang'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/utils/cn'

/** สลับภาษาแบบ FR/EN ในเว็บอ้างอิง — ตัวที่เลือกอยู่มีขีดใต้ */
export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, tr } = useLang()

  return (
    <div
      role="group"
      aria-label={tr('lang.toggle')}
      className={cn('flex items-center gap-1 rounded-full border border-line p-1 text-[14px] font-semibold', className)}
    >
      {(['th', 'en'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          aria-current={lang === code}
          className={cn(
            'rounded-full px-3.5 py-2 uppercase transition',
            lang === code ? 'bg-ink text-page' : 'text-ink-2 hover:text-ink',
          )}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const { tr } = useLang()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={tr('theme.toggle')}
      title={tr('theme.toggle')}
      className={cn(
        'grid size-9 place-items-center rounded-full border border-line text-sm text-ink transition-colors hover:border-ink',
        className,
      )}
    >
      <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
    </button>
  )
}
