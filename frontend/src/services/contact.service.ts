import type { ContactPayload } from '@portfolio/shared/contact'
import { appConfig } from '@/configs/app.config'

/** error ที่ฟอร์มแปลเป็นข้อความให้ผู้ใช้ได้ — code: rate_limited · too_many_links · duplicate · send_failed · not_configured */
export class ContactError extends Error {
  constructor(
    readonly code: string,
    message: string,
  ) {
    super(message)
    this.name = 'ContactError'
  }
}

/**
 * ส่งฟอร์มติดต่อตรงจากเบราว์เซอร์ไป Web3Forms → อีเมลเข้ากล่องเจ้าของ (ไม่มี backend)
 * key (VITE_WEB3FORMS_ACCESS_KEY) ออกแบบให้เปิดเผยในหน้าเว็บได้ — ทำได้แค่ส่งเมลเข้ากล่องที่ผูกไว้
 *
 * กันสแปมก่อนส่งทุกครั้ง (spamGuard ด้านล่าง) — บอทที่จับได้จะ "ทำเหมือนส่งสำเร็จ" แต่ไม่ส่งจริง
 * จะได้ไม่รู้ว่าโดนจับ ส่วนคนจริงที่ส่งถี่/ส่งซ้ำ/ใส่ลิงก์เยอะจะเห็นข้อความเตือน
 */
const WEB3FORMS_URL = 'https://api.web3forms.com/submit'

/** กรอกเร็วกว่านี้ (นับจากเปิดฟอร์ม) = บอท — คนจริงพิมพ์ชื่อ อีเมล ข้อความไม่ทันใน 3 วินาที */
const MIN_FILL_MS = 3000
/** ลิงก์ในข้อความเกินนี้ = สแปมโฆษณา */
const MAX_LINKS = 2
/** เว้นระยะระหว่างการส่งแต่ละครั้ง และจำนวนครั้งสูงสุดต่อชั่วโมง (ต่อเบราว์เซอร์) */
const COOLDOWN_MS = 60_000
const MAX_PER_HOUR = 3
const LOG_KEY = 'contact-sent-log'

type SentLog = { at: number[]; last?: string }

const readLog = (): SentLog => {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY) ?? '') as SentLog
  } catch {
    return { at: [] }
  }
}
const writeLog = (log: SentLog) => {
  try {
    localStorage.setItem(LOG_KEY, JSON.stringify(log))
  } catch {
    /* โหมดส่วนตัว/ปิด storage — ข้ามไป ด่านอื่นยังทำงาน */
  }
}
/** ลายนิ้วมือของข้อความ ไว้จับการส่งข้อความเดิมซ้ำ */
const fingerprint = (p: ContactPayload) => `${p.email.trim().toLowerCase()}|${p.message.trim().replace(/\s+/g, ' ')}`

/** คืน 'bot' = เงียบ ๆ ทำเหมือนสำเร็จ · โยน ApiError = แจ้งผู้ใช้ · ผ่าน = undefined */
function spamGuard(p: ContactPayload, startedAt: number): 'bot' | undefined {
  // 1) ช่องล่อบอท (ซ่อนจากคนจริง) ถูกกรอก
  if (p.website?.trim()) return 'bot'
  // 2) กรอกเร็วผิดมนุษย์
  if (Date.now() - startedAt < MIN_FILL_MS) return 'bot'
  // 3) ลิงก์เยอะ = สแปมโฆษณา
  const links = p.message.match(/https?:\/\/|www\./gi)?.length ?? 0
  if (links > MAX_LINKS) throw new ContactError('too_many_links', 'too many links')
  // 4) ส่งถี่ / ส่งซ้ำ จากเบราว์เซอร์เดิม
  const log = readLog()
  const now = Date.now()
  const recent = (log.at ?? []).filter((t) => now - t < 3_600_000)
  if (log.last && log.last === fingerprint(p)) throw new ContactError('duplicate', 'duplicate message')
  if (recent.length >= MAX_PER_HOUR || (recent.length && now - recent[recent.length - 1] < COOLDOWN_MS)) {
    throw new ContactError('rate_limited', 'too many messages')
  }
  return undefined
}

async function viaWeb3Forms(payload: ContactPayload, signal?: AbortSignal) {
  const res = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: appConfig.web3formsKey,
      subject: `ข้อความใหม่จากพอร์ตโฟลิโอ — ${payload.name.trim()}`,
      from_name: 'Portfolio · Kittitouch',
      name: payload.name.trim(),
      email: payload.email.trim(),
      message: payload.message.trim(),
      // ช่องล่อบอทของ Web3Forms เอง — ส่งค่าจากกับดักของเราไปให้ฝั่งนั้นกรองซ้ำอีกชั้น
      botcheck: payload.website ?? '',
    }),
    signal,
  })
  const body = (await res.json().catch(() => ({ success: false }))) as { success: boolean; message?: string }
  if (!res.ok || !body.success) {
    throw new ContactError(res.status === 429 ? 'rate_limited' : 'send_failed', body.message ?? `Web3Forms ${res.status}`)
  }
  return { id: 'web3forms' }
}

export const contactService = {
  /** startedAt = เวลาที่ฟอร์มถูกเปิด (ms) ใช้จับบอทที่กรอกเร็วผิดปกติ */
  submit: async (payload: ContactPayload, startedAt: number, signal?: AbortSignal) => {
    if (spamGuard(payload, startedAt) === 'bot') return { id: 'ignored' }

    if (!appConfig.web3formsKey) throw new ContactError('not_configured', 'VITE_WEB3FORMS_ACCESS_KEY is not set')
    const result = await viaWeb3Forms(payload, signal)

    const log = readLog()
    writeLog({ at: [...(log.at ?? []).filter((t) => Date.now() - t < 3_600_000), Date.now()], last: fingerprint(payload) })
    return result
  },
}
