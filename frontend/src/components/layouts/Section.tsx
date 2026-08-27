import type { ReactNode } from 'react'
import { Container } from './Container'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/utils/cn'

/** ลายจาง ๆ บนพื้นกระดาษ — ดูค่าที่ index.css */
export type SectionPattern = 'dots' | 'blueprint' | 'hatch' | 'crosshatch'

export function Section({
  id,
  children,
  className,
  pattern,
  bleed = false,
  divided = true,
}: {
  id: string
  children: ReactNode
  className?: string
  /** ไม่ใส่ = พื้นเรียบ ไม่มีลาย */
  pattern?: SectionPattern
  /** true = ไม่ครอบ Container ให้ (section จัดการความกว้างเอง) */
  bleed?: boolean
  /** เส้นคั่นบางบนหัว section */
  divided?: boolean
}) {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'reveal scroll-mt-28 py-20 sm:py-28',
        pattern && `pattern-${pattern}`,
        className,
      )}
    >
      {bleed ? (
        children
      ) : (
        <Container>
          {divided && <div className="rule mb-14" />}
          {children}
        </Container>
      )}
    </section>
  )
}
