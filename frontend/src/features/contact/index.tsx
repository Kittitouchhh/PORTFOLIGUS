import { useState, type ReactNode } from 'react'
import { Container } from '@/components/layouts/Container'
import { Footer } from '@/components/layouts/Footer'
import { SectionBand } from '@/components/layouts/SectionBand'
import { useReveal } from '@/hooks/useReveal'
import { ContactForm } from '@/components/customs/ContactForm'
import { useLang } from '@/hooks/useLang'
import { useResume } from '@/hooks/useResume'
import { ResumeIcon } from '@/components/ui/ResumeIcon'
import { CONTACT_ID, NAV_ITEMS } from '@/constants/sections'
import { profile } from '@portfolio/shared/content'
import { l } from '@/types/i18n.type'
import { cn } from '@/utils/cn'

/**
 * 05 — ติดต่อ · การ์ดเหลืองใบใหญ่ (design-handoff 7.3 ข้อ 10 · V8*10Contact)
 * จอคอม: ซ้ายช่องทางติดต่อ + ปุ่มเรซูเม่ดำ / ขวาฟอร์ม · ไอแพด, มือถือ: ฟอร์มลงไปอยู่ล่าง
 * มือถือ: หัวข้อจัดกลาง เบอร์กับ GitHub คนละแถว (ห้ามตัด …)
 */

const txt = {
  eyebrowName: l('ติดต่อ', 'Contact'),
  t1: l('ขอบคุณที่ให้', 'Thanks for'),
  t2: l('ความสนใจนะครับ', 'your interest'),
  body: l(
    'หากสนใจพูดคุยเรื่องสหกิจ ม.ค. – เม.ย. 2570 หรือต้องการสอบถามเกี่ยวกับผลงานเพิ่มเติม ติดต่อได้เลยครับ ผมจะตอบกลับภายใน 1–2 วันทำการ',
    'If you’d like to talk about a co-op placement for Jan – Apr 2027, or ask more about any project, reach out — I reply within 1–2 business days.',
  ),
  copy: l('คัดลอก', 'Copy'),
  copyLabel: l('คัดลอกอีเมล', 'Copy email'),
  copied: l('คัดลอกแล้ว', 'Copied'),
  resume: l('ดูเรซูเม่ของผม', 'View my resume'),
  resumeMeta: l('PDF · 1 หน้า · เปิดดูได้ทันที', 'PDF · 1 page · opens right here'),
}

/** เลขหัวข้อเอาจากเมนู — ถ้าเพิ่ม/ลด section เลขจะตามเอง */
const chapterNo = NAV_ITEMS.find((item) => item.id === CONTACT_ID)?.no ?? ''

/** แถวช่องทางติดต่อ — กล่องขาวขอบดำ สูงอย่างน้อย 52 (กดง่ายบนมือถือ) */
const row =
  'flex min-h-[52px] items-center gap-2.5 rounded-[14px] border-[1.5px] border-ink bg-card py-1 pr-2 pl-3.5 text-left text-[13.5px] font-bold text-ink md:text-[14px]'

