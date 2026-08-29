import { Navigate, createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/components/layouts/MainLayout'
import { LEGACY_PATHS } from '@/constants/sections'
import { ROUTES } from '@/constants/routes'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },

      // ลิงก์เก่าสมัยยังแยกหน้า เด้งไปที่หัวข้อเดียวกันบนหน้าเดียว
      ...Object.entries(LEGACY_PATHS).map(([path, id]) => ({
        path,
        element: <Navigate to={`/#${id}`} replace />,
      })),

      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
