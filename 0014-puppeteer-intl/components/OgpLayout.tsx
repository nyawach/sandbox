import React, { ReactNode } from 'react'
import Head from 'next/head'
import styles from  './Ogp.module.css'

type Props = {
  children?: ReactNode
  title?: string
}

const OgpLayout = ({ children, title = 'This is the default title' }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap.css" />
    </Head>
    <div className={styles.ogp}>{children}</div>
  </>
)

export default OgpLayout
