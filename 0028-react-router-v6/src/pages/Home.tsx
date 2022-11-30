import { PropsWithChildren } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const Home: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const params = useParams()
    const navigate = useNavigate()
    return (
        <main>
            <h1>Home { params.lang }</h1>
            <div>{children}</div>
            <button onClick={() => navigate('/ja')}>ja</button>
            <button onClick={() => navigate('/en')}>en</button>
            <button onClick={() => navigate('/ko')}>ko</button>
        </main>
    )
}
