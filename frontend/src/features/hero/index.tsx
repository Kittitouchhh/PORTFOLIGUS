import { Container } from '@/components/layouts/Container'
import { SectionBand } from '@/components/layouts/SectionBand'
import { Reveal } from '@/components/common/Reveal'
import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'
import type { L } from '@portfolio/shared/types'
import { cn } from '@/utils/cn'
import { scrollToSection } from '@/utils/scroll'
import { WorkTimeline } from './WorkTimeline'
import { Cover } from './Cover'
import { Education } from '@/features/person/Education'

/**
 * จอ 1 + จอ 2 ตาม design-handoff
 * จอ 1: ปก B "บัตรพนักงานใบแรก" (Cover.tsx) → ประวัติการศึกษา (Education.tsx)
 * จอ 3: หัวข้อก้าวต่อ + ตัวเลข 4 ใบ (V8*03Stats ท่อนบน) — โผล่ตอนเลื่อนมาถึง (Reveal)
 * จอ 4: ไทม์ไลน์ (WorkTimeline.tsx) · จอ 5: เครื่องมือ 10 ตัว (V8*04Tools)
 * ขนาดหัวข้อ h2: มือถือ 23 · ไอแพด 31 · คอม 40 — มือถือจัดกลางทุกหัวข้อ
 */

const txt = {
  line1: l('พร้อมก้าวต่อจาก Business Analyst', 'Ready to grow from Business Analyst'),
  line2a: l('สู่ ', 'into '),
  line2b: l('Pre-sales · Solution Consulting', 'Pre-sales · Solution Consulting'),
  line2c: l('Business Development', 'Business Development'),
  capExp: l('นี่คือประสบการณ์ของผมครับ', 'Here’s my experience so far'),
  scroll2: l('เลื่อนดูงานจริง', 'See the real work'),
  tools: l('เครื่องมือที่ใช้', 'Tools I use'),
  toolsHint: l('ตัวที่ใช้บ่อยสุดอยู่หน้าสุด', 'Most used first'),
}

const STATS: { v: string; suf: L; label: L; bg: string }[] = [
  { v: '50+', suf: l('คน', 'people'), label: l('ลงพื้นที่หน้างานจริง เก็บ requirement นำเสนอในห้องประชุม และร่วมปิดการขาย', 'met on real work — gathering requirements, presenting in meetings, helping close sales'), bg: 'bg-yellow' },
  { v: '20+', suf: l('หน้าจอ', 'screens'), label: l('จัดทำ mockup มาแล้วกว่า 20 หน้าจอ พร้อมไดอะแกรม flow เพื่อให้ทีมเห็นภาพตรงกัน', '20-plus mockup screens, with flow diagrams so the team sees the same picture'), bg: 'bg-card' },
  { v: '40', suf: l('ฟีเจอร์', 'features'), label: l('ที่ได้ร่วมออกแบบ ตั้งแต่รับฟังปัญหาจนส่งมอบให้ทีมพัฒนา', 'designed, from hearing the problem to handing off to dev'), bg: 'bg-[#D9EEEC]' },
  { v: '1', suf: l('ดีล', 'deal'), label: l('ที่ได้เป็นผู้นำเสนอจนปิดการขายได้ จากหลายดีลที่ได้ร่วมนำเสนอลูกค้า', 'I led and closed myself, out of several sales meetings I joined'), bg: 'bg-[#E5E3F6]' },
]

/** โลโก้จริงยังไม่มา — `logo` เว้นไว้ใส่ path รูปภายหลัง ถ้ามีจะแสดงแทนตัวย่อ · `dark` = ตัวย่อสีดำ (พื้นสีอ่อน) */
const TOOLS: { name: string; ab: string; use: L; color: string; dark?: boolean; logo?: string }[] = [
  { name: 'Claude Code', ab: 'CC', use: l('ทุกวัน', 'daily'), color: '#D97757' },
  { name: 'Claude Design', ab: 'CD', use: l('ทุกวัน', 'daily'), color: '#E8A07F', dark: true },
  { name: 'HTML', ab: '<>', use: l('mockup', 'mockups'), color: '#E4572E' },
  { name: 'React', ab: 'Re', use: l('หน้าจอ', 'screens'), color: '#149ECA' },
  { name: 'TypeScript', ab: 'TS', use: l('หน้าจอ', 'screens'), color: '#3178C6' },
  { name: 'Tailwind CSS', ab: 'Tw', use: l('แต่งหน้าจอ', 'styling'), color: '#06B6D4' },
  { name: 'Figma', ab: 'Fi', use: l('ออกแบบ', 'design'), color: '#A259FF' },
  { name: 'Miro', ab: 'Mi', use: l('flow', 'flows'), color: '#FFD02F', dark: true },
  { name: 'Excel', ab: 'Xl', use: l('ข้อมูล', 'data'), color: '#1D6F42' },
  { name: 'Git', ab: 'Gt', use: l('ส่งงาน', 'shipping'), color: '#F05032' },
]

/** กี่ตัวแรก (ใช้บ่อยสุด) ที่มีป้ายเลขลำดับ */
const RANKED = 2

