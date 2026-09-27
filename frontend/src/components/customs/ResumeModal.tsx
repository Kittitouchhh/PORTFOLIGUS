import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'
import { RESUME_PDF, RESUME_PREVIEW } from '@/constants/resume'

/**
 * ป็อปอัปเรซูเม่ PDF — design-handoff 7.4 (V8*11Resume)
 * ไอแพด/จอคอม: กล่องกลางจอบนพื้นดำ · หัว = ชื่อไฟล์ + ปุ่มเปิดแท็บใหม่ / ดาวน์โหลด / ปิด · กลาง = iframe ให้ viewer ของเบราว์เซอร์แสดง
 * มือถือ: เต็มจอ · กลาง = ภาพหน้าแรก (iOS แสดง PDF ใน iframe ไม่ดี) · ล่าง = เปิดเต็มจอ + ดาวน์โหลด
 * ปิดด้วย ✕ / Esc / คลิกพื้นหลัง · ล็อก scroll หน้าข้างหลัง · focus วนอยู่ในป็อปอัป
 */

const txt = {
  title: l('เรซูเม่', 'Resume'),
  meta: l('PDF · A4 · 1 หน้า · ภาษาอังกฤษ', 'PDF · A4 · 1 page · English'),
  metaMobile: l('PDF · 1 หน้า · จีบนิ้วเพื่อซูม', 'PDF · 1 page · pinch to zoom'),
  newTab: l('เปิดแท็บใหม่', 'Open in new tab'),
  fullscreen: l('เปิดเต็มจอ', 'Open full screen'),
  download: l('ดาวน์โหลด PDF', 'Download PDF'),
  close: l('ปิด', 'Close'),
  page: l('เรซูเม่ หน้า 1', 'Resume, page 1'),
}

const OWNER = 'Kittitouch Sakulsakpinit'
const FILE_NAME = RESUME_PDF.split('/').pop()
const MQ = '(min-width: 768px)'

const btn = 'inline-flex h-11 items-center justify-center gap-2 rounded-full px-[18px] text-[14px] font-bold whitespace-nowrap transition hover:-translate-y-0.5'
const btnLine = `${btn} border-[1.5px] border-card text-card`
const btnYellow = `${btn} border-2 border-ink bg-yellow text-ink`

function NewTabIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      <path d="M12 4v11" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  )
}

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && !window.matchMedia(MQ).matches)

  useEffect(() => {
    const mq = window.matchMedia(MQ)
    const onChange = () => setMobile(!mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab' || !dialogRef.current) return
      // focus trap — วน Tab อยู่ในป็อปอัป
      const items = [...dialogRef.current.querySelectorAll<HTMLElement>('a[href], button, iframe')]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.documentElement.classList.add('modal-open')
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.documentElement.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  const closeBtn = (
    <button
      ref={closeRef}
      type="button"
      onClick={onClose}
      aria-label={t(txt.close)}
      className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-card bg-card text-ink transition hover:scale-105"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    </button>
  )

  if (mobile) {
    return (
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={t(txt.title)} className="fixed inset-0 z-[70] flex flex-col bg-ink" style={{ animation: 'backdropIn .2s ease both' }}>
        <div className="flex items-center justify-between border-b border-[#3A3833] py-3 pr-3 pl-[18px] text-card">
          <div className="flex flex-col leading-[1.3]">
            <span className="text-[16px] font-bold">{t(txt.title)}</span>
            <span className="text-[12px] text-[#C9C3B6]">{t(txt.metaMobile)}</span>
          </div>
          {closeBtn}
        </div>
        <div className="flex min-h-0 flex-1 justify-center overflow-auto px-4 pt-4">
          <img src={RESUME_PREVIEW} alt={t(txt.page)} className="h-auto w-full max-w-[420px] self-start rounded-[4px] bg-card" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-2.5 border-t border-[#3A3833] px-4 pt-3.5 pb-[22px]">
          <a href={RESUME_PDF} target="_blank" rel="noreferrer" className={`${btnLine} h-12 px-3`}>
            <NewTabIcon />
            {t(txt.fullscreen)}
          </a>
          <a href={RESUME_PDF} download={FILE_NAME} className={`${btnYellow} h-12 px-3`}>
            <DownloadIcon />
            {t(txt.download)}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[70]" role="presentation" onClick={onClose}>
      <div aria-hidden="true" className="absolute inset-0 bg-[rgba(25,24,22,.86)]" style={{ animation: 'backdropIn .25s ease both' }} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t(txt.title)}
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-x-5 top-8 bottom-8 mx-auto flex max-w-[760px] flex-col gap-3.5"
        style={{ animation: 'popIn .3s cubic-bezier(.2,.8,.2,1) both' }}
      >
        <div className="flex items-center justify-between gap-3 text-card">
          <div className="flex min-w-0 flex-col leading-[1.3]">
            <span className="truncate text-[18px] font-bold">
              {t(txt.title)} · {OWNER}
            </span>
            <span className="text-[12.5px] text-[#C9C3B6]">{t(txt.meta)}</span>
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            <a href={RESUME_PDF} target="_blank" rel="noreferrer" className={btnLine} aria-label={t(txt.newTab)}>
              <NewTabIcon />
              <span className="hidden lg:inline">{t(txt.newTab)}</span>
            </a>
            <a href={RESUME_PDF} download={FILE_NAME} className={btnYellow}>
              <DownloadIcon />
              {t(txt.download)}
            </a>
            {closeBtn}
          </div>
        </div>
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[14px] bg-[#3A3833]">
          <iframe src={`${RESUME_PDF}#view=FitH&toolbar=0`} title={t(txt.page)} className="size-full border-0" />
        </div>
      </div>
    </div>
  )
}
