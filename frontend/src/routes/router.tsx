import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/components/layouts/MainLayout'
import { ROUTES } from '@/constants/routes'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import SkillsPage from '@/pages/SkillsPage'
import ProcessPage from '@/pages/ProcessPage'
import WorkPage from '@/pages/WorkPage'
import ExperiencePage from '@/pages/ExperiencePage'
import LearningPage from '@/pages/LearningPage'
import ContactPage from '@/pages/ContactPage'
import NotFoundPage from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.SKILLS, element: <SkillsPage /> },
      { path: ROUTES.PROCESS, element: <ProcessPage /> },
      { path: ROUTES.WORK, element: <WorkPage /> },
      { path: ROUTES.EXPERIENCE, element: <ExperiencePage /> },
      { path: ROUTES.LEARNING, element: <LearningPage /> },
      { path: ROUTES.CONTACT, element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
