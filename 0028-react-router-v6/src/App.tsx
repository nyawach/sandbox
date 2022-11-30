import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { BaseLayout } from './layout/BaseLayout'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Posts } from './pages/Posts'
import { NotFound } from './pages/NotFound'
import { Post } from './pages/Post'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/ja" />} />
        <Route path="/:lang" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="posts" element={<Posts />}>
            <Route path=":postId" element={<Post />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
