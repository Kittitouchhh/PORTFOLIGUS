import { Section } from '@/components/layouts/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'

/**
 * "แล้วสร้าง impact อะไรไว้บ้าง" — คำถามเดียวที่คนอ่านพอร์ตอยากรู้ที่สุด
 *
 * วางไว้ต้น ๆ หน้าโดยตั้งใจ คนที่มีเวลาสามสิบวินาทีควรได้คำตอบก่อนจะเลื่อนผ่านไป
 * เคสเต็ม ๆ อยู่ที่ section ผลงาน ตรงนี้เอาเฉพาะ "เปลี่ยนอะไรไป"
 */
export function Impact() {
  const { t, tr } = useLang()
  const { impact } = useContent()

  return (
    <Section id="impact" pattern="hatch">
      <SectionHeading
        index={tr('index.impact')}
        eyebrow={tr('eyebrow.impact')}
        title={tr('section.impact.title')}
        desc={tr('section.impact.desc')}
      />

      <ul>
        {impact.map((item, index) => (
          <li
            key={item.id}
            className="grid gap-x-10 gap-y-5 border-t border-line py-10 last:border-b lg:grid-cols-[4rem_1fr_20rem]"
          >
            <span className="num text-sm lg:pt-2">{String(index + 1).padStart(2, '0')}</span>

            <div>
              <h3 className="display text-[clamp(1.5rem,3.4vw,2.25rem)]">{t(item.title)}</h3>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-2">
                {t(item.body)}
              </p>
            </div>

            <ul className="flex flex-wrap gap-2 self-start lg:justify-end lg:pt-2">
              {item.tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  )
}
