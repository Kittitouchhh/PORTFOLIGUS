import { useState } from 'react'
import { Container } from '@/components/layouts/Container'
import { Marquee } from '@/components/ui/Marquee'
import { ContactPopup } from '@/components/customs/ContactPopup'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'
import { cn } from '@/utils/cn'
import { CONTACT_ID } from '@/constants/sections'
import { scrollToSection } from '@/utils/scroll'

/** เส้นรอบวงของ path วงกลมข้างล่าง (2πr เมื่อ r = 36) — ใช้ยืดตัวอักษรให้เต็มวงพอดี */
const RING_LENGTH = 226

/**
 * สติกเกอร์กลมหมุนช้า ๆ ที่มุมรูป
 * ตัวอักษรถูกยืดด้วย textLength ให้เต็มวงเสมอ ไม่ว่าคำไทยหรืออังกฤษจะสั้นยาวไม่เท่ากัน
 * ดาวตรงกลางอยู่นอกวงที่หมุน จะได้ตั้งตรงตลอด ไม่หมุนตามจนดูมึน
 */
function SpinSticker({ text }: { text: string }) {
  return (
    <div className="sticker pointer-events-none absolute -bottom-7 -left-7 size-24 border border-line sm:size-28">
      <svg viewBox="0 0 100 100" className="anim-spin-slow absolute inset-0 size-full">
        <defs>
          <path
            id="hero-sticker-ring"
            fill="none"
            d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
          />
        </defs>
        <text fill="currentColor" fontSize="10" fontWeight="600">
          <textPath
            href="#hero-sticker-ring"
            startOffset="0"
            textLength={RING_LENGTH}
            lengthAdjust="spacingAndGlyphs"
          >
            {text}
          </textPath>
        </text>
      </svg>
      <span aria-hidden="true" className="relative text-lg">
        &#10022;
      </span>
    </div>
  )
}

/**
 * รูปหน้าแรก — ใบทางการอย่างเดียว เห็นสีจริงตั้งแต่แรก ไม่ต้องเอาเมาส์ไปชี้
 * กรอบซ้อนเยื้องแบบเดียวกับ Intro ให้รูปดูถูกวางบนหน้ากระดาษ ไม่ใช่ลอย
 * ถ้าไฟล์หาย พาดหัวจะขยายเต็มความกว้างเอง ไม่มีช่องว่างค้าง
 *
 * ทั้งรูปเป็นปุ่ม กดแล้วเด้งนามบัตรช่องทางติดต่อขึ้นมา — และมีป้ายบอกไว้ด้วย
 * เพราะรูปที่กดได้แต่ไม่มีอะไรบอก คนส่วนใหญ่ไม่กด
 */
function Portrait({ alt, onOpen }: { alt: string; onOpen: () => void }) {
  const { tr } = useLang()
  const [failed, setFailed] = useState(false)
  if (failed) return null

  return (
    <div className="relative mx-auto w-[15rem] shrink-0 sm:w-[18rem] lg:mx-0 lg:w-full">
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 border border-ink"
      />

      <button
        type="button"
        onClick={onOpen}
        aria-label={tr('hero.tapPortraitLabel')}
        className="photo-plain group block w-full"
      >
        <img
          src="/hero-portrait.jpg"
          alt={alt}
          width={900}
          height={1120}
          onError={() => setFailed(true)}
          className="aspect-[4/5] w-full object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </button>

      {/* ป้ายบอกใบเล็ก แกว่งเบา ๆ เหมือนแปะไว้ทีหลัง */}
      <span className="anim-wiggle pointer-events-none absolute -top-4 -right-3 flex items-center gap-1.5 rounded-full border border-ink bg-page px-3 py-1.5 text-[12px] font-semibold text-ink shadow-[0_8px_20px_-12px_rgba(0,0,0,0.6)]">
        {tr('hero.tapPortrait')}
        <span aria-hidden="true">&#128075;</span>
      </span>

      <SpinSticker text={tr('hero.stickerRing')} />
    </div>
  )
}

