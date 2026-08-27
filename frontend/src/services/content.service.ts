import type { Content } from '@portfolio/shared/content'
import { api } from '@/apis/main.api'
import { ENDPOINT } from '@/apis/endpoint.api'

export const contentService = {
  fetchAll: (signal?: AbortSignal) => api.get<Content>(ENDPOINT.CONTENT, signal),

  fetchSectionNames: (signal?: AbortSignal) =>
    api.get<string[]>(ENDPOINT.CONTENT_SECTIONS, signal),
}
