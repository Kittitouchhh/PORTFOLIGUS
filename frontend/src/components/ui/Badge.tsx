import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

const tones = {
  neutral: 'tag',
  solid: 'tag tag-solid',
  dashed: 'tag tag-dash',
} as const

export type BadgeTone = keyof typeof tones

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}) {
  return <span className={cn(tones[tone], className)}>{children}</span>
}
