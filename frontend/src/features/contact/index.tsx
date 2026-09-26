import { useState } from 'react'
import { Container } from '@/components/layouts/Container'
import { Footer } from '@/components/layouts/Footer'
import { SectionBand } from '@/components/layouts/SectionBand'
import { useReveal } from '@/hooks/useReveal'
import { ContactForm } from '@/components/customs/ContactForm'
import { useLang } from '@/hooks/useLang'
import { profile } from '@portfolio/shared/content'
import { l } from '@/types/i18n.type'

/** 05 — ขั้นต่อไป · การ์ดเหลืองใบใหญ่ ซ้ายช่องทางติดต่อ ขวาฟอร์ม (ตามไฟล์ดีไซน์ หน้าแรก ③) */

const txt = {
  eyebrowName: l('ติดต่อ', 'Contact'),
  t1: l('ขอบคุณที่ให้', 'Thanks for'),
  t2: l('ความสนใจนะครับ', 'your interest'),
  body: l(
    'หากสนใจพูดคุยเรื่องสหกิจ ม.ค. – เม.ย. 2570 หรือต้องการสอบถามเกี่ยวกับผลงานเพิ่มเติม ติดต่อได้เลยครับ ผมจะตอบกลับภายใน 1–2 วันทำการ',
    'If you’d like to talk about a co-op placement for Jan – Apr 2027, or ask more about any project, reach out — I reply within 1–2 business days.',
  ),
  copy: l('คัดลอก', 'Copy'),
  resume: l('ดูเรซูเม่ของผม', 'View my resume'),
  copied: l('คัดลอกแล้ว', 'Copied'),
}

export function Contact() {
  const { t, lang } = useLang()
  const [copied, setCopied] = useState(false)
  const ref = useReveal<HTMLElement>()
  const github = profile.links.find((x) => /github/i.test(x.label))

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard ถูกบล็อก — อีเมลยังกดจาก mailto ได้อยู่ */
    }
  }

  return (
    <SectionBand tone="paper" className="pt-28 pb-10 lg:pt-[120px]">
    <Container>
      <section id="contact" ref={ref} className="pop-card relative grid scroll-mt-10 gap-10 rounded-[40px] border-2 border-ink bg-yellow p-6 shadow-[10px_10px_0_var(--ink)] sm:p-12 lg:grid-cols-2 lg:gap-12">
        <img
          src="/stickers/gus-thumbs-animated.webp"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-4 w-36 -rotate-[8deg] drop-shadow-xl sm:w-48 lg:right-auto lg:left-[30%]"
        />

        <div>
          <p className="mb-4 text-[13px] font-semibold tracking-[0.18em] text-ink">
            04 <span aria-hidden="true" className="chapter-line mx-1" /> {t(txt.eyebrowName)}
          </p>
          <h2 className="text-[clamp(2.6rem,6vw,4.25rem)] leading-[1.05] font-bold tracking-[-0.02em] text-ink">
            {t(txt.t1)}
            <br />
            {t(txt.t2)}
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink/80">{t(txt.body)}</p>

          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-card px-4 py-3">
              <span aria-hidden="true">✉</span>
              <a href={`mailto:${profile.email}`} className="min-w-0 flex-1 truncate font-semibold text-ink hover:underline">
                {profile.email}
              </a>
              <button type="button" onClick={copyEmail} className="rounded-xl bg-ink px-3 py-1.5 text-[13px] font-semibold text-page">
                {t(copied ? txt.copied : txt.copy)}
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
                className="flex items-center gap-2 rounded-2xl border-2 border-ink bg-card px-4 py-3 font-semibold text-ink hover:-translate-y-0.5"
              >
                <span aria-hidden="true">☏</span>
                {profile.phone}
              </a>
              {github && (
                <a
                  href={github.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 rounded-2xl border-2 border-ink bg-card px-4 py-3 font-semibold text-ink hover:-translate-y-0.5"
                >
                  <span aria-hidden="true">⌥</span>
                  {github.handle}
                </a>
              )}
            </div>
            {/* เรซูเม่ — เปิดหน้า HTML ที่พิมพ์/บันทึกเป็น PDF ได้ (public/resume*.html) */}
            <a
              href={profile.resume[lang]}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-between gap-3 rounded-2xl border-2 border-ink bg-ink px-4 py-3 font-semibold text-page shadow-[3px_3px_0_var(--card)] transition hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-2">
                <span aria-hidden="true">📄</span>
                {t(txt.resume)}
              </span>
              <span aria-hidden="true" className="text-yellow">↗</span>
            </a>
          </div>
        </div>

        <div className="rounded-[28px] border-2 border-ink bg-card p-6 sm:p-8">
          <ContactForm />
        </div>
      </section>
    </Container>
    {/* footer อยู่ในจอเดียวกับติดต่อ — จอสุดท้ายจบในหน้าเดียว */}
    <Footer compact />
    </SectionBand>
  )
}
