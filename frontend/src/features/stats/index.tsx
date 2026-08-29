import { Section } from '@/components/layouts/Section'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'
import { l } from '@/types/i18n.type'

const shots = [
  {
    src: '/work/floor.jpg',
    ratio: 'aspect-[3/4]',
    caption: l('ลงหน้างานดูกระบวนการจริง', 'On the floor, watching the real process'),
  },
  {
    src: '/work/meeting.jpg',
    ratio: 'aspect-[16/10]',
    caption: l('รอบนำเสนอระบบให้ลูกค้า', 'Presenting the system to a client'),
  },
]

/**
 * ตัวเลขคู่กับรูปหน้างานจริง
 *
 * ตัวเลขลอย ๆ บนพื้นเปล่าอ่านแล้วเหมือนโบรชัวร์ พอวางคู่กับรูปที่ถ่ายจากงานจริง
 * มันกลายเป็นหลักฐานว่าตัวเลขพวกนี้มาจากไหน ไม่ใช่ตัวเลขที่พิมพ์ขึ้นมาเอง
 */
export function Stats() {
  const { t, tr } = useLang()
  const { stats } = useContent()

  return (
    <Section id="stats" pattern="blueprint" divided={false} className="!py-20 sm:!py-24">
      <div className="rule mb-14" />

      <div className="grid gap-x-14 gap-y-14 lg:grid-cols-[19rem_1fr]">
        {/* คอลัมน์รูป — ใบล่างเยื้องออกมาทับนิดหน่อย ให้ดูเป็นรูปที่วางซ้อนกันบนโต๊ะ */}
        <div className="mx-auto w-full max-w-sm lg:mx-0">
          <figure className="photo-frame">
            <img
              src={shots[0].src}
              alt={t(shots[0].caption)}
              loading="lazy"
              className={`w-full object-cover ${shots[0].ratio}`}
            />
          </figure>

          <figure className="photo-frame -mt-10 ml-10 w-[78%] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.65)]">
            <img
              src={shots[1].src}
              alt={t(shots[1].caption)}
              loading="lazy"
              className={`w-full object-cover ${shots[1].ratio}`}
            />
          </figure>

          <p className="mt-6 text-[13px] leading-relaxed text-ink-3">
            {t(shots[0].caption)} · {t(shots[1].caption)}
          </p>
        </div>

        <dl className="grid gap-x-10 gap-y-11 sm:grid-cols-2">
          {stats.map((stat) => (
            <div key={stat.id} className="border-t border-line pt-6">
              <dd className="display flex items-baseline gap-2 text-[clamp(2.75rem,6vw,4rem)] text-ink">
                {stat.value}
                {stat.suffix && (
                  <span className="font-sans text-sm font-medium text-ink-3">
                    {t(stat.suffix)}
                  </span>
                )}
              </dd>
              <dt className="mt-4 text-sm font-semibold text-ink">{t(stat.label)}</dt>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-3">{t(stat.detail)}</p>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-14 text-xs text-ink-3">{tr('section.stats.desc')}</p>
    </Section>
  )
}
