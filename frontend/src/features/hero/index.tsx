import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/layouts/Container'
import { useLang } from '@/hooks/useLang'
import { useContent } from '@/hooks/useContent'
import { cn } from '@/utils/cn'
import { ROUTES } from '@/constants/routes'

/**
 * อยากใส่รูปตัวเอง วางไฟล์ที่ frontend/public/avatar.png
 * เอารูปที่ตัดพื้นหลังออกแล้วจะเข้ากับดีไซน์ที่สุด เพราะตัวคนจะซ้อนทับตัวอักษรพอดี
 * ถ้าไม่มีไฟล์ พาดหัวจะขยับมาอยู่กลางแทนเอง
 */
function Portrait() {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  return (
    <img
      src="/avatar.png"
      alt=""
      onError={() => setFailed(true)}
      className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[70%] max-h-[26rem] -translate-x-1/2 object-contain select-none"
    />
  )
}

export function Hero() {
  const { t, tr } = useLang()
  const { profile, skillGroups } = useContent()

  // หยิบเฉพาะทักษะระดับใช้งานหลักมาวิ่งเป็นแถบด้านล่าง
  const toolbelt = skillGroups
    .flatMap((group) => group.skills)
    .filter((skill) => skill.level === 'core')
    .map((skill) => t(skill.name))

  return (
    <section id="top" className="pt-10 pb-16 sm:pt-16">
      <Container>
        <p className="mx-auto mb-8 max-w-2xl text-center text-[15px] text-ink-2 sm:mb-10 sm:text-lg">
          <span aria-hidden="true">👋</span> {t(profile.headline.lead)}
        </p>

        <div className="relative">
          <Portrait />

          {/* บรรทัดคี่เป็นตัวกลวงสลับกับตัวทึบ ยิ่งหลายบรรทัดตัวยิ่งเล็กลงเองตาม clamp */}
          <h1 className="relative text-center">
            {profile.headline.lines.map((line, index) => (
              <span
                key={index}
                className={cn(
                  'display relative block text-[clamp(1.75rem,6.5vw,4.25rem)]',
                  index % 2 === 1 && 'display-outline',
                )}
              >
                {t(line)}
              </span>
            ))}
          </h1>
        </div>

        <div className="relative z-20 mt-8 flex flex-col gap-8 sm:mt-12 lg:flex-row lg:items-end lg:justify-between">
          <p className="text-[15px] text-ink-2 sm:text-lg">{t(profile.basedIn)}</p>

          <div className="lg:max-w-md lg:flex-1">
            <p className="eyebrow mb-3">{tr('hero.toolbelt')}</p>
            <div className="marquee">
              <div>
                {[0, 1].map((copy) => (
                  <ul key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                    {toolbelt.map((tool) => (
                      <li
                        key={`${copy}-${tool}`}
                        className="px-4 text-sm whitespace-nowrap text-ink-3"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link to={ROUTES.WORK} className="pill pill-solid">
            {tr('hero.ctaDev')}
          </Link>
          <Link to={ROUTES.PROCESS} className="pill pill-outline">
            {tr('hero.ctaReq')}
          </Link>
        </div>
      </Container>
    </section>
  )
}
