import Link from 'next/link'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <LinkButton></LinkButton>
    </p>
  </Layout>
)

export default IndexPage
