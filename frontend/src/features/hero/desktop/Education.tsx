/**
 * ⚠️ ชุดจอคอม (≥ 1100px) — โค้ดหน้าตาเดิมก่อน v8 ตามที่เจ้าของขอ (27 ก.ย.) · มือถือ/ไอแพดใช้ไฟล์ v8 ในโฟลเดอร์แม่
 * HomePage เลือกชุดด้วย useIsDesktop() — แก้เนื้อหาต้องแก้ทั้งสองชุด
 */
import { Container } from '@/components/layouts/Container'
import { SectionBand } from '@/components/layouts/SectionBand'
import { Reveal } from '@/components/common/Reveal'
import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'

/**
 * ประวัติการศึกษา — วางต่อจากปกทันที (ตามที่เจ้าของขอ)
 * จอ ≥ xl: ใช้กริดเดียวกับปกเป๊ะ ช่องซ้ายว่างไว้ (data-badge-slot) ให้บัตรพนักงานจากปก
 * ห้อยสายยาวลงมาเกาะตรงนี้ตอนเลื่อน (ดู Cover.tsx) · เนื้อหาอยู่ช่องขวา
 * จอเล็กกว่า: การ์ดเรียงปกติ ไม่มีบัตรตามลงมา
 */

const txt = {
  edu: l('ประวัติการศึกษา', 'Education'),
  dpu: l('มหาวิทยาลัยธุรกิจบัณฑิตย์', 'Dhurakij Pundit University'),
  year4: l('ชั้นปีที่ 4', 'YEAR 4'),
  degree1: l('วิศวกรรมศาสตรบัณฑิต', 'Bachelor of Engineering'),
  degree2: l('สาขาวิชาวิศวกรรมคอมพิวเตอร์', 'Computer Engineering'),
  school: l('วิทยาลัยวิศวกรรมศาสตร์และเทคโนโลยี · มหาวิทยาลัยธุรกิจบัณฑิตย์', 'College of Engineering and Technology · Dhurakij Pundit University'),
  gpaNote: l('เกรดเฉลี่ยสะสม ณ ปี 3 · ภาค 2/2568', 'Cumulative GPA as of year 3 · term 2/2025'),
  years: l('ปี', 'yrs'),
  freeNote: l('เรียนฟรีด้วยทุนเต็มจำนวน', 'Free, on a full scholarship'),
  coopShort: l('สหกิจ ม.ค.–เม.ย. 70', 'Co-op Jan–Apr 2027'),
  coopNote: l('เต็มเวลา · กำลังหาที่', 'Full-time · looking now'),
  scholarTag: l('เด็กทุน', 'SCHOLAR'),
  free: l('ทุนเรียนฟรี', 'Full scholarship'),
  allYears: l('ตลอด 4 ปี', 'all 4 years'),
  scholarNote: l('ได้รับทุนยกเว้นค่าเล่าเรียนเต็มจำนวน ตั้งแต่ปี 1 จนเรียนจบ', 'Full tuition waiver from year 1 until graduation'),
}

