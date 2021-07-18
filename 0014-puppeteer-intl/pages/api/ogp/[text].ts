import { NextApiHandler } from "next"
import { sendData, sendError } from "next/dist/next-server/server/api-utils"
import puppeteer from 'puppeteer'

type Props = {
  text?: string
}

async function generateImage(host: string, { text }: Props) {

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setViewport({ width: 1200, height: 630 })

  await page.goto(`http://${host}/ogp/${text}`, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('[data-deferred-content]')

  // ページ内の画像やフォントの読み込みまち
  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll("img"))
    await Promise.all([
      (document as any).fonts.ready,
      ...selectors.map((img) => {
        if (img.complete) {
          if (img.naturalHeight !== 0) return
          throw new Error("Image failed to load")
        }
        return new Promise((resolve, reject) => {
          img.addEventListener("load", resolve)
          img.addEventListener("error", reject)
        })
      }),
    ])
  })

  // 画像のbuffer返す
  const screenshotBuffer = await page.screenshot({
    fullPage: false,
    type: "png",
  })

  await page.close()

  return screenshotBuffer
}

const handler: NextApiHandler = async (req, res) => {
  const text = req.query.text

  if (text instanceof Array) {
    sendError(res, 422, 'Unprocessable Entity')
    return
  }

  try {
    const host = req.headers['host']
    const image = await generateImage(host, { text })

    res.statusCode = 200
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`)
    sendData(req, res, image)
  }
  catch(err) {
    console.error(err)
    sendError(res, 500, 'Internal Server Error')
  }
}

export default handler
