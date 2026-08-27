import { Container } from './Container'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'

export function Footer() {
  const { t, tr } = useLang()
  const { profile } = useContent()

  return (
    <footer className="pb-14">
      <Container>
        <div className="rule mb-8" />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-xl text-xs leading-relaxed text-ink-3">
            {tr('footer.disclaimer')}
          </p>
          <div className="flex flex-col gap-1.5 text-xs text-ink-3 lg:items-end">
            <span>
              © {new Date().getFullYear()} {t(profile.fullName)} — {tr('footer.rights')}
            </span>
            <span>{tr('footer.builtWith')} React · TypeScript · Tailwind · Express</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