export function Education() {
  const { t } = useLang()

  return (
    <SectionBand tone="card" id="education" noMagnet className="py-14">
      <Container>
        <div className="mx-auto grid w-full xl:grid-cols-[24rem_minmax(0,44rem)] xl:justify-center xl:gap-24">
          {/* ช่องให้บัตรจากปกห้อยลงมาเกาะ */}
          <div data-badge-slot aria-hidden="true" className="hidden xl:block" />

          <div className="flex flex-col gap-5">
            <Reveal className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.25] font-bold">
                <span className="mark px-1.5">{t(txt.edu)}</span>
              </h2>
            </Reveal>

            <Reveal stagger className="flex flex-col gap-5">
              <div className="flex flex-col overflow-hidden rounded-[28px] border-2 border-ink bg-card shadow-[8px_8px_0_var(--ink)]">
                <div className="flex items-center justify-between gap-5 border-b-2 border-ink bg-[#F1EBFF] px-6 py-5 sm:px-7">
                  <img src="/brand/dpu-logo.png" alt={t(txt.dpu)} className="h-14 sm:h-16" />
                  <span className="font-brand rotate-3 rounded-full bg-[#6A2CF5] px-3.5 py-1.5 text-[13px] font-extrabold tracking-[0.08em] text-white">{t(txt.year4)}</span>
                </div>
                <div className="flex flex-col gap-4 px-6 py-5 sm:px-7">
                  <div className="flex flex-col gap-1">
                    <span className="text-[clamp(1.2rem,1.8vw,1.45rem)] leading-[1.3] font-bold">
                      {t(txt.degree1)} · {t(txt.degree2)}
                    </span>
                    <span className="text-[14.5px] text-[#3E3B35]">{t(txt.school)}</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="-rotate-[1.5deg] rounded-[18px] border-2 border-ink bg-[#6A2CF5] px-4 py-3 text-white">
                      <div className="font-brand text-[40px] leading-none font-extrabold">3.46</div>
                      <div className="mt-1.5 text-[12.5px] leading-snug text-[#E7DDFF]">{t(txt.gpaNote)}</div>
                    </div>
                    {/* ทุนเต็มจำนวน — การ์ดสีทอง มีแสงวิ่งผ่านเบา ๆ */}
                    <div className="edu-gold relative overflow-hidden rounded-[18px] border-2 border-ink px-4 py-3 text-[#3A2600] shadow-[4px_4px_0_var(--ink)]">
                      <span aria-hidden="true" className="absolute top-2 right-2.5 text-[15px]">★</span>
                      <div className="font-brand text-[40px] leading-none font-extrabold drop-shadow-[0_1px_0_rgba(255,255,255,.5)]">
                        4<span className="text-[18px]"> {t(txt.years)}</span>
                      </div>
                      <div className="mt-1.5 text-[12.5px] leading-snug font-bold">{t(txt.freeNote)}</div>
                    </div>
                    {/* สหกิจ — การ์ดขาวขอบเขียว จุดสถานะกระพริบ "กำลังหาที่" */}
                    <div className="rotate-[1.5deg] rounded-[18px] border-2 border-ink bg-card px-4 py-3 shadow-[4px_4px_0_#1F9D55]">
                      <div className="flex items-center gap-1.5 text-[11.5px] font-bold tracking-[0.04em] text-[#1F7A45]">
                        <span className="relative flex size-2.5">
                          <span className="rm-still absolute inline-flex size-full animate-ping rounded-full bg-[#1F9D55] opacity-60" />
                          <span className="relative inline-flex size-2.5 rounded-full bg-[#1F9D55]" />
                        </span>
                        {t(txt.coopNote)}
                      </div>
                      <div className="mt-1.5 text-[17px] leading-[1.3] font-bold">{t(txt.coopShort)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ทุน — แถบฟ้าแนวนอน */}
              <div className="relative flex flex-col gap-4 overflow-hidden rounded-[28px] border-2 border-ink bg-[#57B8F5] px-6 py-5 shadow-[8px_8px_0_var(--ink)] sm:flex-row sm:items-center sm:gap-6 sm:px-7">
                <svg aria-hidden="true" className="anim-float absolute top-3 right-4" width="30" height="30" viewBox="0 0 24 24">
                  <path d="M12 1c1 6 5 10 11 11-6 1-10 5-11 11-1-6-5-10-11-11 6-1 10-5 11-11z" fill="#FFE34D" stroke="#191816" strokeWidth="1.2" />
                </svg>
                <div className="flex shrink-0 flex-col items-start gap-2">
                  <span className="font-brand rounded-full bg-ink px-3 py-1 text-[12px] font-extrabold tracking-[0.1em] text-white">{t(txt.scholarTag)}</span>
                  <span className="-rotate-3 border-[2.5px] border-ink bg-[#D6F54A] px-4 pt-1 pb-1.5 text-[clamp(1.5rem,2.4vw,1.9rem)] leading-[1.1] font-bold text-[#5A1FD6] shadow-[4px_4px_0_var(--ink)]">{t(txt.free)}</span>
                  <span className="ml-6 rotate-2 border-[2.5px] border-ink bg-yellow px-4 pt-0.5 pb-1 text-[clamp(1.4rem,2.2vw,1.75rem)] leading-[1.1] font-extrabold text-ink shadow-[4px_4px_0_var(--ink)]">
                    <span className="font-brand">100%</span> <span className="text-[clamp(1rem,1.5vw,1.2rem)] font-bold">{t(txt.allYears)}</span>
                  </span>
                </div>
                <div className="flex flex-col gap-2 sm:pr-6">
                  <span className="text-[16px] leading-relaxed font-semibold text-[#0E2A40]">{t(txt.scholarNote)}</span>
                  <span className="font-hand self-start -rotate-2 rounded-[10px] bg-[#6A2CF5] px-3 pt-0.5 pb-1 text-[19px] text-white">{t(txt.dpu)}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </SectionBand>
  )
}
