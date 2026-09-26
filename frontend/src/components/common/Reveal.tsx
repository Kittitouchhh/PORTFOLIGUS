import type { ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/utils/cn'

/**
 * ครอบอะไรก็ได้ให้ค่อย ๆ โผล่ตอนเลื่อนมาถึง
 * variant: 'fade' = ขึ้นเฉย ๆ · 'pop' = เด้งขึ้นพร้อมเอียงนิดหน่อย (ใช้กับการ์ดใหญ่)
 * stagger = ลูกข้างในโผล่ทีละตัว
 */
export function Reveal({
  children,
  className,
  variant = 'fade',
  stagger = false,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  variant?: 'fade' | 'pop'
  stagger?: boolean
  as?: 'div' | 'ul' | 'ol' | 'article'
}) {
  const ref = useReveal<HTMLElement>()
  return (
    // @ts-expect-error — ref ของแท็กต่างชนิดกันแต่เป็น HTMLElement ทั้งหมด
    <Tag ref={ref} className={cn(variant === 'pop' ? 'pop-card' : 'reveal', stagger && 'stagger', className)}>
      {children}
    </Tag>
  )
}
