import puppeteer from "puppeteer-extra"
import { Page } from "puppeteer-extra/dist/puppeteer"
import pluginStealth from "puppeteer-extra-plugin-stealth"
import dayjs from "dayjs"
import fs from 'fs'

puppeteer.use(pluginStealth())

/**
 * - Google サインイン
 */
const auth = async (page: Page) => {

  const navigationPromise = page.waitForNavigation()

  /**
   * set cookies
   * @see https://qiita.com/vicugna-pacos/items/a52e22d08856d1041316
   */
  const content = fs.readFileSync("cookie.json", 'utf-8')
  const cookie = JSON.parse(content)

  await page.setCookie(...cookie)
  await page.goto("https://tabelog.com/rvwr/010252527/visited_restaurants/list?msu=010252527&review_content_exist=0&PG=1&from_search=&voluntary_search=1&SrtT=lvd&Srt=D&sort_mode=&from_search_form=1&lid=&pcd=0&Cat=MC&LstCat=0&RdoCosTp=2&LstCos=0&LstCosT=0&LstRev=0&sw=&LstKind=01&LstReserve=0&LstSmoking=0")

  await navigationPromise

  return page
}


type Shop = {
  name: string
  rating: string
  myRating: string
  date?: dayjs.Dayjs | string
  url: string
  image: string
  location: string
}

const selectors = {
  name: {
    value: ".simple-rvw__rst-name-target",
    fn: (item: Element) => item.textContent,
  },
  rating: {
    value: ".simple-rvw__rate b.c-rating__val",
    fn: (item: Element) => item.textContent,
  },
  myRating: {
    value: ".p-preview-visit b.c-rating-v2__val",
    fn: (item: Element) => item.textContent,
  },
  date: {
    value: ".p-preview-visit__visited-date",
    fn: (item: Element) => item.textContent,
  },
  url: {
    value: ".simple-rvw__rst-name-target",
    fn: (item: HTMLAnchorElement) => item.href,
  },
  image: {
    value: ".simple-rvw__rst-img img",
    fn: (item: HTMLImageElement) => item.src,
  },
  location: {
    value: ".simple-rvw__area-catg",
    fn: (item: Element) => item.textContent.trim(),
  }
}

const shops: Shop[] = []

const getShops = async (page: Page): Promise<Shop[]> => {
  await page.waitForSelector(".rvw-item")

  const $shops = (await page.$$(".rvw-item"))

  const getInfoPromises = $shops.map(async $shop => {
    const shop: Shop = {
      name: "",
      rating: "",
      myRating: "",
      date: null,
      url: "",
      image: "",
      location: "",
    }
    const promises = Object.entries(selectors).map(async ([key, selector]: [string, {value: string, fn: (e: Element) => string}]) => {
      (shop as any)[key] = await $shop.$eval(selector.value, selector.fn).catch((err) => console.error(err))
      return shop
    }, shop)

    await Promise.all(promises)

    return shop
  })

  const _shops = (await Promise.all(getInfoPromises))
    .map(({name, date, rating, myRating, url, image, location}) => {
      const _date = date != null ? (date as string).replace(/訪問/g, "") : null
      const _name = name.trim()
      return {
        name: _name,
        rating,
        myRating,
        date: _date && dayjs(_date).isValid ? dayjs(_date).toISOString() : null,
        url,
        image,
        location,
      }
    })

  if(_shops.length <= 0) return shops

  shops.push(..._shops)

  const $next = (await page.$$('a.c-pagination__arrow[rel="next"]'))
  if($next.length <= 0) return shops
  await $next[0].click()
  return await getShops(page)
}

(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = (await browser.pages())[0]
  try {
    const listPage = await auth(page)
    const shops = await getShops(listPage)
    await browser.close()

    fs.writeFileSync("output.json", JSON.stringify(shops, null, 4))
  }
  catch(err) {
    // await browser.close()
    throw err
  }
})();
