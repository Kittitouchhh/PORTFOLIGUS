import type { Response } from 'express'
import type { ApiErr } from '@portfolio/shared/contact'
import type { ServiceResponse } from '@common/models/serviceResponse'
import { HTTP_STATUS } from '@common/constants/httpStatus'

/** error ที่ตั้งใจโยน — มี status code ติดมาด้วย */
export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly fields?: Record<string, string>,
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

export const badRequest = (code: string, message: string, fields?: Record<string, string>) =>
  new HttpError(HTTP_STATUS.BAD_REQUEST, code, message, fields)

export const notFound = (message: string) =>
  new HttpError(HTTP_STATUS.NOT_FOUND, 'not_found', message)

/** ทางเดียวที่ router ใช้ตอบกลับ — รับ ServiceResponse จาก service แล้วเขียนลง res */
export function handleServiceResponse(serviceResponse: ServiceResponse<unknown>, res: Response) {
  res.status(serviceResponse.statusCode).json(serviceResponse.toJSON())
}

/** ใช้เฉพาะชั้น middleware ที่ยังไม่มี ServiceResponse ในมือ เช่น errorHandler */
export function sendErr(res: Response, error: HttpError) {
  const body: ApiErr = {
    ok: false,
    error: { code: error.code, message: error.message, fields: error.fields },
  }
  res.status(error.status).json(body)
}
