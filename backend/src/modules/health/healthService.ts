import { ServiceResponse } from '@common/models/serviceResponse'
import { env } from '@common/utils/envConfig'

export const healthService = {
  check: () =>
    ServiceResponse.success('ok', {
      status: 'ok',
      env: env.nodeEnv,
      uptimeSeconds: Math.round(process.uptime()),
    }),
}
