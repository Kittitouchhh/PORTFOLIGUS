import type { NextFunction, Request, Response } from 'express'
import { HttpError, sendErr } from '@common/utils/httpHandlers'
import { logger } from '@common/utils/logger'
import { env } from '@common/utils/envConfig'

export function notFoundHandler(req: Request, res: Response) {
  sendErr(res, new HttpError(404, 'not_found', `ไม่มี endpoint ${req.method} ${req.path}`))
}

/**
 * ตัวจับ error ตัวสุดท้าย — ต้องรับครบ 4 พารามิเตอร์ Express ถึงจะรู้ว่าเป็น error handler
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    next(err)
    return
  }

  if (err instanceof HttpError) {
    sendErr(res, err)
    return
  }

  // อะไรที่ไม่ได้ตั้งใจโยน ถือว่าเป็นบั๊ก — log ไว้เต็ม ๆ แต่ไม่ส่งรายละเอียดออกไปข้างนอก
  logger.error('มี error ที่ไม่ได้จัดการ', {
    message: err instanceof Error ? err.message : String(err),
    stack: env.isProd ? undefined : (err as Error)?.stack,
  })

  sendErr(res, new HttpError(500, 'internal_error', 'เกิดข้อผิดพลาดที่ฝั่งเซิร์ฟเวอร์'))
}
