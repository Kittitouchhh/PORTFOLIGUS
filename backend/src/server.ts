import express, { type Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from '@common/utils/envConfig'
import { logger } from '@common/utils/logger'
import { errorHandler, notFoundHandler } from '@common/middleware/errorHandler'
import { API_PREFIX, API_ROUTES } from '@common/constants/apiRoutes'
import { healthRouter } from '@modules/health/healthRouter'
import { contentRouter } from '@modules/content/contentRouter'
import { contactRouter } from '@modules/contact/contactRouter'

export function createApp(): Express {
  const app = express()

  // เชื่อ proxy ชั้นเดียว (reverse proxy / load balancer) เพื่อให้ req.ip ถูกต้อง
  // ไม่ตั้งเป็น true เพราะจะทำให้ปลอม IP ผ่าน header ได้
  app.set('trust proxy', 1)

  app.use(helmet())
  app.use(
    cors({
      origin(origin, callback) {
        // ไม่มี origin = เรียกจาก curl หรือ server-to-server ปล่อยผ่าน
        if (!origin || env.corsOrigins.includes(origin)) {
          callback(null, true)
          return
        }
        logger.warn('ปฏิเสธคำขอข้าม origin', { origin })
        callback(new Error('origin นี้ไม่ได้รับอนุญาต'))
      },
    }),
  )
  app.use(express.json({ limit: '32kb' }))

  app.use(`${API_PREFIX}${API_ROUTES.HEALTH}`, healthRouter)
  app.use(`${API_PREFIX}${API_ROUTES.CONTENT}`, contentRouter)
  app.use(`${API_PREFIX}${API_ROUTES.CONTACT}`, contactRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
