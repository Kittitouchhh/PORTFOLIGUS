import { randomUUID } from 'node:crypto'
import { validateContact } from '@portfolio/shared/contact'
import { ServiceResponse } from '@common/models/serviceResponse'
import { HTTP_STATUS } from '@common/constants/httpStatus'
import { logger } from '@common/utils/logger'
import { contactRepository } from '@modules/contact/contactRepository'
import type {
  ContactPayload,
  StoredMessage,
  SubmitContactResult,
} from '@modules/contact/contactModel'

export const contactService = {
  submit: async (input: Partial<ContactPayload>, ip?: string) => {
    // ช่องล่อบอท: คนจริงมองไม่เห็นช่องนี้ ถ้ามีค่าแปลว่าเป็นบอท
    // ตอบเหมือนสำเร็จ จะได้ไม่บอกบอทว่าโดนจับได้
    if (input.website && input.website.trim().length > 0) {
      logger.warn('ฟอร์มติดต่อ: ตกกับดัก honeypot', { ip })
      return ServiceResponse.success<SubmitContactResult>(
        'รับข้อความแล้ว',
        { id: 'ignored' },
        HTTP_STATUS.CREATED,
      )
    }

    const errors = validateContact(input)
    if (Object.keys(errors).length > 0) {
      // ส่งข้อความอังกฤษกลับไปเป็นค่ากลาง frontend มีข้อความไทยของตัวเองอยู่แล้ว
      const fields = Object.fromEntries(
        Object.entries(errors).map(([field, text]) => [field, text.en]),
      )
      return ServiceResponse.failed(
        'validation_failed',
        'ข้อมูลในฟอร์มยังไม่ถูกต้อง',
        HTTP_STATUS.BAD_REQUEST,
        fields,
      )
    }

    const stored: StoredMessage = {
      id: randomUUID(),
      receivedAt: new Date().toISOString(),
      name: input.name!.trim(),
      email: input.email!.trim(),
      message: input.message!.trim(),
      ip,
    }

    try {
      await contactRepository.save(stored)
    } catch (ex) {
      logger.error('ฟอร์มติดต่อ: บันทึกข้อความไม่สำเร็จ', {
        message: (ex as Error).message,
      })
      return ServiceResponse.failed(
        'internal_error',
        'เกิดข้อผิดพลาดที่ฝั่งเซิร์ฟเวอร์',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      )
    }

    logger.info('ฟอร์มติดต่อ: รับข้อความใหม่', { id: stored.id, email: stored.email })

    return ServiceResponse.success<SubmitContactResult>(
      'ส่งข้อความสำเร็จ',
      { id: stored.id },
      HTTP_STATUS.CREATED,
    )
  },
}
