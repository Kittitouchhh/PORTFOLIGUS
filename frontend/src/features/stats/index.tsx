import { Section } from '@/components/layouts/Section'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'

export function Stats() {
  const { t, tr } = useLang()
  const { stats } = useContent()

  return (
    <Section id="stats" pattern="blueprint" className="!py-14" divided={false}>
      <div className="rule mb-12" />

      <dl className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
        {stats.map((stat) => (
          <div key={stat.id} className="lg:border-l lg:border-line lg:pl-6 lg:first:border-0 lg:first:pl-0">
            <dd className="display flex items-baseline gap-2 text-[clamp(3rem,7vw,4.5rem)] text-ink">
              {stat.value}
              {stat.suffix && (
                <span className="font-sans text-sm font-medium text-ink-3">
                  {t(stat.suffix)}
                </span>
              )}
            </dd>
            <dt className="mt-4 text-sm font-semibold text-ink">{t(stat.label)}</dt>
            <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-ink-3">
              {t(stat.detail)}
            </p>
          </div>
        ))}
      </dl>

      <p className="mt-12 text-xs text-ink-3">{tr('section.stats.desc')}</p>
    </Section>
  )
}
