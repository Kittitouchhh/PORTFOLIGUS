import { Section } from '@/components/layouts/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'
import type { L } from '@portfolio/shared/types'

type Shot = {
  id: string
  src: string
  ratio: string
  caption: L
  note: L
}

/**
 * รูปหน้างานจริง ไม่ใช่ภาพ stock
 * กติกา: ห้ามมีรูปที่อ่านชื่อลูกค้าออก — เลือกเฉพาะใบที่เห็นแบรนด์ของนายจ้างเองหรือไม่เห็นแบรนด์เลย
 */
const shots: Shot[] = [
  {
    id: 'pitch',
    src: '/work/pitch.jpg',
    ratio: 'aspect-[16/10]',
    caption: l('นำเสนอระบบให้ลูกค้า', 'Pitching the system to a client'),
    note: l(
      'ห้องประชุม — รอบที่ต้องอธิบายของยากให้คนตัดสินใจฟังแล้วเข้าใจ',
      'The meeting room round, where hard things have to make sense to whoever signs off.',
    ),
  },
  {
    id: 'site-visit',
    src: '/work/site-visit.jpg',
    ratio: 'aspect-[3/4]',
    caption: l('ลงหน้างานเก็บ requirement', 'On site gathering requirements'),
    note: l(
      'ไปดูของจริงว่าเขาทำงานยังไง ก่อนจะเขียนว่าระบบต้องทำอะไร',
      'Watching how the work actually happens before writing what the system must do.',
    ),
  },
  {
    id: 'team',
    src: '/work/team.jpg',
    ratio: 'aspect-[4/5]',
    caption: l('ทีมที่ทำงานด้วยกัน', 'The team I work with'),
    note: l(
      'คนที่รับ spec กับ mockup ของผมไปทำต่อ',
      'The people who take my specs and mockups and build from them.',
    ),
  },
]

export function Gallery() {
  const { t, tr } = useLang()

  return (
    <Section id="gallery" pattern="crosshatch">
      <SectionHeading
        index={tr('index.gallery')}
        eyebrow={tr('eyebrow.gallery')}
        title={tr('section.gallery.title')}
      />

      {/* ใบแรกกินสองคอลัมน์ ให้จังหวะไม่เท่ากัน จะได้ไม่เป็นตารางแข็ง ๆ */}
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {shots.map((shot, index) => (
          <figure
            key={shot.id}
            className={index === 0 ? 'sm:col-span-2' : undefined}
          >
            <div className="photo-frame">
              <img
                src={shot.src}
                alt={t(shot.caption)}
                loading="lazy"
                className={`w-full object-cover ${shot.ratio}`}
              />
            </div>
            <figcaption className="mt-4 grid grid-cols-[2.5rem_1fr] gap-x-4">
              <span className="num text-sm text-ink-3">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="block text-[15px] font-semibold text-ink">
                  {t(shot.caption)}
                </span>
                <span className="mt-1 block text-[13px] leading-relaxed text-ink-3">
                  {t(shot.note)}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
