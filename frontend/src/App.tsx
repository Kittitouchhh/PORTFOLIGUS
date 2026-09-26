import { RouterProvider } from 'react-router-dom'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { router } from '@/routes/router'

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  )
}
