import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'
import { CONTACT_ID } from '@/constants/sections'
import { scrollToSection } from '@/utils/scroll'

type ContactPopupProps = {
  open: boolean
  onClose: () => void
}

/**
 * นามบัตรเด้งขึ้นกลางจอ — เปิดจากการกดรูปหน้าแรกหรือปุ่มลอยมุมจอ
 *
 * ตั้งใจให้เป็น "การ์ด" ไม่ใช่ฟอร์ม: อ่านจบใน 3 วินาที กดอีเมล/โทรได้ทันที
 * ใครอยากพิมพ์ยาว ๆ ค่อยกดปุ่มล่างสุดให้พาไปที่ฟอร์มจริงท้ายหน้า
 *
 * เรื่อง overflow: กล่องหน้ากระดาษใน MainLayout เป็น overflow-clip ก็จริง
 * แต่ fixed ไม่ได้ถูกครอบด้วยกล่องนั้น (มันอิงกับ viewport) การ์ดจึงไม่โดนตัดมุม
 */
export function ContactPopup({ open, onClose }: ContactPopupProps) {
  const { t, tr } = useLang()
  const { profile } = useContent()
  const [copied, setCopied] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  // กด Esc ปิด และล็อกไม่ให้หน้าข้างหลังเลื่อนตามตอนการ์ดเปิดอยู่
  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) setCopied(false)
  }, [open])

  if (!open) return null

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard ถูกบล็อก — ยังกด mailto ได้อยู่ */
    }
  }

  const goToForm = () => {
    onClose()
    scrollToSection(CONTACT_ID)
  }

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[color-mix(in_srgb,var(--ground)_72%,transparent)] backdrop-blur-[3px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={tr('contactCard.title')}
        onClick={(event) => event.stopPropagation()}
        className="anim-pop relative w-full max-w-sm border border-line bg-page p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)] sm:p-7"
      >
        {/* เทปกาวสองมุม ให้ดูเหมือนการ์ดที่แปะไว้จริง ๆ ไม่ใช่กล่อง dialog */}
        <span
          aria-hidden="true"
          className="absolute -top-3 -left-4 h-6 w-20 -rotate-6 bg-accent/25 backdrop-blur-[1px]"
        />
        <span
          aria-hidden="true"
          className="absolute -top-3 -right-4 h-6 w-16 rotate-6 bg-accent/25 backdrop-blur-[1px]"
        />

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={tr('contactCard.close')}
          className="absolute top-3 right-3 grid size-8 place-items-center rounded-full border border-line text-sm text-ink-2 transition-colors hover:bg-[var(--page-2)] hover:text-ink"
        >
          <span aria-hidden="true">✕</span>
        </button>

        <div className="flex items-center gap-4">
          <img
            src="/hero-portrait.jpg"
            alt=""
            width={120}
            height={120}
            className="size-16 shrink-0 rounded-full border border-line object-cover object-top"
          />
          <div className="min-w-0">
            <p className="display text-xl">{t(profile.fullName)}</p>
            <p className="mt-0.5 truncate text-[13px] text-ink-3">{t(profile.role)}</p>
          </div>
        </div>

        <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
          {tr('contactCard.desc')}
        </p>

        <div className="mt-6 space-y-4 border-t border-line pt-5">
          <div>
            <p className="eyebrow mb-1">{tr('intro.email')}</p>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <a href={`mailto:${profile.email}`} className="link-wipe text-[15px] break-all">
                {profile.email}
              </a>
              <button type="button" onClick={copyEmail} className="text-[12px] text-accent">
                {copied ? tr('contact.copied') : tr('contact.copy')}
              </button>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-1">{tr('intro.phone')}</p>
            <a
              href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
              className="link-wipe text-[15px]"
            >
              {profile.phone}
            </a>
          </div>

          {profile.links
            .filter((link) => link.href !== '#')
            .map((link) => (
              <div key={link.label}>
                <p className="eyebrow mb-1">{link.label}</p>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-wipe text-[15px]"
                >
                  {link.handle} ↗
                </a>
              </div>
            ))}
        </div>

        <button type="button" onClick={goToForm} className="pill pill-solid mt-6 w-full">
          {tr('contactCard.write')}
        </button>
      </div>
    </div>
  )
}
