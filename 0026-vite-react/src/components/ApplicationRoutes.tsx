import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "~/components/layouts/DefaultLayout";
import NotFound from "~/components/templates/NotFound";

const Home = lazy(() => import('~/components/templates/Home'))

const ApplicationRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={
            <Suspense fallback={<>Loading...</>}>
              <Home />
            </Suspense>
          } />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default ApplicationRoutes
