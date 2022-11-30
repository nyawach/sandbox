import { PropsWithChildren } from "react"
import { Outlet, useParams } from "react-router-dom"

export const Post: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const params = useParams()
    return (
        <main>
            <h2>Post Id: {params.postId}</h2>
        </main>
    )
}
