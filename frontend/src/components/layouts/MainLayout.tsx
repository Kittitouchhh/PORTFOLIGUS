import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layouts/Navbar'
import { Footer } from '@/components/layouts/Footer'

/**
 * หน้ากระดาษมุมโค้งลอยบนพื้นเข้ม เหมือนแผ่นงานวางบนโต๊ะ
 * พื้นเข้มมาจาก --ground ที่ตั้งไว้บน <html>
 */
export function MainLayout() {
  const { pathname } = useLocation()

  // เปลี่ยนหน้าแล้วต้องเริ่มอ่านจากบนสุดเสมอ ไม่ใช่ค้างตำแหน่งเดิมของหน้าก่อน
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col overflow-hidden rounded-b-[2rem] bg-page sm:m-3 sm:rounded-[2rem]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
