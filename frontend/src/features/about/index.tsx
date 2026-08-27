import { Section } from '@/components/layouts/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'
import { l } from '@/types/i18n.type'

/** สี่อย่างที่อยากให้คนอ่านจำได้ */
const pillars = [
  {
    id: 'listen',
    title: l('ฟังให้ออกก่อนเขียน', 'Listen before writing'),
    body: l(
      'ผมถามจนเข้าใจว่าลูกค้าจะเอาไปทำอะไรต่อ ไม่ใช่รับฟีเจอร์มาแล้วทำตามคำสั่ง',
      'I ask until I understand what the client will do with it — not just implement the request as given.',
    ),
  },
  {
    id: 'visual',
    title: l('ทำให้เห็นภาพก่อนลงมือ', 'Show it before building it'),
    body: l(
      'mockup และ flow ช่วยจับความเข้าใจผิดตั้งแต่ยังแก้ได้ถูก ๆ',
      'Mockups and flows catch misunderstandings while fixing them is still cheap.',
    ),
  },
  {
    id: 'trust',
    title: l('ผิดได้ แต่ไม่ผิดซ้ำ', 'Wrong once, never twice'),
    body: l(
      'ที่ได้รับผิดชอบงานขนาดนี้ทั้งที่เพิ่งเริ่ม ไม่ใช่เพราะไม่เคยพลาด แต่เพราะพลาดแล้วแก้ให้เห็นและไม่กลับไปพลาดเรื่องเดิมอีก',
      'I was trusted with this much this early not because I never got it wrong, but because I fixed it in the open and never came back with the same mistake.',
    ),
  },
  {
    id: 'ship',
    title: l('ส่งของที่ใช้ได้จริง', 'Ship things people use'),
    body: l(
      'ของที่ส่งไปแล้วต้องมีคนใช้จริง ไม่ใช่แค่ผ่านการตรวจรับ',
      'Delivered work has to get used, not just pass acceptance.',
    ),
  },
]

export function About() {
  const { t, tr } = useLang()
  const { profile } = useContent()

  return (
    <Section id="about" pattern="dots">
      <SectionHeading
        index={tr('index.about')}
        eyebrow={tr('eyebrow.about')}
        title={tr('section.about.title')}
      />

      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6 text-[17px] leading-relaxed text-ink-2">
          <p className="text-[19px] text-ink sm:text-[22px] sm:leading-snug">
            {t(profile.intro)}
          </p>
          <p>{t(profile.introSecondary)}</p>
          <p>{t(profile.introMotivation)}</p>
        </div>

        <ul>
          {pillars.map((pillar, index) => (
            <li
              key={pillar.id}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line py-6 last:border-b"
            >
              <span className="num text-sm">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="display text-lg">{t(pillar.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{t(pillar.body)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
