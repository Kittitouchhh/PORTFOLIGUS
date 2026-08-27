import { useContext } from 'react'
import { ContentContext, type ContentValue } from '@/contexts/ContentContext'

export function useContent(): ContentValue {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent ต้องอยู่ภายใน <ContentProvider>')
  return ctx
}
