/**
 * path ของ API ทุกเส้นที่หน้าเว็บเรียก
 * ต้องตรงกับ backend/src/common/constants/apiRoutes.ts
 */
export const ENDPOINT = {
  HEALTH: '/health',
  CONTENT: '/content',
  CONTENT_SECTIONS: '/content/sections',
  CONTACT: '/contact',
} as const
