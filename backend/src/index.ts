import { createApp } from '@src/server'
import { env } from '@common/utils/envConfig'
import { logger } from '@common/utils/logger'

const app = createApp()

const server = app.listen(env.port, () => {
  logger.info(`API พร้อมใช้งานที่ http://localhost:${env.port}/api`, {
    env: env.nodeEnv,
    corsOrigins: env.corsOrigins,
  })
})

// ปิดให้เรียบร้อยเวลาโดนสั่งหยุด จะได้ไม่ตัดคำขอที่ค้างอยู่
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    logger.info(`ได้รับ ${signal} — กำลังปิดเซิร์ฟเวอร์`)
    server.close(() => process.exit(0))
  })
}
