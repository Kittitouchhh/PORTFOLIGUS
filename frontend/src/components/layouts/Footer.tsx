import { Container } from './Container'
import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'
import { TOP_ID } from '@/constants/sections'
import { scrollToSection } from '@/utils/scroll'
import { cn } from '@/utils/cn'

/** footer พื้นดำ — design-handoff 7.3 ข้อ 10 (V8*10Contact) · "แก้ไขล่าสุด" = วันที่ build (__BUILD_DATE__ จาก vite.config) */

const txt = {
  thanks: l('ขอบคุณที่ติดตามมาจนถึงตรงนี้ครับ', 'Thanks for scrolling all the way down'),
  made: l('ออกแบบและเขียนเองทั้งหมด', 'Designed and built by me'),
  updated: l('แก้ไขล่าสุด', 'Last updated'),
  top: l('กลับขึ้นบน', 'Back to top'),
}

/** compact = วางต่อท้ายจอติดต่อ (หน้าแรก) · ไม่ compact = หน้าอื่นที่ไม่มีจอติดต่อ */
export function Footer({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useLang()
  const year = new Date().getFullYear() + (lang === 'th' ? 543 : 0)
  const updated = new Date(__BUILD_DATE__).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <footer className={cn('bg-ink text-card', compact ? 'mt-16 md:mt-20' : 'mt-20')}>
      <Container className="flex flex-col items-center gap-4 py-9 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col gap-1">
          <p className="text-[17px] font-bold text-card">{t(txt.thanks)}</p>
          <p className="text-[12.5px] text-[#C9C3B6]">
            © {year} {lang === 'th' ? 'กิตติธัช สกุลศักดิ์พินิจ' : 'Kittitouch Sakulsakpinit'} · {t(txt.made)}
          </p>
          <p className="font-code text-[12px] text-yellow">
            {t(txt.updated)} {updated}
          </p>
        </div>
        <button
          type="button"
          onClick={() => scrollToSection(TOP_ID)}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border-[1.5px] border-card px-[18px] text-[13.5px] font-bold text-card transition hover:bg-card hover:text-ink"
        >
          {t(txt.top)}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </button>
      </Container>
    </footer>
  )
}
