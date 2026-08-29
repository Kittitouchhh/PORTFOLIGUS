import { Container } from '@/components/layouts/Container'
import { Badge } from '@/components/ui/Badge'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'
import { l } from '@/types/i18n.type'

const caption = l('กิตติธัช · Bluepeak Innovations', 'Kittitouch · Bluepeak Innovations')

/**
 * บล็อกแนะนำตัวใต้พาดหัว — รูปจริงคู่กับชื่อเต็ม
 * รูปเป็นขาวดำก่อน แล้วค่อยขึ้นสีตอนเอาเมาส์ชี้ ให้มันดูเป็นงานพิมพ์มากกว่ารูปโปรไฟล์
 */
export function Intro() {
  const { t, tr } = useLang()
  const { profile } = useContent()

  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <div className="rule mb-14" />

        <div className="grid items-start gap-10 lg:grid-cols-[22rem_1fr] lg:gap-16">
          {/* กรอบซ้อนเยื้อง ให้รูปดูถูกวางบนหน้ากระดาษ ไม่ใช่ลอย */}
          <div className="relative mx-auto w-full max-w-[22rem]">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 border border-ink"
            />
            <figure className="photo-frame relative">
              <img
                src="/hero-portrait-alt.jpg"
                alt={t(profile.fullName)}
                width={405}
                height={661}
                className="aspect-[3/4] w-full object-cover object-top"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-invert-bg/85 px-3 py-2 text-[11px] text-invert-fg backdrop-blur-sm">
                <span>{t(caption)}</span>
                <span aria-hidden="true" className="num">01</span>
              </figcaption>
            </figure>
          </div>

          <div>
            <p className="eyebrow mb-4">{tr('intro.eyebrow')}</p>

            <h2 className="display text-[clamp(2rem,5.5vw,3.5rem)] leading-[1.05]">
              {t(profile.fullName)}
            </h2>

            <p className="mt-3 text-lg text-ink-2">{t(profile.role)}</p>

            {/* ชื่อเล่น — บรรทัดเล็ก ๆ ที่ทำให้ชื่อเต็มยาว ๆ ข้างบนกลายเป็นคนที่ทักได้ */}
            <p className="mt-2 text-[15px] text-ink-3">
              {tr('intro.callMe')}{' '}
              <span className="font-semibold text-ink">{t(profile.nickname)}</span>
            </p>

            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-ink-2">
              {t(profile.tagline)}
            </p>

            {/* ย่อหน้าสรุปแบบเรซูเม่ — ยาวกว่า tagline แต่ยังอ่านจบในลมหายใจเดียว */}
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-3">
              {t(profile.summary)}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Badge tone="solid">{t(profile.availability)}</Badge>
              <Badge tone="dashed">{t(profile.location)}</Badge>
            </div>

            <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <dt className="eyebrow mb-1.5">{tr('intro.email')}</dt>
                <dd>
                  <a href={`mailto:${profile.email}`} className="link-wipe text-[15px]">
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-1.5">{tr('intro.phone')}</dt>
                <dd>
                  <a
                    href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
                    className="link-wipe text-[15px]"
                  >
                    {profile.phone}
                  </a>
                </dd>
              </div>
              {profile.links.map((link) => (
                <div key={link.label}>
                  <dt className="eyebrow mb-1.5">{link.label}</dt>
                  <dd>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-wipe text-[15px]"
                    >
                      {link.handle}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  )
}
