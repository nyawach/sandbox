import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import OgpLayout from '../../components/OgpLayout'
import styles from './[text].module.css'

const IndexPage = () => {
  const router = useRouter()
  const [text, setText] = useState('')

  const [segments, setSegments] = useState<string[]>([])

  useEffect(() => {
    if(!router.isReady) return
    const t = router.query.text
    if (t instanceof Array) return null
    setText(t)
  }, [router.query])

  useEffect(() => {
    if(!(Intl as any).Segmenter) return
    const segmenter = new (Intl as any).Segmenter("ja", {granularity: "word"})
    const _segments = Array.from(segmenter.segment(text)).map((seg: any) => seg.segment)
    setSegments(_segments)
  }, [text])

  return (
    <OgpLayout title={text}>
      <div className={styles.content}>
        <h1>
          {segments.map((segment, index) => (
            <span
              className={styles.word}
              key={index}
              data-deferred-content
            >{segment}</span>
          ))}
        </h1>
      </div>
    </OgpLayout>
  )
}

export default IndexPage
