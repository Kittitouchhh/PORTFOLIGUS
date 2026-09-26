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
 * จอ 1: ปก B "บัตรพนักงานใบแรก" (Cover.tsx — แทนปกวงกลมเดิมตาม HANDOFF อัปเดต 26 ก.ย.)
 * จอ 2: หัวข้อก้าวต่อ + ตัวเลข 4 ใบ — โผล่ตอนเลื่อนมาถึง (Reveal) · ตามด้วยไทม์ไลน์ + เครื่องมือ
 */

const txt = {
  line1: l('พร้อมก้าวต่อจาก Business Analyst', 'Ready to grow from Business Analyst'),
  line2a: l('สู่ ', 'into '),
  line2b: l('Pre-sales · Solution Consulting · Business Development', 'Pre-sales · Solution Consulting · Business Development'),
  capExp: l('นี่คือประสบการณ์ของผมครับ', 'Here’s my experience so far'),
  scroll2: l('เลื่อนดูงานจริง', 'See the real work'),
  tools: l('เครื่องมือที่ใช้', 'Tools I use'),
  toolsHint: l('ตัวที่ใช้บ่อยสุดอยู่หน้าสุด', 'Most used first'),
}

const STATS: { v: string; suf: L; label: L; bg: string; r: string }[] = [
  { v: '50+', suf: l('คน', 'people'), label: l('ลงพื้นที่หน้างานจริง เก็บ requirement นำเสนอในห้องประชุม และร่วมปิดการขาย', 'met on real work — gathering requirements, presenting in meetings, helping close sales'), bg: 'bg-yellow', r: '-rotate-[1.5deg]' },
  { v: '20+', suf: l('หน้าจอ', 'screens'), label: l('จัดทำ mockup มาแล้วกว่า 20 หน้าจอ พร้อมไดอะแกรม flow เพื่อให้ทีมเห็นภาพตรงกัน', '20-plus mockup screens, with flow diagrams so the team sees the same picture'), bg: 'bg-card', r: 'rotate-1' },
  { v: '40', suf: l('ฟีเจอร์', 'features'), label: l('ที่ได้ร่วมออกแบบ ตั้งแต่รับฟังปัญหาจนส่งมอบให้ทีมพัฒนา', 'designed, from hearing the problem to handing off to dev'), bg: 'bg-[#D9EEEC]', r: '-rotate-1' },
  { v: '1', suf: l('ดีล', 'deal'), label: l('ที่ได้เป็นผู้นำเสนอจนปิดการขายได้ จากหลายดีลที่ได้ร่วมนำเสนอลูกค้า', 'I led and closed myself, out of several sales meetings I joined'), bg: 'bg-[#E5E3F6]', r: 'rotate-[1.5deg]' },
]

