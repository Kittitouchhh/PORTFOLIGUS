/**
 * ⚠️ ชุดจอคอม (≥ 1100px) — โค้ดหน้าตาเดิมก่อน v8 ตามที่เจ้าของขอ (27 ก.ย.) · มือถือ/ไอแพดใช้ไฟล์ v8 ในโฟลเดอร์แม่
 * HomePage เลือกชุดด้วย useIsDesktop() — แก้เนื้อหาต้องแก้ทั้งสองชุด
 */
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
 * 03 — ตัวตน (ดีไซน์ v4)
 * โพลารอยด์ "โหมดเข้าห้องประชุม" + การ์ดนิสัย 4 ใบ กดพลิกได้ · รูปงานจริง (ประวัติการศึกษาย้ายไปอยู่ต่อจากปก → Education.tsx)
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

export function PersonDesktop() {
  const { t } = useLang()
  const ref = useReveal<HTMLElement>()
  const [flipped, setFlipped] = useState<Record<number, boolean>>({})

  return (
    <>
    <SectionBand tone="paper" className="py-12">
    <Container>
      <section id="about" ref={ref} className="reveal scroll-mt-10">
        <div className="grid items-center gap-14 lg:grid-cols-[26rem_minmax(0,1fr)]">
          {/* โพลารอยด์ */}
          <div className="relative mx-auto h-[26rem] w-full max-w-[26rem] sm:h-[31rem]">
            <span aria-hidden="true" className="absolute inset-[40px_30px_30px_20px] -rotate-[4deg] rounded-[40px] border-2 border-ink bg-[#DCE4FB]" />
            <figure className="absolute top-2.5 left-10 flex w-[15rem] -rotate-3 flex-col gap-2.5 rounded-[10px] border-2 border-ink bg-card p-3 pb-4 shadow-[8px_8px_0_var(--ink)] sm:w-[18.75rem]">
              <img src="/photos/portrait-uniform.webp" alt="" className="h-[18rem] w-full rounded object-cover object-[center_16%] sm:h-[21.875rem]" />
              <figcaption className="font-hand text-center text-[20px]">{t(txt.cap)}</figcaption>
            </figure>
            <img src="/stickers/gus-peace.webp" alt="" aria-hidden="true" className="anim-float absolute -right-2.5 -bottom-2.5 w-40 rotate-[8deg] sm:w-48" />
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-brand text-[15px] font-extrabold tracking-[0.12em] text-ink-2">
              04 <span aria-hidden="true" className="chapter-line mx-1" /> {t(txt.eyebrow)}
            </p>
            <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.1] font-bold tracking-[-0.02em]">
              <span className="mark px-1.5">{t(txt.title)}</span>
            </h2>
            <span className="font-hand text-[19px] text-ink-2">{t(txt.flipHint)}</span>
            <Reveal stagger className="grid gap-4 sm:grid-cols-2">
              {TRAITS.map((x, i) => {
                const on = !!flipped[i]
                return (
                  <button
                    key={x.k}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
                    className={cn(
                      'flex min-h-[10.5rem] flex-col items-start gap-2 rounded-[22px] border-2 border-ink px-6 py-5 text-left transition-all duration-300',
                      on
                        ? cn('bg-ink text-page shadow-[5px_5px_0_var(--yellow)]', i % 2 ? 'rotate-[1.5deg]' : '-rotate-[1.5deg]')
                        : cn(x.bg, 'shadow-[5px_5px_0_var(--ink)] hover:-translate-y-1'),
                    )}
                  >
                    {on ? (
                      <span key="b" className="anim-pop flex h-full w-full flex-col gap-2">
                        <span className="text-[16.5px] leading-[1.7]">{t(x.desc)}</span>
                        <span className="font-hand mt-auto text-[16px] opacity-70">{t(txt.back)}</span>
                      </span>
                    ) : (
                      <span key="f" className="flex h-full w-full flex-col gap-2">
                        <span className="font-brand text-[13px] font-extrabold tracking-[0.1em] opacity-70">{x.k}</span>
                        <span className="text-[clamp(1.25rem,2vw,1.55rem)] leading-[1.3] font-bold">{t(x.title)}</span>
                        <span className="font-hand mt-auto text-[16px] opacity-70">{t(txt.flip)}</span>
                      </span>
                    )}
                  </button>
                )
              })}
            </Reveal>
          </div>
        </div>

      </section>
    </Container>
    </SectionBand>

    <SectionBand tone="card" className="pt-12 pb-14 lg:pt-[55px] lg:pb-[60px]">
      <Container>
        <PhotoWall />
      </Container>
    </SectionBand>
    </>
  )
}
