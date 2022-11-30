import { PropsWithChildren } from "react"
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom"
import { NotFound } from "../pages/NotFound"


export const BaseLayout: React.FC<PropsWithChildren<{}>> = () => {
    const availableLang = ['ja', 'en', 'fr', 'ko']
    const params = useParams()
    if (params.lang && availableLang.includes(params.lang)) {
        return <main><Outlet /></main>
    }
    return (<NotFound />)
}
