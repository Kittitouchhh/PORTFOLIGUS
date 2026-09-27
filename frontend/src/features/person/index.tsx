import { useState } from 'react'
import { Container } from '@/components/layouts/Container'
import { SectionBand } from '@/components/layouts/SectionBand'
import { Reveal } from '@/components/common/Reveal'
import { useLang } from '@/hooks/useLang'
import { useReveal } from '@/hooks/useReveal'
import { l } from '@/types/i18n.type'
import type { L } from '@portfolio/shared/types'
import { cn } from '@/utils/cn'
import { PhotoWall } from './PhotoWall'

/**
 * 04 — ตัวตน (ดีไซน์ v8 · V8*08About)
 * จอคอม/ไอแพด: โพลารอยด์ "โหมดเข้าห้องประชุม" เอียง + สติกเกอร์ชูสองนิ้ว ซ้าย / การ์ดนิสัย 2×2 กดพลิกได้ ขวา
 * มือถือ: หัวข้อกลาง → รูปกลาง → การ์ด 2×2
 * ต่อด้วยแถบดำ "รูปจากงานจริง" (PhotoWall) · ประวัติการศึกษาอยู่ต่อจากปก → Education.tsx
 */

const TRAITS: { k: string; title: L; desc: L; bg: string }[] = [
  { k: 'EXPERIENCE', title: l('เคยทำงานจริง ลงหน้างานจริง', 'Real work, real sites'), desc: l('ไม่ได้มีเพียงความรู้ในห้องเรียน — มีประสบการณ์ทั้งในโรงงาน ในสำนักงาน และในห้องประชุมกับลูกค้าจริง', 'Not just classroom knowledge — I’ve stood on factory floors, in offices, and in meeting rooms with real clients'), bg: 'bg-card' },
  { k: 'RESPONSIBLE', title: l('มีความรับผิดชอบ ตั้งใจทำงาน', 'Responsible and committed'), desc: l('รับผิดชอบงานที่ได้รับมอบหมายจนสำเร็จ และแจ้งอย่างตรงไปตรงมาเสมอหากมีสิ่งใดยังไม่พร้อม', 'Work I take on is mine — I see it through, and always say plainly if something isn’t ready'), bg: 'bg-[#D9EEEC]' },
  { k: 'CURIOUS', title: l('กล้าลอง ไม่กลัวสิ่งใหม่', 'Not afraid of new things'), desc: l('เครื่องมือใหม่ งานใหม่ บทบาทใหม่ — พร้อมลงมือทำ และเรียนรู้ไปพร้อมกัน', 'New tools, new work, new roles — I try first and learn along the way'), bg: 'bg-[#E5E3F6]' },
  { k: 'GROWTH', title: l('กล้าผิดพลาด แล้วปรับปรุง', 'Willing to fail and improve'), desc: l('เมื่อผิดพลาดก็ยอมรับ วิเคราะห์หาสาเหตุ แก้ไข และปรับปรุงให้ดีขึ้นในครั้งต่อไป', 'When I’m wrong I own it, find the cause, fix it, and do better next time'), bg: 'bg-[#FDE6DC]' },
]

const txt = {
  eyebrow: l('ตัวตน', 'About me'),
  title: l('ประสบการณ์ของผมครับบ', 'A bit about me'),
  flipHint: l('กดที่การ์ดเพื่อพลิกดู ↓', 'Tap a card to flip it ↓'),
  flip: l('พลิก ↻', 'Flip ↻'),
  back: l('กลับ ↺', 'Back ↺'),
  cap: l('โหมดเข้าห้องประชุม', 'Meeting mode'),
}

