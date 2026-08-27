import { useState, type FormEvent, type ReactNode } from 'react'
import {
  CONTACT_LIMITS,
  validateContact,
  type ContactErrors,
  type ContactPayload,
} from '@portfolio/shared/contact'
import { useLang } from '@/hooks/useLang'
import { ApiError } from '@/apis/main.api'
import { contactService } from '@/services/contact.service'
import { cn } from '@/utils/cn'

type Status = 'idle' | 'sending' | 'sent' | 'failed'

const EMPTY: ContactPayload = { name: '', email: '', message: '', website: '' }

/** ช่องกรอกเป็นเส้นใต้เส้นเดียว ไม่มีกล่อง — ให้เข้ากับดีไซน์ที่ใช้เส้นเป็นหลัก */
const field =
  'w-full border-b border-line bg-transparent pb-2.5 text-[15px] text-ink placeholder:text-ink-3 transition-colors focus:border-ink focus:outline-none'

export function ContactForm() {
  const { t, tr } = useLang()
  const [values, setValues] = useState<ContactPayload>(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [failure, setFailure] = useState('')

  const set = (key: keyof ContactPayload) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    // เคลียร์ error ของช่องนั้นทันทีที่เริ่มพิมพ์แก้ ไม่ต้องรอกดส่งอีกรอบ
    setErrors((prev) =>
      prev[key as keyof ContactErrors] ? { ...prev, [key]: undefined } : prev,
    )
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()

    const found = validateContact(values)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }

    setStatus('sending')
    setFailure('')

    try {
      await contactService.submit(values)
      setStatus('sent')
      setValues(EMPTY)
    } catch (error) {
      setStatus('failed')
      setFailure(
        error instanceof ApiError && error.code === 'rate_limited'
          ? tr('form.rateLimited')
          : tr('form.failed'),
      )
    }
  }

  if (status === 'sent') {
    return (
      <div className="border-t border-line pt-10">
        <p className="display text-[clamp(2rem,5vw,3rem)]">✓</p>
        <p className="mt-4 max-w-md leading-relaxed text-ink-2">{tr('form.success')}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="pill pill-outline pill-sm mt-7"
        >
          {tr('form.successAgain')}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-9">
      <Field id="name" label={tr('form.name')} error={errors.name && t(errors.name)}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={CONTACT_LIMITS.name.max}
          value={values.name}
          onChange={(e) => set('name')(e.target.value)}
          placeholder={tr('form.namePlaceholder')}
          className={cn(field, errors.name && 'border-accent')}
        />
      </Field>

      <Field id="email" label={tr('form.email')} error={errors.email && t(errors.email)}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={CONTACT_LIMITS.email.max}
          value={values.email}
          onChange={(e) => set('email')(e.target.value)}
          placeholder={tr('form.emailPlaceholder')}
          className={cn(field, errors.email && 'border-accent')}
        />
      </Field>

      <Field
        id="message"
        label={tr('form.message')}
        error={errors.message && t(errors.message)}
        hint={`${values.message.length} / ${CONTACT_LIMITS.message.max}`}
      >
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={CONTACT_LIMITS.message.max}
          value={values.message}
          onChange={(e) => set('message')(e.target.value)}
          placeholder={tr('form.messagePlaceholder')}
          className={cn(field, 'resize-y', errors.message && 'border-accent')}
        />
      </Field>

      {/* กับดักบอท — คนจริงมองไม่เห็นและ tab ไม่ถึง */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set('website')(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" disabled={status === 'sending'} className="pill pill-solid">
          {status === 'sending' ? tr('form.submitting') : tr('form.submit')}
          <span aria-hidden="true">↗</span>
        </button>

        {status === 'failed' && (
          <p role="alert" className="text-[13px] text-accent">
            {failure}
          </p>
        )}
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="eyebrow">
          {label}
        </label>
        {hint && <span className="num text-[11px]">{hint}</span>}
      </div>
      {children}
      {error && (
        <p role="alert" className="mt-2 text-[13px] text-accent">
          {error}
        </p>
      )}
    </div>
  )
}
