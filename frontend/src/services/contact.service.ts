import type { ContactPayload } from '@portfolio/shared/contact'
import { api } from '@/apis/main.api'
import { ENDPOINT } from '@/apis/endpoint.api'

export const contactService = {
  submit: (payload: ContactPayload, signal?: AbortSignal) =>
    api.post<{ id: string }>(ENDPOINT.CONTACT, payload, signal),
}
