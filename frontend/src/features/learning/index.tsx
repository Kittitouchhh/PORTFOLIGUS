import { Section } from '@/components/layouts/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'
import { l } from '@/types/i18n.type'

const whyLabel = l('ทำไมถึงเรียน', 'Why')
const howLabel = l('ฝึกยังไง', 'How')

export function Learning() {
  const { t, tr } = useLang()
  const { learning } = useContent()

  return (
    <Section id="learning" pattern="dots">
      <SectionHeading
        index={tr('index.learning')}
        eyebrow={tr('eyebrow.learning')}
        title={tr('section.learning.title')}
        desc={tr('section.learning.desc')}
      />

      <div className="grid gap-x-16 lg:grid-cols-2">
        {learning.map((item) => (
          <article key={item.id} className="border-t border-line py-9">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="display text-xl sm:text-2xl">{t(item.topic)}</h3>
              <span className="num text-sm">{item.progress}%</span>
            </div>

            <div
              className="mt-4 h-px w-full bg-line"
              role="img"
              aria-label={`${t(item.topic)} ${item.progress}%`}
            >
              <div className="h-px bg-ink" style={{ width: `${item.progress}%` }} />
            </div>

            <dl className="mt-7 space-y-5">
              <div>
                <dt className="eyebrow mb-2">{t(whyLabel)}</dt>
                <dd className="text-[15px] leading-relaxed text-ink-2">{t(item.why)}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">{t(howLabel)}</dt>
                <dd className="text-[15px] leading-relaxed text-ink-2">{t(item.how)}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </Section>
  )
}
