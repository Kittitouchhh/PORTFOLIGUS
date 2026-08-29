import { useLang } from '@/hooks/useLang'

/**
 * ป้ายเล็ก ๆ ที่โผล่มาตอนเว็บสลับภาษาให้เองตอนเลื่อนพ้นหน้าแรก
 *
 * ของที่เปลี่ยนเองโดยไม่บอกคือของที่คนอ่านคิดว่าเว็บพัง
 * ป้ายนี้เลยมีหน้าที่เดียว: บอกว่าตั้งใจ และบอกว่ากดกลับได้ที่ไหน
 */
export function LangFlash() {
  const { justAutoSwitched, tr } = useLang()

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-5 left-5 z-50 max-w-[min(20rem,calc(100vw-2.5rem))]"
    >
      {justAutoSwitched && (
        <p className="anim-pop rounded-full border border-line bg-invert-bg px-4 py-2.5 text-[12px] leading-snug font-medium text-invert-fg shadow-[0_10px_30px_-14px_rgba(0,0,0,0.6)]">
          {tr('lang.autoSwitched')}
        </p>
      )}
    </div>
  )
}
