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
      className={cn('flex items-center gap-3 text-[13px] font-semibold', className)}
    >
      {(['th', 'en'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          aria-current={lang === code}
          className="link-wipe uppercase"
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
