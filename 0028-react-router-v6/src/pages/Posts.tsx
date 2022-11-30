import { PropsWithChildren } from "react"
import { Outlet, useParams } from "react-router-dom"

export const Posts: React.FC<PropsWithChildren<{}>> = () => {
    const params = useParams()
    return (
        <main>
            <h1>Posts { params.lang }</h1>
            <Outlet />
        </main>
    )
}
