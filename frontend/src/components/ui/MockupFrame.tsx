import { cn } from '@/utils/cn'

export type MockupKind = 'dashboard' | 'form' | 'table' | 'flow'

const sk = 'rounded-[2px] bg-ink-3 opacity-30'
const skSoft = 'rounded-[2px] bg-ink-3 opacity-15'
const skInk = 'rounded-[2px] bg-ink opacity-70'
const tray = 'rounded-md border border-line'

/**
 * ภาพประกอบแบบ wireframe วาดด้วย div ล้วน
 * ตั้งใจให้ดูเป็นโครงร่างชัด ๆ จะได้ไม่มีใครเข้าใจผิดว่าเป็นภาพหน้าจอจริง
 */
function Body({ kind }: { kind: MockupKind }) {
  if (kind === 'dashboard') {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className={cn(tray, 'space-y-2 p-3')}>
              <div className={cn(skSoft, 'h-1.5 w-2/3')} />
              <div className={cn(skInk, 'h-3.5 w-1/2')} />
            </div>
          ))}
        </div>
        <div className={cn(tray, 'flex h-24 items-end gap-2 p-3')}>
          {[40, 65, 30, 80, 55, 70, 45].map((h, i) => (
            <div key={i} className={cn(skInk, 'flex-1')} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    )
  }

  if (kind === 'table') {
    return (
      <div className="space-y-2">
        <div className="flex gap-3 px-1 pb-2">
          <div className={cn(sk, 'h-2 w-20')} />
          <div className={cn(skSoft, 'h-2 flex-1')} />
          <div className={cn(skInk, 'h-2 w-12')} />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 border-t border-line px-1 py-3">
            <div className={cn(skSoft, 'h-2 w-20')} />
            <div className={cn(skSoft, 'h-2 flex-1')} />
            <div className={cn(i % 2 === 0 ? skInk : sk, 'h-2 w-12')} />
          </div>
        ))}
      </div>
    )
  }

  if (kind === 'form') {
    return (
      <div className="space-y-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1.5">
            <div className={cn(skSoft, 'h-1.5 w-16')} />
            <div className="h-8 rounded-lg border border-line" />
          </div>
        ))}
        <div className="flex justify-end gap-2 pt-1">
          <div className={cn(sk, 'h-8 w-20 !rounded-full')} />
          <div className={cn(skInk, 'h-8 w-24 !rounded-full')} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 py-8">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex flex-1 items-center gap-2">
          <div className={cn(tray, 'flex-1 space-y-1.5 p-2.5')}>
            <div className={cn(i === 1 ? skInk : skSoft, 'h-1.5 w-full')} />
            <div className={cn(skSoft, 'h-1.5 w-2/3')} />
          </div>
          {i < 3 && <div className={cn(sk, 'h-px w-4 shrink-0 !opacity-100')} />}
        </div>
      ))}
    </div>
  )
}

export function MockupFrame({
  kind,
  label,
  className,
}: {
  kind: MockupKind
  /** ป้ายมุมบน เช่น "ภาพจำลอง" */
  label: string
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('overflow-hidden rounded-2xl border border-line', className)}
      style={{ background: 'var(--page-2)' }}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="eyebrow !text-[10px]">{label}</span>
        <span className="flex gap-1.5">
          <span className="size-1.5 rounded-full bg-ink-3 opacity-40" />
          <span className="size-1.5 rounded-full bg-ink-3 opacity-40" />
          <span className="size-1.5 rounded-full bg-ink-3 opacity-40" />
        </span>
      </div>
      <div className="p-5">
        <Body kind={kind} />
      </div>
    </div>
  )
}
