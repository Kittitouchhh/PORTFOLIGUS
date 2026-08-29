/**
 * ทั้งเว็บเหลือหน้าเดียวแล้ว — หัวข้อต่าง ๆ อยู่ที่ constants/sections.ts
 * ที่นี่เก็บไว้แค่ path จริงที่ router รู้จัก
 */
export const ROUTES = {
  HOME: '/',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
