import express, { type NextFunction, type Request, type Response, type Router } from 'express'
import { handleServiceResponse } from '@common/utils/httpHandlers'
import { contactLimiter } from '@common/middleware/rateLimit'
import { contactService } from '@modules/contact/contactService'

export const contactRouter: Router = (() => {
  const router = express.Router()

  /** POST /api/contact — รับข้อความจากฟอร์มติดต่อ */
  router.post(
    '/',
    contactLimiter,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const serviceResponse = await contactService.submit(req.body, req.ip)
        handleServiceResponse(serviceResponse, res)
      } catch (error) {
        next(error)
      }
    },
  )

  return router
})()