export function Person() {
  const { t } = useLang()
  const ref = useReveal<HTMLElement>()
  const [flipped, setFlipped] = useState<Record<number, boolean>>({})

  const head = (
    <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
      <p className="font-brand text-[12px] font-extrabold tracking-[0.14em] text-ink-2 md:text-[12.5px] lg:text-[13px]">
        04 <span aria-hidden="true" className="chapter-line mx-1" /> {t(txt.eyebrow)}
      </p>
      <h2 className="text-[23px] leading-[1.32] font-bold tracking-[-0.01em] md:text-[31px] lg:text-[40px]">
        <span className="mark px-1">{t(txt.title)}</span>
      </h2>
      <span className="font-hand text-[15px] text-ink-2 md:text-[16px] lg:text-[17px]">{t(txt.flipHint)}</span>
    </div>
  )

  return (
    <>
    <SectionBand tone="paper" className="py-11 md:pt-[72px] md:pb-20 lg:pt-24 lg:pb-[104px]">
    <Container>
      <section id="about" ref={ref} className="reveal flex scroll-mt-10 flex-col gap-4 md:flex-row md:items-center md:gap-12 lg:gap-20">
        {/* มือถือ: หัวข้ออยู่บนรูป */}
        <div className="md:hidden">{head}</div>

        {/* โพลารอยด์ */}
        <div className="flex justify-center pt-2 pb-[18px] md:p-0">
          <div className="relative w-[210px] shrink-0 md:w-[250px] lg:w-[330px]">
            <figure className="relative m-0 -rotate-3 rounded-md border-2 border-ink bg-card p-3 pb-11 shadow-[6px_6px_0_var(--ink)]">
              <img
                src="/photos/portrait-uniform.webp"
                alt={t(l('กัส ชุดนักศึกษา', 'Gus in student uniform'))}
                className="block h-[247px] w-full object-cover object-[center_18%] md:h-[295px] lg:h-[389px]"
              />
              <figcaption className="font-hand absolute inset-x-0 bottom-3 text-center text-[16px]">{t(txt.cap)}</figcaption>
            </figure>
            <img
              src="/stickers/gus-peace.webp"
              alt=""
              aria-hidden="true"
              className="anim-float pointer-events-none absolute -right-9 -bottom-6 h-[115px] md:-right-10 md:h-[137px] lg:h-[181px]"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div className="hidden md:block">{head}</div>
          <Reveal stagger className="grid grid-cols-2 gap-2.5 md:gap-4">
            {TRAITS.map((x, i) => {
              const on = !!flipped[i]
              return (
                <button
                  key={x.k}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
                  className={cn(
                    'flex min-h-[170px] min-w-0 flex-col items-start gap-2 rounded-[18px] border-2 border-ink p-3 text-left transition-all duration-300 md:min-h-[150px] md:p-4',
                    on
                      ? cn('bg-ink text-card shadow-[4px_4px_0_var(--yellow)]', i % 2 ? 'rotate-[1.5deg]' : '-rotate-[1.5deg]')
                      : cn(x.bg, 'shadow-[4px_4px_0_var(--ink)] hover:-translate-y-1'),
                  )}
                >
                  {on ? (
                    <span key="b" className="anim-pop flex h-full w-full flex-col gap-2">
                      <span className="font-brand text-[11px] font-extrabold tracking-[0.12em] text-yellow">{x.k}</span>
                      <span className="text-[12px] leading-[1.6] text-[#E9E4DA] md:text-[13.5px] lg:text-[14px]">{t(x.desc)}</span>
                      <span className="mt-auto text-[12px] font-bold text-yellow">{t(txt.back)}</span>
                    </span>
                  ) : (
                    <span key="f" className="flex h-full w-full flex-col gap-2">
                      <span className="font-brand text-[11px] font-extrabold tracking-[0.12em] text-ink-2">{x.k}</span>
                      <span className="text-[14.5px] leading-[1.4] font-bold md:text-[17px]">{t(x.title)}</span>
                      <span className="mt-auto text-[12px] font-bold text-ink-2">{t(txt.flip)}</span>
                    </span>
                  )}
                </button>
              )
            })}
          </Reveal>
        </div>
      </section>
    </Container>
    </SectionBand>

    <SectionBand tone="dark" className="py-11 md:pt-[72px] md:pb-20 lg:pt-24 lg:pb-[104px]">
      <Container>
        <PhotoWall />
      </Container>
    </SectionBand>
    </>
  )
}
