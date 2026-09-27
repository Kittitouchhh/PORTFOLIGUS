import { useContext } from 'react'
import { ResumeContext, type ResumeValue } from '@/contexts/ResumeContext'

export function useResume(): ResumeValue {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume ต้องอยู่ภายใน <ResumeProvider>')
  return ctx
}
