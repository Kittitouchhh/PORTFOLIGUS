/**
 * status code ที่โปรเจกต์นี้ใช้จริง
 * แยกเป็นค่าคงที่เพื่อให้ service อ่านง่ายกว่าเลขลอย ๆ
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const

export type HttpStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS]
