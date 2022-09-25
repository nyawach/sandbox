import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Index = lazy(() => import('./pages/index'))
const AboutIndex = lazy(() => import('./pages/about/index'))

const Loading = (<h1>Loading...</h1>)

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element= {
                <Suspense fallback={Loading}>
                    <Index />
                </Suspense>
            } />
            <Route path='/about' element={
                <Suspense fallback={Loading}>
                    <AboutIndex />
                </Suspense>
            } />
        </Routes>
    </BrowserRouter>
)

export default App
