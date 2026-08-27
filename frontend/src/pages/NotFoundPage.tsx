import { Link } from 'react-router-dom'
import { Container } from '@/components/layouts/Container'
import { useLang } from '@/hooks/useLang'
import { ROUTES } from '@/constants/routes'
import { l } from '@/types/i18n.type'

const title = l('ไม่มีหน้านี้', 'Nothing here')
const body = l(
  'ลิงก์ที่เข้ามาอาจพิมพ์ผิด หรือหน้านั้นถูกย้ายไปแล้ว',
  'That link may be mistyped, or the page has moved.',
)
const back = l('กลับหน้าแรก', 'Back to home')

export default function NotFoundPage() {
  const { t } = useLang()

  return (
    <section className="py-28 sm:py-36">
      <Container>
        <p className="display text-[clamp(4rem,14vw,9rem)]">404</p>
        <h1 className="display mt-4 text-3xl sm:text-4xl">{t(title)}</h1>
        <p className="mt-4 max-w-md leading-relaxed text-ink-2">{t(body)}</p>
        <Link to={ROUTES.HOME} className="pill pill-solid mt-8">
          {t(back)} ↗
        </Link>
      </Container>
    </section>
  )
}
