import { content, contentSections } from '@portfolio/shared/content'
import type { Content, ContentSection } from '@modules/content/contentModel'

/**
 * เนื้อหาเป็นไฟล์ TypeScript ใน shared/ ไม่ได้อยู่ในฐานข้อมูล
 * เหตุผล: แก้ผ่าน pull request ได้ ตรวจสอบย้อนหลังได้จาก git
 * และไม่ต้องดูแล DB สำหรับข้อมูลที่เปลี่ยนเดือนละครั้ง
 *
 * ถ้าวันหนึ่งย้ายไปเก็บใน DB จริง ให้แก้แค่ไฟล์นี้ไฟล์เดียว
 */
export const contentRepository = {
  findAll: (): Content => content,

  findBySection: (name: ContentSection): Content[ContentSection] => content[name],

  listSectionNames: (): string[] => [...contentSections],

  isSection: (name: string): name is ContentSection =>
    (contentSections as readonly string[]).includes(name),
}
