import express, { type Request, type Response, type Router } from 'express'
import { handleServiceResponse } from '@common/utils/httpHandlers'
import { healthService } from '@modules/health/healthService'

export const healthRouter: Router = (() => {
  const router = express.Router()

  /** GET /api/health — ให้ตัวตรวจสุขภาพเรียก ไม่จำกัดจำนวนครั้ง */
  router.get('/', (_req: Request, res: Response) => {
    handleServiceResponse(healthService.check(), res)
  })

  return router
})()
