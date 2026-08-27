import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { content as bundledContent, type Content } from '@portfolio/shared/content'
import { contentService } from '@/services/content.service'
import type { ContentSource } from '@/types/content.type'

export type ContentValue = Content & { source: ContentSource }

export const ContentContext = createContext<ContentValue | null>(null)

/**
 * เนื้อหาที่ build ติดมากับหน้าเว็บถูกใช้เป็นค่าตั้งต้นทันที
 * แล้วค่อยขอตัวล่าสุดจาก API มาทับทีหลัง
 *
 * ทำแบบนี้เพราะพอร์ตโฟลิโอต้องไม่มีวันขึ้นหน้าว่างหรือหมุนรอ
 * ต่อให้ backend ล่มก็ยังอ่านได้ครบ แค่เนื้อหาเป็นรุ่นที่ build ไว้
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content>(bundledContent)
  const [source, setSource] = useState<ContentSource>('bundled')

  useEffect(() => {
    const controller = new AbortController()

    contentService
      .fetchAll(controller.signal)
      .then((fresh) => {
        setContent(fresh)
        setSource('api')
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setSource('unreachable')
        console.warn('ดึงเนื้อหาจาก API ไม่ได้ ใช้ตัวที่ build ไว้แทน', error)
      })

    return () => controller.abort()
  }, [])

  const value = useMemo<ContentValue>(() => ({ ...content, source }), [content, source])

  return <ContentContext value={value}>{children}</ContentContext>
}
