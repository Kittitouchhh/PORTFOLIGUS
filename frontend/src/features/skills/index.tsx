import { Section } from '@/components/layouts/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'
import type { SkillLevel } from '@portfolio/shared/content'
import type { UiKey } from '@/constants/uiText'
import { cn } from '@/utils/cn'

const levelKey: Record<SkillLevel, UiKey> = {
  core: 'skills.level.core',
  working: 'skills.level.working',
  learning: 'skills.level.learning',
}

/** ระดับต่างกันด้วยน้ำหนักและเส้น ไม่ใช้สี — ธีมนี้ขาวดำ */
const levelMark: Record<SkillLevel, string> = {
  core: 'tag tag-solid',
  working: 'tag',
  learning: 'tag tag-dash',
}

const levels = Object.keys(levelMark) as SkillLevel[]

export function Skills() {
  const { t, tr } = useLang()
  const { skillGroups } = useContent()

  return (
    <Section id="skills" pattern="blueprint">
      <SectionHeading
        index={tr('index.skills')}
        eyebrow={tr('eyebrow.skills')}
        title={tr('section.skills.title')}
        desc={tr('section.skills.desc')}
      />

      <ul className="mb-12 flex flex-wrap gap-2">
        {levels.map((level) => (
          <li key={level} className={levelMark[level]}>
            {tr(levelKey[level])}
          </li>
        ))}
      </ul>

      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-2">
        {skillGroups.map((group) => (
          <section key={group.id}>
            <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-line pb-4">
              <h3 className="display text-2xl">{t(group.title)}</h3>
              <span className="num text-sm">{group.skills.length}</span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-ink-3">{t(group.desc)}</p>

            <ul>
              {group.skills.map((skill, index) => (
                <li
                  key={index}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line py-3.5"
                >
                  <span className="text-[15px] font-medium text-ink">{t(skill.name)}</span>
                  <span className={cn(levelMark[skill.level], 'ml-auto !px-2.5 !py-0.5 !text-[11px]')}>
                    {tr(levelKey[skill.level])}
                  </span>
                  {skill.note && (
                    <span className="basis-full text-[13px] text-ink-3">{t(skill.note)}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  )
}