/** โลโก้จริงยังไม่มา — `logo` เว้นไว้ใส่ path รูปภายหลัง ถ้ามีจะแสดงแทนตัวย่อ */
const TOOLS: { name: string; ab: string; use: L; color: string; logo?: string }[] = [
  { name: 'Claude Code', ab: 'CC', use: l('ทุกวัน', 'daily'), color: '#D97757' },
  { name: 'Claude Design', ab: 'CD', use: l('ทุกวัน', 'daily'), color: '#D97757' },
  { name: 'HTML', ab: '<>', use: l('mockup', 'mockups'), color: '#E8590C' },
  { name: 'React', ab: 'Re', use: l('หน้าจอ', 'screens'), color: '#2B8FD6' },
  { name: 'TypeScript', ab: 'TS', use: l('หน้าจอ', 'screens'), color: '#2F6FD1' },
  { name: 'Tailwind CSS', ab: 'Tw', use: l('แต่งหน้าจอ', 'styling'), color: '#06B6D4' },
  { name: 'Figma', ab: 'Fi', use: l('ออกแบบ', 'design'), color: '#A259FF' },
  { name: 'Miro', ab: 'Mi', use: l('flow', 'flows'), color: '#E0B000' },
  { name: 'Excel', ab: 'Xl', use: l('ข้อมูล', 'data'), color: '#1F7A45' },
  { name: 'Git', ab: 'Gt', use: l('ส่งงาน', 'shipping'), color: '#E24329' },
]

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

      {/* จอ 3 — ก้าวต่อ + ตัวเลข */}
      <SectionBand tone="paper" className="py-14">
        <Container>
        <Reveal className="flex flex-col items-center justify-center text-center">
          <p className="max-w-[69rem] text-[clamp(1.6rem,3.2vw,2.25rem)] leading-[1.4] font-bold tracking-[-0.01em] text-ink">
            <span className="block">{t(txt.line1)}</span>
            <span className="block">
              {t(txt.line2a)}
              <span className="mark">{t(txt.line2b)}</span>
            </span>
          </p>
          <span className="mt-12 text-[15px] font-semibold text-ink lg:mt-14">{t(txt.capExp)}</span>
          <Reveal as="ul" stagger className="mt-4 grid w-full grid-cols-2 gap-4 text-left lg:grid-cols-4">
            {STATS.map((s) => (
              <li key={s.v} className={cn('flex flex-col gap-2.5 rounded-3xl border-2 border-ink p-5 text-ink shadow-[5px_5px_0_var(--ink)] transition hover:rotate-0 sm:p-6', s.bg, s.r)}>
                <span className="flex items-baseline gap-1.5">
                  <span className="font-brand text-[clamp(2.8rem,5vw,4rem)] leading-none font-extrabold">{s.v}</span>
                  <span className="text-[16px] font-bold">{t(s.suf)}</span>
                </span>
                <span className="text-[15px] leading-snug text-ink">{t(s.label)}</span>
              </li>
            ))}
          </Reveal>
          <button type="button" onClick={() => scrollToSection('work')} className="font-hand mt-12 flex flex-col items-center gap-1 text-[18px] text-ink-2">
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
      <SectionBand tone="card" className="py-12">
        <Container>
          <WorkTimeline />
        </Container>
      </SectionBand>

      {/* จอ 5 — เครื่องมือ แยกจอ จัดกลาง */}
      <SectionBand tone="paper" className="py-14">
        <Container>
          <div className="mx-auto max-w-[76rem]">
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <h2 className="text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.25] font-bold">
              <span className="mark px-1.5">{t(txt.tools)}</span>
            </h2>
            <span className="font-hand text-[18px] text-ink-2">{t(txt.toolsHint)}</span>
          </div>
          <Reveal as="ul" stagger className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-10">
            {TOOLS.map((tool, i) => (
              <li key={tool.name} className={cn('flex flex-col items-center gap-2 rounded-[18px] border-2 border-ink bg-card px-2 pt-4 pb-3.5 shadow-[3px_3px_0_var(--ink)] lg:gap-2.5 lg:rounded-[22px] lg:pt-6 lg:pb-5 lg:shadow-[4px_4px_0_var(--ink)] transition hover:-translate-y-1 hover:rotate-0', i % 2 ? 'rotate-[1.2deg]' : '-rotate-[1.2deg]')}>
                {tool.logo ? (
                  <img src={tool.logo} alt="" className="size-12 lg:size-16 rounded-[14px] border-2 border-ink object-contain" />
                ) : (
                  <span className="font-brand grid size-12 place-items-center rounded-[14px] border-2 border-ink text-[17px] lg:size-16 lg:rounded-[18px] lg:text-[22px] font-extrabold text-white" style={{ background: tool.color }}>
                    {tool.ab}
                  </span>
                )}
                <span className="text-center text-[14px] leading-tight font-bold lg:text-[16px]">{tool.name}</span>
                <span className="text-[11.5px] text-ink-2 lg:text-[13px]">{t(tool.use)}</span>
              </li>
            ))}
          </Reveal>
          </div>
        </Container>
      </SectionBand>
    </section>
  )
}
