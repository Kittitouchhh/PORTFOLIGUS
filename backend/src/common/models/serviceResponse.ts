import type { ApiErr, ApiOk } from '@portfolio/shared/contact'
import { HTTP_STATUS } from '@common/constants/httpStatus'

export enum ResponseStatus {
  Success,
  Failed,
}

/**
 * ผลลัพธ์มาตรฐานที่ service ทุกตัวส่งกลับให้ router
 *
 * service จะไม่ยุ่งกับ res โดยตรง แค่บอกว่าสำเร็จไหม ข้อความอะไร status เท่าไหร่
 * แล้ว handleServiceResponse ค่อยแปลงเป็น JSON ตามสัญญา ApiOk / ApiErr ที่ฝั่งหน้าเว็บใช้อยู่
 */
export class ServiceResponse<T = null> {
  readonly success: boolean

  constructor(
    status: ResponseStatus,
    readonly message: string,
    readonly responseObject: T,
    readonly statusCode: number,
    readonly code: string = 'error',
    readonly fields?: Record<string, string>,
  ) {
    this.success = status === ResponseStatus.Success
  }

  static success<T>(message: string, responseObject: T, statusCode: number = HTTP_STATUS.OK) {
    return new ServiceResponse<T>(ResponseStatus.Success, message, responseObject, statusCode)
  }

  static failed(
    code: string,
    message: string,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    fields?: Record<string, string>,
  ) {
    return new ServiceResponse<null>(ResponseStatus.Failed, message, null, statusCode, code, fields)
  }

  toJSON(): ApiOk<T> | ApiErr {
    if (this.success) {
      return { ok: true, data: this.responseObject }
    }
    return {
      ok: false,
      error: { code: this.code, message: this.message, fields: this.fields },
    }
  }
}
