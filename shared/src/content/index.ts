import { profile } from './profile'
import { stats } from './stats'
import { skillGroups } from './skills'
import { processSteps } from './process'
import { projects } from './projects'
import { timeline } from './experience'
import { learning } from './learning'

/**
 * เนื้อหาทั้งเว็บรวมเป็นก้อนเดียว
 * backend เสิร์ฟก้อนนี้ผ่าน /api/content
 * frontend ใช้ก้อนนี้เป็นค่าตั้งต้น แล้วค่อยรีเฟรชจาก API
 */
export const content = {
  profile,
  stats,
  skillGroups,
  processSteps,
  projects,
  timeline,
  learning,
}

export type Content = typeof content

/** ชื่อ section ที่ดึงแยกทีละอันได้ */
export const contentSections = Object.keys(content) as (keyof Content)[]

export * from './profile'
export * from './stats'
export * from './skills'
export * from './process'
export * from './projects'
export * from './experience'
export * from './learning'
