import type { ReactNode } from 'react'
import { Section } from '@/components/layouts/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { MockupFrame } from '@/components/ui/MockupFrame'
import { ConfidentialNote } from '@/components/common/ConfidentialNote'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'
import type { Project } from '@portfolio/shared/content'
import { l } from '@/types/i18n.type'
import type { UiKey } from '@/constants/uiText'
import { cn } from '@/utils/cn'

const mockupLabel = l('ภาพจำลอง', 'Mockup')
const caption = l(
  'ภาพร่างที่วาดขึ้นใหม่เพื่อประกอบการเล่า ไม่ใช่หน้าจอจริงของระบบ',
  'A re-drawn wireframe for illustration — not the real system.',
)
const sourceLabel = l('ดูโค้ด', 'View source')

function Block({ labelKey, children }: { labelKey: UiKey; children: ReactNode }) {
  const { tr } = useLang()

  return (
    <div>
      <p className="eyebrow mb-2.5">{tr(labelKey)}</p>
      <div className="text-[15px] leading-relaxed text-ink-2">{children}</div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, tr } = useLang()
  const flip = index % 2 === 1

  return (
    <article className="grid gap-x-14 gap-y-8 border-t border-line py-14 last:border-b lg:grid-cols-2">
      <div className={cn('flex flex-col gap-7', flip && 'lg:order-2')}>
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="num text-sm">{String(index + 1).padStart(2, '0')}</span>
            <Badge tone="dashed">{t(project.context)}</Badge>
            {project.confidential && <Badge>{tr('work.confidential')}</Badge>}
          </div>
          <h3 className="display text-[clamp(1.75rem,4vw,2.75rem)]">{t(project.title)}</h3>
        </div>

        <Block labelKey="work.role">{t(project.role)}</Block>
        <Block labelKey="work.problem">{t(project.problem)}</Block>

        <Block labelKey="work.did">
          <ul className="space-y-2.5">
            {project.contributions.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden="true" className="text-ink-3">
                  —
                </span>
                <span>{t(item)}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block labelKey="work.result">
          <ul className="space-y-2.5">
            {project.outcome.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden="true" className="text-accent">
                  →
                </span>
                <span className="text-ink">{t(item)}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block labelKey="work.stack">
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>
        </Block>

        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer noopener"
            className="pill pill-outline pill-sm self-start"
          >
            {t(sourceLabel)} ↗
          </a>
        )}
      </div>

      <div className={cn(flip && 'lg:order-1')}>
        <div className="lg:sticky lg:top-28">
          <MockupFrame kind={project.mockup} label={t(mockupLabel)} />
          <p className="mt-3 text-[12px] leading-relaxed text-ink-3">{t(caption)}</p>
        </div>
      </div>
    </article>
  )
}

export function Work() {
  const { tr } = useLang()
  const { projects } = useContent()

  return (
    <Section id="work" pattern="crosshatch">
      <SectionHeading
        index={tr('index.work')}
        eyebrow={tr('eyebrow.work')}
        title={tr('section.work.title')}
        desc={tr('section.work.desc')}
      />

      <div className="mb-6">
        <ConfidentialNote />
      </div>

      <div>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  )
}
