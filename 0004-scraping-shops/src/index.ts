import puppeteer, { Page } from "puppeteer"
import dayjs from "dayjs"
import fs from 'fs'

const chunk = <T>(list: T[], n: number) => list.reduce<T[][]>((acc, item, i) => {
  const index = Math.floor(i / n)
  if(acc[index] === undefined) acc[index] = []
  acc[index].push(item)
  return acc
}, [])

const SITE_URL = "https://tabelog.com"

/**
 * サインイン
 */
const auth = async (page: Page) => {

  await page.goto(SITE_URL)

  const navigationPromise = page.waitForNavigation()

  /**
   * set cookies
   * @see https://qiita.com/vicugna-pacos/items/a52e22d08856d1041316
   */
  const content = fs.readFileSync("cookie.json", 'utf-8')
  const cookie = JSON.parse(content)

  await page.setCookie(...cookie)

  await page.reload()

  await navigationPromise

  return page
}

/**
 * 投稿のURLを取得する
 */
const urls: string[] = []

const getPosts = async (page: Page): Promise<string[]> => {
  await page.waitForSelector(".rvw-item .c-rating-v2__val")
  const $next = (await page.$$('a.c-pagination__arrow[rel="next"]'))
  const $shops = (await page.$$(".rvw-item"))

  const getPostDetaulUrlPromises = $shops.map(async $shop => {
    const url = await $shop.$eval(
      '.p-preview-visit--score',
      (item: Element) => item.getAttribute('data-detail-url')
    ).catch((err) => {
      console.error(err)
      return null
    })
    return url
  })

  const newUrls = await Promise.all(getPostDetaulUrlPromises)

  if(newUrls.length <= 0) return urls

  urls.push(...newUrls)

  if($next.length <= 0) return urls

  await $next[0].click()
  return await getPosts(page)
}

type Shop = {
  name: string
  rating?: string
  date?: dayjs.Dayjs | string
  comment?: string
  images: string[]
  location: string
}

/**
 * サイト内のShopデータを取得する
 */
const getShops = async (page: Page, url: string): Promise<Shop[]> => {
  const postSelector = ".rvw-item__review-contents-wrap"

  await page.goto(`${SITE_URL}${url}`)
  await page.waitForSelector(postSelector)

  const name     = (await page.$eval(".rvw-item__rst-name", elm => elm.textContent))?.trim()
  const location = (await page.$eval(".rvw-item__rst-area-catg", elm => elm.textContent))?.trim()

  const $posts = (await page.$$(postSelector))

  const shops: Shop[] = await Promise.all(
    $posts.map(async $post => {
      const rating  = (await $post.$eval(".c-rating-v2__val", elm => elm.textContent).catch(err => {
        console.error(err)
        return ''
      }))
      const date    = (await $post.$eval(".rvw-item__visited-date", elm => elm.textContent).catch(err => {
        console.error(err)
        return ''
      }))?.replace(/訪問/g, "").trim()
      const images  = (await $post.$$eval(".rvw-photo__list-img img", elements => elements.map((elm: HTMLImageElement) => elm.src)).catch(err => {
        console.error(err)
        return []
      }))
      const comment = (await $post.$eval(".rvw-item__rvw-comment p", elm => elm.textContent).catch(err => {
        console.error(err)
        return ''
      }))?.trim()
      return {
        name,
        location,
        rating,
        comment,
        images,
        date: dayjs(date).isValid() ? dayjs(date).toISOString() : null,
      }
    })
  )

  return shops
}

(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = (await browser.pages())[0]
  try {
    await auth(page)

    await page.goto("https://tabelog.com/rvwr/010252527/visited_restaurants/list/")

    // const urls = await getPosts(page)
    // fs.writeFileSync("urls.json", JSON.stringify(urls, null, 4))

    const urls = JSON.parse(fs.readFileSync("urls.json", 'utf-8')) as string[]
    const allShops: Shop[] = []
    const chunked = chunk(urls, 20)
    for await (const chunkUrls of chunked) {
      const shops = await Promise.all(chunkUrls.map(async url => {
        const p = await browser.newPage()
        const _shops =  await getShops(p, url)
        await p.close()
        return _shops
      }))
      allShops.push(...shops.flat())
    }

    // const shops = (await Promise.all(urls.map(async url => await getShops(page, url)))).flat()
    fs.writeFileSync("output.json", JSON.stringify(allShops, null, 4))

    await browser.close()
  }
  catch(err) {
    await browser.close()
    throw err
  }
})();
