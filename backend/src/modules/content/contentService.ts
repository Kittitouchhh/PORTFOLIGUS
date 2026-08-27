import { ServiceResponse } from '@common/models/serviceResponse'
import { HTTP_STATUS } from '@common/constants/httpStatus'
import { contentRepository } from '@modules/content/contentRepository'
import type { Content } from '@modules/content/contentModel'

export const contentService = {
  findAll: () =>
    ServiceResponse.success<Content>('ดึงเนื้อหาทั้งหมดสำเร็จ', contentRepository.findAll()),

  listSections: () =>
    ServiceResponse.success<string[]>(
      'ดึงรายชื่อ section สำเร็จ',
      contentRepository.listSectionNames(),
    ),

  findBySection: (name: string) => {
    if (!contentRepository.isSection(name)) {
      const available = contentRepository.listSectionNames().join(', ')
      return ServiceResponse.failed(
        'not_found',
        `ไม่มี section ชื่อ "${name}" — มีให้เลือก: ${available}`,
        HTTP_STATUS.NOT_FOUND,
      )
    }
    return ServiceResponse.success('ดึง section สำเร็จ', contentRepository.findBySection(name))
  },
}
