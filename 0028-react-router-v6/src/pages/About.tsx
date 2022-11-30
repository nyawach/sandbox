import { PropsWithChildren } from "react"
import { useParams } from "react-router-dom"

export const About: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const params = useParams()
    return (
        <main>
            <h1>About { params.lang }</h1>
            <div>{children}</div>
        </main>
    )
}
