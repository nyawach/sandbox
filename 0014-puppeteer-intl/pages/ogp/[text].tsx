import { useRouter } from 'next/dist/client/router'
import OgpLayout from '../../components/OgpLayout'

const IndexPage = () => {
  const router = useRouter()
  const text = router.query.text
  if (text instanceof Array) return null
  return (
    <OgpLayout title={text}>
      <h1>{text}</h1>
    </OgpLayout>
  )
}

export default IndexPage
