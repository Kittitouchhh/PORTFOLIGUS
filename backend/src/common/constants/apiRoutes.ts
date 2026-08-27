/** path ของ API ทั้งหมดอยู่ที่เดียว server.ts จะได้ไม่ต้องเขียน string ซ้ำ */
export const API_PREFIX = '/api'

export const API_ROUTES = {
  HEALTH: '/health',
  CONTENT: '/content',
  CONTACT: '/contact',
} as const
