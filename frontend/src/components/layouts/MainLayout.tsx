import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layouts/Navbar'
import { SideNav } from '@/components/layouts/SideNav'
import { Footer } from '@/components/layouts/Footer'
import { LangFlash } from '@/components/common/LangFlash'
import { scrollToSection } from '@/utils/scroll'
import { useMagnetScroll } from '@/hooks/useMagnetScroll'
import { ResumeProvider } from '@/contexts/ResumeContext'

/**
 * หน้าเต็มจอ แต่ละ section เป็นแถบพื้นหลังของตัวเอง (SectionBand) · จอคอมมีแถบเมนูซ้ายลอยทับ
 * Container เว้นขอบซ้าย 88px ให้แถบเมนูแล้ว เลยไม่ต้องดันทั้งหน้า
 *
 * overflow-clip ไม่ใช่ overflow-hidden: อันหลังทำให้กล่องนี้กลายเป็น scroll container
 * แล้ว sticky ของ Navbar จะไม่มีระยะให้ติด — แถบบนเลยไม่เลื่อนตามจอ
 */
export function MainLayout() {
  const { pathname, hash } = useLocation()
  useMagnetScroll()

  // เข้าลิงก์ที่มี #section มาให้เลื่อนไปหาหัวข้อนั้น ไม่งั้นเริ่มอ่านจากบนสุด
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    // รอให้ section ถูก mount ก่อนค่อยวัดตำแหน่ง
    const frame = requestAnimationFrame(() => scrollToSection(hash.slice(1)))
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return (
    <ResumeProvider>
    <div className="flex min-h-dvh flex-col overflow-clip bg-page">
      {/* จอกว้าง: แถบข้าง · จอแคบ: แถบบน */}
      <SideNav />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {/* หน้าแรกมี footer อยู่ในจอติดต่อแล้ว */}
      {pathname !== '/' && <Footer />}

      {/* ป้ายลอยเหนือหน้า อยู่ท้ายสุดให้ทับของอื่นได้โดยไม่ต้องดัน z-index */}
      <LangFlash />
    </div>
    </ResumeProvider>
  )
}
