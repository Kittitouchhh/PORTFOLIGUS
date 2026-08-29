import { Section } from '@/components/layouts/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'

/**
 * การศึกษา + ช่วงสหกิจ + ตำแหน่งที่กำลังมองหา
 *
 * ฝั่งซ้ายเล่นตัวเลขเกรดใหญ่ ๆ เพราะมันคือของที่คนอ่านสแกนหาอยู่แล้ว
 * ฝั่งขวาเป็นช่วงเวลาที่ว่าง — ข้อมูลที่คนจ้างอยากรู้ก่อนอย่างอื่นเลย
 */
export function Education() {
  const { t, tr } = useLang()
  const { education } = useContent()

  return (
    <Section id="education" pattern="crosshatch">
      <SectionHeading
        index={tr('index.education')}
        eyebrow={tr('eyebrow.education')}
        title={tr('section.education.title')}
        desc={tr('section.education.desc')}
      />

      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="eyebrow mb-4">{t(education.school)}</p>

          <h3 className="display text-[clamp(1.75rem,4.2vw,2.75rem)]">
            {t(education.degree)}
          </h3>

          <p className="mt-4 text-[15px] text-ink-2">{t(education.period)}</p>

          <div className="mt-10 flex flex-wrap items-end gap-x-7 gap-y-3 border-t border-line pt-9">
            <p className="display text-[clamp(3.5rem,10vw,6rem)] leading-none text-ink">
              {education.gpa}
            </p>
            <div className="pb-2">
              <p className="eyebrow">{tr('education.gpa')}</p>
              <p className="mt-1.5 max-w-xs text-[13px] leading-relaxed text-ink-3">
                {t(education.gpaNote)}
              </p>
            </div>
          </div>

          <div className="mt-9">
            <p className="eyebrow mb-4">{tr('education.honours')}</p>
            <ul className="flex flex-wrap gap-3">
              {education.honours.map((honour, index) => (
                <li key={index}>
                  <Badge tone="solid">{t(honour)}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          {/* ช่วงสหกิจ — ตัวหนังสือใหญ่เพราะเป็นคำตอบของคำถามแรกที่คนจ้างถาม */}
          <div className="border-t border-line pt-9">
            <p className="eyebrow mb-4 flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              {tr('education.coop')}
            </p>

            <p className="display text-[clamp(1.75rem,4.5vw,2.5rem)]">
              {t(education.coop.period)}
            </p>

            <p className="mt-3 text-[15px] text-ink-2">{t(education.coop.mode)}</p>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-3">
              {t(education.coop.note)}
            </p>
          </div>

          <div className="mt-12 border-t border-line pt-9">
            <p className="eyebrow mb-6">{tr('education.target')}</p>

            <ul>
              {education.targetRoles.map((role, index) => (
                <li
                  key={index}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-4 first:border-t"
                >
                  <span className="num text-sm">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-[15px] font-medium text-ink">{t(role)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
