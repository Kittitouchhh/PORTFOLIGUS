/** path ของทุกหน้า รวมไว้ที่เดียว navbar กับ router อ้างชุดเดียวกัน */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SKILLS: '/skills',
  PROCESS: '/process',
  WORK: '/work',
  EXPERIENCE: '/experience',
  LEARNING: '/learning',
  CONTACT: '/contact',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