export function Hero() {
  const { t } = useLang()

  return (
    <section id="top" className="relative scroll-mt-28 overflow-hidden">
      {/* จอ 1 — ปก B บัตรพนักงานใบแรก (snap ชิดบน) */}
      {/* z-20: บัตรห้อยสายยาวลงไปทับแถบ "ประวัติการศึกษา" ด้านล่างได้ */}
      <Container className="relative z-20">
        <Cover />
      </Container>

      {/* จอ 2 — ประวัติการศึกษา (บัตรจากปกห้อยลงมาเกาะช่องซ้าย) */}
      <Education />

      {/* จอ 3 — ก้าวต่อ + ตัวเลข · คอม 4 คอลัมน์ · ไอแพด/มือถือ 2×2 */}
      <SectionBand tone="card" className="pt-11 pb-13 md:pt-[72px] md:pb-20 lg:pt-24 lg:pb-[104px]">
        <Container>
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="max-w-[69rem] text-[23px] leading-[1.32] font-bold tracking-[-0.01em] text-ink md:text-[31px] lg:text-[40px]">
            <span className="block">{t(txt.line1)}</span>
            {/* ไอแพด/มือถือ: Business Development ขึ้นบรรทัดใหม่ · คอม: บรรทัดเดียวคั่นด้วย · */}
            <span className="mark px-1">
              {t(txt.line2a)}
              {t(txt.line2b)}
              <span className="hidden lg:inline"> · </span>
              <br className="lg:hidden" />
              {t(txt.line2c)}
            </span>
          </h2>
          <span className="mt-2 text-[13px] text-ink-2 md:text-[13.5px] lg:text-[14px]">{t(txt.capExp)}</span>
          <Reveal as="ul" stagger className="mt-4 grid w-full grid-cols-2 gap-3 md:mt-[22px] md:gap-4 lg:mt-7 lg:grid-cols-4 lg:gap-5">
            {STATS.map((s) => (
              <li key={s.v} className={cn('flex min-w-0 flex-col items-center gap-2 rounded-[20px] border-2 border-ink px-3 py-3.5 text-center text-ink shadow-[5px_5px_0_var(--ink)] md:items-start md:px-4 md:py-[18px] md:text-left lg:p-[22px]', s.bg)}>
                <span className="flex items-baseline gap-1.5">
                  <span className="font-brand text-[32px] leading-none font-extrabold md:text-[42px] lg:text-[52px]">{s.v}</span>
                  <span className="text-[12px] font-bold md:text-[14px] lg:text-[16px]">{t(s.suf)}</span>
                </span>
                <span className="text-[12px] leading-[1.55] text-[#3E3B35] md:text-[13px] lg:text-[14px]">{t(s.label)}</span>
              </li>
            ))}
          </Reveal>
          <button type="button" onClick={() => scrollToSection('work')} className="font-hand mt-8 flex min-h-11 flex-col items-center justify-center gap-1 text-[16px] text-ink-2 md:mt-10 md:text-[18px]">
            {t(txt.scroll2)}
            <svg className="anim-nudge" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#191816" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </button>
        </Reveal>
        </Container>
      </SectionBand>

      {/* จอ 4 — ไทม์ไลน์ */}
      <SectionBand tone="paper" className="pt-11 pb-13 md:pt-[72px] md:pb-20 lg:pt-24 lg:pb-[104px]">
        <Container>
          <WorkTimeline />
        </Container>
      </SectionBand>

      {/* จอ 5 — เครื่องมือ · คอม 1 แถว 10 ช่อง · ไอแพด/มือถือ 5×2 · 2 ตัวแรกมีป้ายเลข */}
      <SectionBand tone="card" className="pt-11 pb-16 md:pt-[72px] md:pb-24 lg:pt-24 lg:pb-[120px]">
        <Container>
          <div className="flex flex-col gap-4 md:gap-[22px] lg:gap-7">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <h2 className="text-[23px] leading-[1.32] font-bold tracking-[-0.01em] md:text-[31px] lg:text-[40px]">
                <span className="mark px-1">{t(txt.tools)}</span>
              </h2>
              <span className="text-[13px] text-ink-2 md:text-[13.5px] lg:text-[14px]">{t(txt.toolsHint)}</span>
            </div>
            <Reveal as="ul" stagger className="grid grid-cols-5 gap-2 md:gap-3 lg:grid-cols-10">
              {TOOLS.map((tool, i) => (
                <li key={tool.name} className="relative flex min-w-0 flex-col items-center gap-1.5 rounded-2xl border-2 border-ink bg-card px-0.5 pt-2.5 pb-[9px] text-center shadow-[3px_3px_0_var(--ink)] transition hover:-translate-y-1 md:px-1.5 md:pt-3.5 md:pb-3">
                  {i < RANKED && (
                    <span className="absolute -top-[9px] -right-1.5 rounded-full border-[1.5px] border-ink bg-yellow px-[7px] py-px text-[10px] font-extrabold">{i + 1}</span>
                  )}
                  {tool.logo ? (
                    <img src={tool.logo} alt="" className="size-[38px] rounded-xl border-[1.5px] border-ink object-contain md:size-11" />
                  ) : (
                    <span aria-hidden="true" className={cn('font-brand grid size-[38px] place-items-center rounded-xl border-[1.5px] border-ink text-[13px] font-extrabold md:size-11 md:text-[15px]', tool.dark ? 'text-ink' : 'text-card')} style={{ background: tool.color }}>
                      {tool.ab}
                    </span>
                  )}
                  <span className="text-[10.5px] leading-[1.25] font-bold tracking-[-0.01em] [overflow-wrap:anywhere] md:text-[13px]">{tool.name}</span>
                  <span className="text-[11px] text-ink-2">{t(tool.use)}</span>
                </li>
              ))}
            </Reveal>
          </div>
        </Container>
      </SectionBand>
    </section>
  )
}
