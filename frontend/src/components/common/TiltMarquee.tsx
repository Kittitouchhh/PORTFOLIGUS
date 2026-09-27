import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'
import { cn } from '@/utils/cn'

/**
 * แถบตัวหนังสือวิ่งเอียง -2° สีเหลือง คั่นก่อนส่วนงาน — design-handoff 7.2
 * วิ่งวน 26 วิ (CSS .tilt-marquee-track) · หยุดนิ่งเมื่อ prefers-reduced-motion
 * วางไว้บนสุดของแถบส่วนงาน (ทั้งชุดจอคอมและ v8) — ดูดมาที่ส่วนงานแล้วเห็นแถบนี้ในจอเดียวกัน
 * ข้อความซ้ำ 2 ชุดต่อกัน แล้วเลื่อนไป -50% → วนต่อเนื่องไม่มีรอยต่อ
 */

const WORDS = [
  l('งานจริง', 'REAL WORK'),
  l('ลูกค้าจริง', 'REAL CLIENTS'),
  l('ผู้ใช้จริง', 'REAL USERS'),
  l('REAL WORK', 'ON SITE'),
  l('หน้างานจริง', 'SHOP FLOOR'),
  l('ERP โรงงาน', 'FACTORY ERP'),
]

export function TiltMarquee({ className }: { className?: string }) {
  const { t } = useLang()
  const run = [...WORDS, ...WORDS]

  return (
    <div aria-hidden="true" className={cn('overflow-hidden', className)}>
      <div className="relative z-[3] -mx-10 flex h-14 -rotate-2 items-center overflow-hidden border-y-2 border-ink bg-yellow text-ink md:h-16">
        <div className="tilt-marquee-track font-brand text-[18px] font-extrabold tracking-[0.02em] whitespace-nowrap md:text-[22px]">
          {[run, run].map((set, k) => (
            <span key={k} className="flex">
              {set.map((w, i) => (
                <span key={i} className="inline-flex items-center gap-[18px] px-[18px]">
                  {t(w)}
                  <span>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
