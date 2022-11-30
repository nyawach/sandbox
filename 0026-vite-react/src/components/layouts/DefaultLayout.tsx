import { Outlet } from "react-router-dom"

const DefaultLayout: React.FC = () => (
  <>
    <h1>とてもすごいサイト</h1>
    <main>
      <Outlet />
    </main>
  </>
)

export default DefaultLayout
