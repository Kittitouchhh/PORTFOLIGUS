import type { Content } from '@portfolio/shared/content'

export type { Content }

/** ชื่อ section ที่ดึงแยกได้ เช่น projects, skills */
export type ContentSection = keyof Content
