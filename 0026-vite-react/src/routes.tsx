import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import BaseLayout from './components/layouts/BaseLayout'

const Index = lazy(() => import('./components/pages/index'))
const AboutIndex = lazy(() => import('./components/pages/about/index'))

export const routes = () => (
  <Routes>
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<Index />} />
      <Route path="/about" element={<AboutIndex />} />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Route>
  </Routes>
)