export function Hero() {
  const { t, tr } = useLang()
  const { profile, toolbelt } = useContent()
  const [cardOpen, setCardOpen] = useState(false)

  return (
    <section id="top" className="scroll-mt-28 pt-8 pb-16 sm:pt-14">
      <Container>
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
          <div>
            {/* สถานะสองอย่างที่คนอ่านอยากรู้ก่อนอย่างอื่น: ว่างไหม อยู่ไหน */}
            <p className="eyebrow anim-rise mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-2 text-ink">
                {/* จุดสถานะมีชีพจร — วงแหวนจาง ๆ ผุดออกมาเรื่อย ๆ ให้รู้ว่ายังเปิดรับอยู่จริง */}
                <span aria-hidden="true" className="relative grid size-1.5 place-items-center">
                  <span className="anim-pulse-ring absolute size-1.5 rounded-full bg-accent" />
                  <span className="relative size-1.5 rounded-full bg-accent" />
                </span>
                {t(profile.availability)}
              </span>
              <span aria-hidden="true" className="h-px w-6 bg-line" />
              {t(profile.location)}
            </p>

            {/* บรรทัดคี่เป็นตัวกลวงสลับกับตัวทึบ — ลายเซ็นของธีมนี้
                ขึ้นทีละบรรทัดแบบหน่วงกันนิดหน่อย ให้หน้าแรกเริ่มด้วยจังหวะ ไม่ใช่โผล่มาทั้งก้อน */}
            <h1>
              {profile.headline.lines.map((line, index) => (
                <span
                  key={index}
                  style={{ animationDelay: `${80 + index * 110}ms` }}
                  // w-fit เพื่อให้ hover ติดเฉพาะบนตัวอักษร ไม่ใช่ทั้งบรรทัดที่ว่างอยู่
                  className={cn(
                    'display anim-rise block w-fit text-[clamp(2.5rem,8.5vw,5.75rem)]',
                    index % 2 === 1 && 'display-outline',
                  )}
                >
                  {t(line)}
                </span>
              ))}
            </h1>

            {/* ตำแหน่งที่เหลือมาอยู่ตรงนี้ ไม่เอาขึ้นพาดหัวให้รก */}
            <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-ink-2">
              {profile.roles.map((role, index) => (
                <li key={index} className="flex items-center gap-3">
                  {index > 0 && (
                    <span aria-hidden="true" className="size-1 rounded-full bg-ink-3" />
                  )}
                  {t(role)}
                </li>
              ))}
            </ul>

            {/* คติประจำใจ — ยกเป็นคำคมมีเส้นคาดหน้า ไม่ใช่ย่อหน้าธรรมดาที่ตากวาดผ่าน */}
            <p className="anim-rise mt-6 max-w-xl border-l-2 border-accent pl-4 font-display text-[clamp(1.05rem,2.2vw,1.35rem)] leading-snug font-semibold text-ink">
              {t(profile.tagline)}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToSection(CONTACT_ID)}
                className="pill pill-solid"
              >
                {tr('hero.cta.contact')}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('work')}
                className="pill pill-outline"
              >
                {tr('hero.cta.work')}
              </button>
            </div>

            <p className="eyebrow mt-10 hidden items-center gap-2 lg:flex">
              <span aria-hidden="true" className="anim-nudge inline-block">
                &#8595;
              </span>
              {tr('hero.scroll')}
            </p>
          </div>

          <Portrait alt={t(profile.fullName)} onOpen={() => setCardOpen(true)} />
        </div>
      </Container>

      {/* แถบเครื่องมือ — พื้นสว่างเต็มความกว้าง ตัดกับหน้าที่เหลือ
          ป้ายกำกับอยู่คนละบรรทัดกับตัววิ่ง ไม่งั้นขอบที่ไล่จางจะกินคำจนอ่านไม่ออก */}
      <div className="mt-16 bg-invert-bg py-7 text-invert-fg">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase opacity-60">
              {tr('hero.toolbelt')}
            </p>
            <p className="text-[11px] opacity-45">{tr('hero.toolbeltHint')}</p>
          </div>
        </Container>

        {/* ใช้ font-display แทนคลาส .display เพราะคลาสนั้นบังคับสีตัวอักษรเป็น --ink
            ซึ่งบนแถบพื้นสว่างจะกลายเป็นสว่างบนสว่าง อ่านไม่ออก
            ของที่เป็นโปรแกรม/ภาษาให้ตัวหนา ส่วนวิธีทำงานให้จางลงหน่อย จะได้ไม่เป็นพรืดเดียว */}
        <Marquee
          className="mt-4"
          items={toolbelt}
          keyOf={(item) => item.name}
          speed={38}
          renderItem={(item) => (
            <span className="flex items-center gap-6 px-6">
              <span
                className={cn(
                  'tool-chip font-display text-[clamp(1rem,2vw,1.35rem)] whitespace-nowrap',
                  item.kind === 'tool' ? 'font-bold' : 'font-medium opacity-60',
                )}
              >
                {item.name}
              </span>
              <span aria-hidden="true" className="text-[0.55em] opacity-40">
                &#9670;
              </span>
            </span>
          )}
        />
      </div>

      <ContactPopup open={cardOpen} onClose={() => setCardOpen(false)} />
    </section>
  )
}
