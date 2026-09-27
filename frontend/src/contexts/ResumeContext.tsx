import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react'
import { ResumeModal } from '@/components/customs/ResumeModal'

/**
 * ปุ่มเรซูเม่ทุกจุด (แถบบน · เมนูมือถือ · แถบเมนูซ้าย · ปุ่มลอยขวาบน · การ์ดติดต่อ)
 * เปิดป็อปอัปเดียวกันผ่าน context นี้ — design-handoff 7.4
 */
export type ResumeValue = { openResume: () => void }

export const ResumeContext = createContext<ResumeValue | null>(null)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openResume = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  const value = useMemo(() => ({ openResume }), [openResume])

  return (
    <ResumeContext.Provider value={value}>
      {children}
      <ResumeModal open={open} onClose={close} />
    </ResumeContext.Provider>
  )
}
