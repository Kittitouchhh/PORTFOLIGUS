import { Container } from './Container'
import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'
import { TOP_ID } from '@/constants/sections'
import { scrollToSection } from '@/utils/scroll'
import { cn } from '@/utils/cn'

const txt = {
  thanks: l('ขอบคุณที่ติดตามมาจนถึงตรงนี้ครับ', 'Thanks for scrolling all the way down'),
  made: l('ออกแบบและเขียนเองทั้งหมด', 'Designed and built by me'),
  top: l('กลับขึ้นบน ↑', 'Back to top ↑'),
}

/** compact = วางต่อท้ายจอติดต่อ (หน้าแรก) · ไม่ compact = หน้าอื่นที่ไม่มีจอติดต่อ */
export function Footer({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useLang()
  const year = new Date().getFullYear() + (lang === 'th' ? 543 : 0)

  return (
    <footer className={cn('bg-page', compact ? 'pt-8' : 'pt-20 pb-10')}>
      <Container className="flex items-end justify-between gap-6">
        <div>
          <p className={cn('font-hand text-ink', compact ? 'text-[clamp(1.3rem,2.2vw,1.6rem)]' : 'text-[clamp(1.5rem,3vw,1.9rem)]')}>{t(txt.thanks)}</p>
          <p className="mt-1 text-[13px] text-ink-2">
            © {year} {lang === 'th' ? 'กิตติธัช สกุลศักดิ์พินิจ' : 'Kittitouch Sakulsakpinit'} · {t(txt.made)}
          </p>
          <button type="button" onClick={() => scrollToSection(TOP_ID)} className="mt-3 text-[14px] font-bold text-ink underline underline-offset-4">
            {t(txt.top)}
          </button>
        </div>
        <img src="/stickers/gus-backpack.webp" alt="" aria-hidden="true" className={cn('shrink-0 drop-shadow-lg', compact ? 'w-24 sm:w-32' : 'w-32 sm:w-52')} />
      </Container>
    </footer>
  )
}
