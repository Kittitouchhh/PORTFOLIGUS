import { Section } from '@/components/layouts/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'
import { l } from '@/types/i18n.type'

const nowLabel = l('ตอนนี้', 'Now')
const cvLabel = l('ดาวน์โหลด CV', 'Download CV')

export function Experience() {
  const { t, tr } = useLang()
  const { timeline, profile } = useContent()

  return (
    <Section id="experience" pattern="blueprint">
      <SectionHeading
        index={tr('index.experience')}
        eyebrow={tr('eyebrow.experience')}
        title={tr('section.experience.title')}
      />

      <div>
        {timeline.map((item) => (
          <article
            key={item.id}
            className="grid gap-x-10 gap-y-5 border-t border-line py-10 last:border-b lg:grid-cols-[14rem_1fr]"
          >
            <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-start">
              <p className="num text-sm">{t(item.period)}</p>
              {item.current && <Badge tone="solid">{t(nowLabel)}</Badge>}
            </div>

            <div>
              <h3 className="display text-2xl sm:text-[1.75rem]">{t(item.role)}</h3>
              <p className="mt-1.5 flex items-center gap-2 text-sm text-ink-3">
                {item.orgColor && (
                  <span
                    aria-hidden="true"
                    className="size-2 shrink-0 rounded-full"
                    style={{ background: item.orgColor }}
                  />
                )}
                {t(item.org)}
              </p>

              <ul className="mt-6 space-y-3">
                {item.points.map((point, index) => (
                  <li key={index} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                    <span aria-hidden="true" className="text-ink-3">—</span>
                    <span>{t(point)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {profile.resume.enabled && (
        <a href={profile.resume.href} className="pill pill-outline mt-10">
          {t(cvLabel)} ↓
        </a>
      )}
    </Section>
  )
}
