import { Section } from '@/components/layouts/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'
import { l } from '@/types/i18n.type'
import { cn } from '@/utils/cn'

const outputsLabel = l('ได้อะไรออกมา', 'Output')
const workflowTitle = l('งานวิ่งผ่านมือใครบ้าง', 'How the work moves')
const workflowNote = l(
  'ผมไม่ได้ส่งต่อ requirement ให้ dev แล้วจบหน้าที่ ผมอยู่กับมันจนของที่ส่งไปมีคนใช้ได้จริง',
  'I do not just pass requirements to developers. I stay involved until the solution is usable.',
)

/** เลนของงาน — เลนกลางคือของผม เลยทำให้เด่นกว่าเลนอื่น */
const lanes = [
  {
    id: 'customer-in',
    actor: l('ลูกค้า', 'Customer'),
    mine: false,
    items: [
      l('เล่าปัญหาหน้างาน', 'Describes the problem'),
      l('Discovery', 'Discovery'),
    ],
  },
  {
    id: 'ba',
    actor: l('ผม — Business Analyst', 'Me — Business Analyst'),
    mine: true,
    items: [
      l('Requirement', 'Requirement'),
      l('Process Analysis', 'Process Analysis'),
      l('Solution Design', 'Solution Design'),
      l('UX/UI', 'UX/UI'),
      l('Specification', 'Specification'),
    ],
  },
  {
    id: 'dev',
    actor: l('ทีมพัฒนา', 'Development'),
    mine: false,
    items: [
      l('Build', 'Build'),
      l('Test', 'Test'),
      l('Demo', 'Demo'),
    ],
  },
  {
    id: 'customer-out',
    actor: l('กลับไปที่ลูกค้า', 'Back to the customer'),
    mine: false,
    items: [
      l('UAT', 'UAT'),
      l('Feedback', 'Feedback'),
      l('Delivery', 'Delivery'),
    ],
  },
]

function Workflow() {
  const { t } = useLang()

  return (
    <div className="mb-20">
      <p className="eyebrow mb-6">{t(workflowTitle)}</p>

      <ol className="grid gap-4 lg:grid-cols-4 lg:gap-0">
        {lanes.map((lane, index) => (
          <li
            key={lane.id}
            className={cn(
              'relative border p-6',
              lane.mine
                ? 'border-ink bg-invert-bg text-invert-fg'
                : 'border-line',
              // บนจอกว้างเลนต่อกันเป็นสายเดียว เลยยุบเส้นขอบที่ซ้อนกันทิ้ง
              index > 0 && 'lg:-ml-px',
            )}
          >
            <p
              className={cn(
                'text-[11px] font-semibold tracking-[0.14em] uppercase',
                lane.mine ? 'text-invert-fg' : 'text-ink-3',
              )}
            >
              {t(lane.actor)}
            </p>

            <ul className="mt-4 space-y-1.5">
              {lane.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className={cn(
                    'text-[15px]',
                    lane.mine ? 'font-semibold' : 'text-ink-2',
                  )}
                >
                  {t(item)}
                </li>
              ))}
            </ul>

            {/* ลูกศรเชื่อมเลน โผล่เฉพาะจอกว้างที่วางเรียงกันจริง ๆ */}
            {index < lanes.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute top-1/2 -right-3 z-10 hidden size-6 place-items-center rounded-full border border-line bg-page text-[11px] text-ink-3 lg:grid"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-ink">
        {t(workflowNote)}
      </p>
    </div>
  )
}

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

      <Workflow />

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
