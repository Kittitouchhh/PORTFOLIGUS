import 'dotenv/config'

function str(key: string, fallback: string): string {
  const value = process.env[key]?.trim()
  return value && value.length > 0 ? value : fallback
}

function int(key: string, fallback: number): number {
  const raw = process.env[key]?.trim()
  if (!raw) return fallback
  const parsed = Number.parseInt(raw, 10)
  if (Number.isNaN(parsed)) {
    throw new Error(`ค่า ${key} ต้องเป็นตัวเลข แต่ได้ "${raw}"`)
  }
  return parsed
}

const nodeEnv = str('NODE_ENV', 'development')

export const env = {
  nodeEnv,
  isProd: nodeEnv === 'production',
  port: int('PORT', 4000),

  /** origin ที่อนุญาต — ว่างไว้ = ปิด CORS ทั้งหมด ไม่ใช่เปิดหมด */
  corsOrigins: str('CORS_ORIGINS', 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),

  contactStore: str('CONTACT_STORE', './data/messages.jsonl'),
  contactRate: {
    windowMs: int('CONTACT_RATE_WINDOW_MINUTES', 15) * 60_000,
    max: int('CONTACT_RATE_MAX', 5),
  },
} as const
