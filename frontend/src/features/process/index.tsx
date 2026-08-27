import { Section } from '@/components/layouts/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'
import { l } from '@/types/i18n.type'

const outputsLabel = l('ได้อะไรออกมา', 'Output')

export function Process() {
  const { t, tr } = useLang()
  const { processSteps } = useContent()

  return (
    <Section id="process" pattern="hatch">
      <SectionHeading
        index={tr('index.process')}
        eyebrow={tr('eyebrow.process')}
        title={tr('section.process.title')}
        desc={tr('section.process.desc')}
      />

      {/* ลำดับเลขมีความหมายจริง — เป็นขั้นตอนที่ทำเรียงกัน */}
      <ol>
        {processSteps.map((step) => (
          <li
            key={step.id}
            className="grid gap-x-10 gap-y-5 border-t border-line py-10 last:border-b lg:grid-cols-[5rem_1fr_20rem]"
          >
            <span className="display text-[2.5rem] leading-none text-ink-3">
              {step.step}
            </span>

            <div>
              <h3 className="display text-2xl sm:text-[1.75rem]">{t(step.title)}</h3>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink-2">{t(step.summary)}</p>
            </div>

            <div>
              <p className="eyebrow mb-4">{t(outputsLabel)}</p>
              <ul className="space-y-2">
                {step.outputs.map((output, index) => (
                  <li key={index} className="flex gap-3 text-sm text-ink-2">
                    <span aria-hidden="true" className="text-ink-3">
                      —
                    </span>
                    <span>{t(output)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
