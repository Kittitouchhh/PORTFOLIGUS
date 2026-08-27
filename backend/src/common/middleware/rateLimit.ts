import rateLimit from 'express-rate-limit'
import { env } from '@common/utils/envConfig'
import type { ApiErr } from '@portfolio/shared/contact'

const tooMany: ApiErr = {
  ok: false,
  error: {
    code: 'rate_limited',
    message: 'ส่งถี่เกินไป รอสักครู่แล้วลองใหม่นะครับ',
  },
}

/** ฟอร์มติดต่อ — กันคนกดรัวและกันสแปม */
export const contactLimiter = rateLimit({
  windowMs: env.contactRate.windowMs,
  limit: env.contactRate.max,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: tooMany,
})

/** endpoint อ่านอย่างเดียว — ปล่อยหลวมกว่า แค่กันยิงรัว */
export const readLimiter = rateLimit({
  windowMs: 60_000,
  limit: 120,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: tooMany,
})
