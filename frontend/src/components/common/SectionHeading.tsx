import type { ReactNode } from 'react'

export function SectionHeading({
  index,
  eyebrow,
  title,
  desc,
}: {
  /** ลำดับ section เช่น "02" */
  index?: string
  eyebrow?: string
  title: string
  desc?: ReactNode
}) {
  return (
    <header className="mb-14 grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-end">
      <div>
        {(index || eyebrow) && (
          <p className="eyebrow mb-5 flex items-center gap-3">
            {index && <span className="num text-sm">{index}</span>}
            {index && eyebrow && <span aria-hidden="true" className="h-px w-8 bg-line" />}
            {eyebrow}
          </p>
        )}
        <h2 className="display text-[clamp(2.25rem,7vw,4.5rem)]">{title}</h2>
      </div>

      {desc && (
        <p className="text-[15px] leading-relaxed text-ink-2 lg:pb-3">{desc}</p>
      )}
    </header>
  )
}
