import { RouterProvider } from 'react-router-dom'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ContentProvider } from '@/contexts/ContentContext'
import { router } from '@/routes/router'

export default function App() {
  return (
    <LanguageProvider>
      <ContentProvider>
        <RouterProvider router={router} />
      </ContentProvider>
    </LanguageProvider>
  )
}
