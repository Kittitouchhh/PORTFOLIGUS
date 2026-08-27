import { useState } from 'react'
import { Section } from '@/components/layouts/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ContactForm } from '@/components/customs/ContactForm'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'
import { l } from '@/types/i18n.type'

const linksTitle = l('ช่องทางอื่น', 'Elsewhere')

export function Contact() {
  const { t, tr } = useLang()
  const { profile } = useContent()
  const [copied, setCopied] = useState(false)

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
    <Section id="contact" pattern="hatch">
      <SectionHeading
        index={tr('index.contact')}
        eyebrow={tr('eyebrow.contact')}
        title={tr('section.contact.title')}
        desc={tr('contact.note')}
      />

      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[1.1fr_1fr]">
        <ContactForm />

        <div>
          <p className="eyebrow mb-5">{t(linksTitle)}</p>

          <a
            href={`mailto:${profile.email}`}
            className="display block text-[clamp(1.25rem,3.2vw,2rem)] break-all text-ink underline-offset-[6px] hover:underline"
          >
            {profile.email}
          </a>

          <button
            type="button"
            onClick={copyEmail}
            className="link-wipe mt-3 text-[13px] font-medium"
          >
            {copied ? tr('contact.copied') : tr('contact.copy')}
          </button>

          <ul className="mt-10">
            {profile.links.map((link) =>
              link.href === '#' ? null : (
                <li key={link.label} className="border-t border-line last:border-b">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-baseline justify-between gap-4 py-4"
                  >
                    <span className="text-[15px] font-medium text-ink">{link.label}</span>
                    <span className="text-[13px] text-ink-3 transition-colors group-hover:text-ink">
                      {link.handle} ↗
                    </span>
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </Section>
  )
}
