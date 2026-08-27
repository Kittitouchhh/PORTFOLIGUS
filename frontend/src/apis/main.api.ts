import type { ApiResult } from '@portfolio/shared/contact'
import { appConfig } from '@/configs/app.config'

export class ApiError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly fields?: Record<string, string>,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${appConfig.apiBaseUrl}${appConfig.apiPrefix}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })

  let body: ApiResult<T>
  try {
    body = (await res.json()) as ApiResult<T>
  } catch {
    throw new ApiError('bad_response', `เซิร์ฟเวอร์ตอบกลับมาไม่ใช่ JSON (${res.status})`)
  }

  if (!body.ok) {
    throw new ApiError(body.error.code, body.error.message, body.error.fields)
  }

  return body.data
}

export const api = {
  get: <T>(path: string, signal?: AbortSignal) => request<T>(path, { signal }),
  post: <T>(path: string, payload: unknown, signal?: AbortSignal) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(payload), signal }),
}
