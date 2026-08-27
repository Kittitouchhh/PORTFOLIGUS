import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'

const copy = l(
  'งานนี้อยู่ภายใต้ข้อตกลงรักษาความลับ เนื้อหาด้านล่างเล่าเฉพาะบทบาทและวิธีทำงานของผม ไม่มีชื่อระบบจริง ชื่อลูกค้า ภาพหน้าจอจริง หรือซอร์สโค้ดใด ๆ',
  'This work is under a confidentiality agreement. What follows describes only my role and how I worked — no real system names, client names, screenshots, or source code.',
)

export function ConfidentialNote() {
  const { t } = useLang()

  return (
    <p className="flex max-w-3xl gap-4 border-l-2 border-accent py-1 pl-5 text-xs leading-relaxed text-ink-3">
      {t(copy)}
    </p>
  )
}
