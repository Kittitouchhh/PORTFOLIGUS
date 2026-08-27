import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

/** กล่องเรียบ ๆ เส้นบาง ไม่มีเงา — ธีมนี้ใช้เส้นแทนกล่องทึบ */
export function Card({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('rounded-2xl border border-line p-6 sm:p-8', className)}>
      {children}
    </div>
  )
}
