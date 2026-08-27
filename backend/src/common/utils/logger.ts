import { env } from '@common/utils/envConfig'

type Level = 'info' | 'warn' | 'error'

const prefix: Record<Level, string> = {
  info: 'INFO ',
  warn: 'WARN ',
  error: 'ERROR',
}

/**
 * logger เล็ก ๆ พอใช้งาน
 * production พิมพ์เป็น JSON บรรทัดเดียว เพื่อให้เครื่องมือรวม log อ่านได้
 */
function write(level: Level, message: string, meta?: Record<string, unknown>) {
  const time = new Date().toISOString()

  if (env.isProd) {
    console[level === 'info' ? 'log' : level](
      JSON.stringify({ time, level, message, ...meta }),
    )
    return
  }

  const tail = meta && Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : ''
  console[level === 'info' ? 'log' : level](
    `${time} ${prefix[level]} ${message}${tail}`,
  )
}

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => write('info', message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => write('warn', message, meta),
  error: (message: string, meta?: Record<string, unknown>) => write('error', message, meta),
}
