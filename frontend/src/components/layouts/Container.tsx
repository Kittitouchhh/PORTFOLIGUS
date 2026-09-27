import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    // มือถือ padding 20 · ไอแพด 40 · จอคอม 88 (เว้นที่ให้แถบเมนูซ้าย) · เนื้อหากว้างสุด 1264 — design-handoff 7.1
    <div className={cn('mx-auto w-full max-w-[90rem] px-5 md:px-10 lg:px-[88px]', className)}>
      {children}
    </div>
  )
}
