import { Container } from '@/components/layouts/Container'
import { SectionBand } from '@/components/layouts/SectionBand'
import { Reveal } from '@/components/common/Reveal'
import { useLang } from '@/hooks/useLang'
import { l } from '@/types/i18n.type'

/**
 * ประวัติการศึกษา — วางต่อจากปกทันที (ตามที่เจ้าของขอ) · v8 `V8*02Edu`
 * การ์ด DPU (GPA กล่องดำ + ปี 4 สหกิจ) คู่กับการ์ดทุนสีน้ำเงิน #2B55E6 — ไอแพด/คอมวางคู่ 1.35 : 1 · มือถือเรียงลง จัดกลาง
 * (ตอนเรียงลงห้ามใช้ flex: 1 1 0 — การ์ดจะยุบ เลยใส่ flex เฉพาะ md ขึ้นไป)
 * จอ ≥ xl: ใช้กริดเดียวกับปกเป๊ะ ช่องซ้ายว่างไว้ (data-badge-slot) ให้บัตรพนักงานจากปก
 * ห้อยสายยาวลงมาเกาะตรงนี้ตอนเลื่อน (ดู Cover.tsx) · เนื้อหาอยู่ช่องขวา
 */

const txt = {
  edu: l('ประวัติการศึกษา', 'Education'),
  dpu: l('มหาวิทยาลัยธุรกิจบัณฑิตย์', 'Dhurakij Pundit University'),
  year4: l('ชั้นปีที่ 4', 'Year 4'),
  degree1: l('วิศวกรรมศาสตรบัณฑิต', 'Bachelor of Engineering'),
  degree2: l('สาขาวิชาวิศวกรรมคอมพิวเตอร์', 'Computer Engineering'),
  school: l('วิทยาลัยวิศวกรรมศาสตร์และเทคโนโลยี · มหาวิทยาลัยธุรกิจบัณฑิตย์', 'College of Engineering and Technology · Dhurakij Pundit University'),
  gpaA: l('เกรดเฉลี่ยสะสม', 'Cumulative GPA'),
  gpaB: l('ณ ปี 3 · ภาค 2/2568', 'as of year 3 · term 2/2025'),
  yearBig: l('ปี 4', 'Y4'),
  coopA: l('สหกิจเต็มเวลา', 'Full-time co-op'),
  coopB: l('ม.ค. – เม.ย. 2570', 'Jan – Apr 2027'),
  scholarTag: l('เด็กทุน', 'Scholar'),
  free: l('ทุนเรียนฟรี', 'Full scholarship'),
  allYears: l('ตลอด 4 ปี', 'all 4 years'),
  scholarNote: l('ได้รับทุนยกเว้นค่าเล่าเรียนเต็มจำนวน ตั้งแต่ปี 1 จนเรียนจบ', 'Full tuition waiver from year 1 until graduation'),
}

export function Education() {
  const { t } = useLang()

  return (
    <SectionBand tone="card" id="education" noMagnet className="pt-11 pb-13 md:pt-[72px] md:pb-20 lg:pt-24 lg:pb-[104px]">
      <Container>
        <div className="grid w-full xl:grid-cols-[26rem_minmax(0,1fr)] xl:gap-x-12">
          {/* ช่องให้บัตรจากปกห้อยลงมาเกาะ — ต้องกว้างเท่าช่องบัตรในปก */}
          <div data-badge-slot aria-hidden="true" className="hidden xl:block" />

          <div className="flex min-w-0 flex-col gap-4 md:gap-[22px] lg:gap-7">
            <Reveal className="flex justify-center md:justify-start">
              <h2 className="text-center text-[23px] leading-[1.32] font-bold tracking-[-0.01em] md:text-left md:text-[31px] lg:text-[40px]">
                <span className="mark px-1">{t(txt.edu)}</span>
              </h2>
            </Reveal>

            <Reveal stagger className="flex flex-col gap-[18px] md:flex-row md:items-stretch md:gap-5 lg:gap-7">
              {/* การ์ด DPU */}
              <div className="flex min-w-0 flex-col overflow-hidden rounded-[26px] border-2 border-ink bg-card shadow-[6px_6px_0_var(--ink)] md:flex-[1.35_1_0]">
                <div className="flex items-center justify-between gap-3 border-b-2 border-ink bg-[#EEE8FF] px-4 py-3 md:px-[22px] md:py-3.5">
                  <img src="/brand/dpu-logo.png" alt={t(txt.dpu)} className="h-8 md:h-10" />
                  <span className="shrink-0 rounded-full bg-[#5B2FD6] px-3 py-[5px] text-[12.5px] font-bold text-card">{t(txt.year4)}</span>
                </div>
                <div className="flex flex-col gap-3.5 px-4 pt-4 pb-[18px] text-center md:px-6 md:pt-[22px] md:pb-6 md:text-left">
                  <div className="flex flex-col gap-[3px]">
                    <span className="text-[15px] leading-[1.4] font-bold md:text-[16.5px] lg:text-[18px]">
                      {t(txt.degree1)} · {t(txt.degree2)}
                    </span>
                    <span className="text-[13px] leading-[1.55] text-ink-2">{t(txt.school)}</span>
                  </div>
                  <div className="flex gap-3">
                    {/* GPA — กล่องดำ ตัวเลขเหลือง */}
                    <div className="flex min-w-0 flex-[1_1_0] flex-col items-center gap-1 rounded-[18px] bg-ink px-3 py-3.5 text-center text-card md:items-start md:px-4 md:py-[18px] md:text-left lg:px-5">
                      <span className="font-brand text-[38px] leading-none font-extrabold text-yellow md:text-[44px] lg:text-[52px]">3.46</span>
                      <span className="text-[12.5px] leading-[1.5] text-[#E9E4DA]">
                        {t(txt.gpaA)}
                        <br />
                        {t(txt.gpaB)}
                      </span>
                    </div>
                    {/* ปี 4 สหกิจ */}
                    <div className="flex min-w-0 flex-[1_1_0] flex-col items-center gap-1 rounded-[18px] border-[1.5px] border-line bg-page px-3 py-3.5 text-center md:items-start md:px-4 md:py-[18px] md:text-left lg:px-5">
                      <span className="font-brand text-[38px] leading-none font-extrabold md:text-[44px] lg:text-[52px]">{t(txt.yearBig)}</span>
                      <span className="text-[12.5px] leading-[1.5] text-[#3E3B35]">
                        {t(txt.coopA)}
                        <br />
                        {t(txt.coopB)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* การ์ดทุน — น้ำเงิน */}
              <div className="relative flex min-w-0 flex-col items-center justify-center gap-2.5 overflow-hidden rounded-[26px] border-2 border-ink bg-[#2B55E6] px-5 py-[22px] text-center text-card shadow-[6px_6px_0_var(--ink)] md:flex-[1_1_0] md:items-start md:p-7 md:text-left">
                <span aria-hidden="true" className="absolute -top-10 -right-10 size-[180px] rounded-full border-[26px] border-white/[.08]" />
                <span className="relative -rotate-3 rounded-lg border-2 border-ink bg-yellow px-3 py-[5px] text-[13px] font-extrabold text-ink">{t(txt.scholarTag)}</span>
                <span className="relative text-[30px] leading-[1.05] font-extrabold md:text-[34px] lg:text-[40px]">
                  {t(txt.free)}
                  <br />
                  <span className="text-yellow">100%</span> {t(txt.allYears)}
                </span>
                <span className="relative text-[13.5px] leading-[1.6] text-[#DCE4FB]">
                  {t(txt.scholarNote)} · {t(txt.dpu)}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </SectionBand>
  )
}