export function Contact() {
  const { t } = useLang()
  const { openResume } = useResume()
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
    <SectionBand tone="paper" className="pt-[76px] pb-0 md:pt-24 lg:pt-[110px]">
      <Container>
        <section
          id="contact"
          ref={ref}
          className="pop-card relative mb-[52px] flex scroll-mt-10 flex-col gap-6 rounded-[32px] border-2 border-ink bg-yellow px-[18px] pt-[26px] pb-5 shadow-[8px_8px_0_var(--ink)] md:mb-20 md:px-7 md:py-[30px] lg:mb-[104px] lg:flex-row lg:gap-10 lg:p-10"
        >
          {/* สติกเกอร์กัสชูนิ้ว เกาะขอบบนการ์ด — มือถือ/ไอแพดอยู่มุมขวา จอคอมอยู่ราวกลางการ์ด */}
          <img
            src="/stickers/gus-thumbs-animated.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -top-[54px] -right-2.5 h-[84px] w-auto md:-top-16 md:right-[30px] md:h-[100px] lg:-top-[70px] lg:right-[40%] lg:h-[120px]"
          />

          {/* ซ้าย: หัวข้อ + ช่องทางติดต่อ + ปุ่มเรซูเม่ */}
          <div className="flex min-w-0 flex-col gap-3.5 text-center md:text-left lg:flex-1">
            <p className="inline-flex items-center gap-2.5 self-center font-brand text-[12px] font-extrabold tracking-[0.14em] text-ink-2 md:self-start md:text-[12.5px] lg:text-[13px]">
              {chapterNo}
              <span aria-hidden="true" className="h-0.5 w-[26px] bg-ink-2" />
              {t(txt.eyebrowName)}
            </p>
            <h2 className="text-[23px] leading-[1.15] font-extrabold tracking-[-0.01em] text-ink md:text-[31px] lg:text-[40px]">
              {t(txt.t1)}
              <br />
              {t(txt.t2)}
            </h2>
            <p className="text-[14px] leading-[1.7] text-[#3E3B35] md:text-[15px] lg:text-[16px]">{t(txt.body)}</p>

            <div className="flex flex-col gap-2.5 text-left">
              {/* อีเมล — ยาวสุด ถ้าจอแคบมากให้ตัด … ได้ (มีปุ่มคัดลอกกับ mailto อยู่แล้ว) */}
              <div className={row}>
                <MailIcon />
                <a
                  href={`mailto:${profile.email}`}
                  title={profile.email}
                  className="min-w-0 flex-1 truncate hover:underline"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={t(copied ? txt.copied : txt.copyLabel)}
                  className="flex h-11 shrink-0 items-center gap-1.5 rounded-[10px] bg-ink px-3 text-[12.5px] font-bold text-card transition-opacity hover:opacity-85 lg:h-9"
                >
                  <CopyIcon />
                  {t(copied ? txt.copied : txt.copy)}
                </button>
              </div>

              {/* เบอร์ + GitHub: มือถือคนละแถว ไอแพดขึ้นไปวางคู่ — ห้ามตัดข้อความ */}
              <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                <a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`} className={cn(row, 'transition-transform hover:-translate-y-0.5')}>
                  <PhoneIcon />
                  <span className="whitespace-nowrap">{profile.phone}</span>
                </a>
                {github && (
                  <a
                    href={github.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(row, 'transition-transform hover:-translate-y-0.5')}
                  >
                    <GithubIcon />
                    <span className="whitespace-nowrap">{github.handle}</span>
                  </a>
                )}
              </div>

              {/* เรซูเม่ — เปิดป็อปอัป PDF เดียวกับปุ่มเรซูเม่ทุกจุด (design-handoff 7.4) */}
              <button
                type="button"
                onClick={openResume}
                className="flex min-h-16 w-full items-center gap-3 rounded-2xl border-2 border-ink bg-ink px-4 py-2.5 text-left text-card shadow-[4px_4px_0_var(--card),4px_4px_0_2px_var(--ink)] transition-transform hover:-translate-y-0.5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-yellow text-ink">
                  <ResumeIcon size={20} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col leading-[1.3]">
                  <span className="text-[15px] font-bold">{t(txt.resume)}</span>
                  <span className="text-[12px] text-[#C9C3B6]">{t(txt.resumeMeta)}</span>
                </span>
                <ArrowIcon />
              </button>
            </div>
          </div>

          {/* ขวา (จอคอม) / ล่าง (ไอแพด, มือถือ): ฟอร์ม */}
          <div className="min-w-0 rounded-[22px] border-2 border-ink bg-[#FFF5D6] p-4 md:p-[22px] lg:flex-1">
            <ContactForm />
          </div>
        </section>
      </Container>
      {/* footer อยู่ในจอเดียวกับติดต่อ — จอสุดท้ายจบในหน้าเดียว */}
      <Footer compact />
    </SectionBand>
  )
}

/* ---------- ไอคอนเส้น (ตามไฟล์ดีไซน์) ---------- */

function Icon({ size = 18, stroke = 'currentColor', children }: { size?: number; stroke?: string; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {children}
    </svg>
  )
}

function MailIcon() {
  return (
    <Icon>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </Icon>
  )
}

function CopyIcon() {
  return (
    <Icon size={14}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a1 1 0 0 1 1-1h10" />
    </Icon>
  )
}

function PhoneIcon() {
  return (
    <Icon>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1" />
    </Icon>
  )
}

function GithubIcon() {
  return (
    <Icon>
      <path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-1-2.5c3 0 6-1.5 6-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6.2 0C6.6 2.3 5.6 2.6 5.6 2.6a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 9c0 4.5 3 6 6 6a3 3 0 0 0-1 2.5V21" />
    </Icon>
  )
}

function ArrowIcon() {
  return (
    <Icon size={20} stroke="var(--yellow)">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  )
}
