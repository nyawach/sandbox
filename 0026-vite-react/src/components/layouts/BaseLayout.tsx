import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const BaseLayout: React.FC = () => (
  <>
    <Suspense fallback={<h1>Loading...</h1>}>
      <main>
        <Outlet />
      </main>
    </Suspense>
  </>
)

export default BaseLayout
