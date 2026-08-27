import express, { type Request, type Response, type Router } from 'express'
import { handleServiceResponse } from '@common/utils/httpHandlers'
import { readLimiter } from '@common/middleware/rateLimit'
import { contentService } from '@modules/content/contentService'

export const contentRouter: Router = (() => {
  const router = express.Router()

  router.use(readLimiter)

  /** GET /api/content — เนื้อหาทั้งหมดของเว็บ */
  router.get('/', (_req: Request, res: Response) => {
    handleServiceResponse(contentService.findAll(), res)
  })

  /** GET /api/content/sections — รายชื่อ section ที่ดึงแยกได้ */
  router.get('/sections', (_req: Request, res: Response) => {
    handleServiceResponse(contentService.listSections(), res)
  })

  /** GET /api/content/:section — ดึงทีละส่วน เช่น /api/content/projects */
  router.get<{ section: string }>('/:section', (req: Request<{ section: string }>, res: Response) => {
    handleServiceResponse(contentService.findBySection(req.params.section), res)
  })

  return router
})()
