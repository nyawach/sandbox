import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration.js'
import utc from 'dayjs/plugin/utc.js'
import {$, cd} from 'zx'
import cac from 'cac'

dayjs.extend(utc)
dayjs.extend(duration)

$.verbose = false

const forEachTwo = <T>(list: T[], fn: (current: T, next: T) => unknown) => {
  list.forEach((current, i) => {
    if (i + 1 >= list.length) return false
    const next = list[i + 1]
    fn(current, next)
  })
}

const exec = async () => {

  const currentBranch = await $`git symbolic-ref --short HEAD`

  if(currentBranch.stderr.length > 0){
    throw new Error("git working tree is dirty.")
  }

  const branch = currentBranch.stdout.trim()

  const changes = await $`git reflog --date=iso --pretty='%gd %gs' --date=format:'%Y-%m-%d %H:%M:%S'`

  const lines = changes.stdout.split(/\n/g)

  const checkouts = lines
    .filter(line => /checkout\:/g.test(line))
    .reverse()

  // NOTE: 'HEAD@{'2021-05-29 12:49:29'} checkout: moving from master to feature/0010-deno-git'
  const regex = /HEAD\@\{(.+)\}.+from\s(.+)\sto\s(.+)/i

  const data = checkouts
    .filter(checkout => {
      const matched = checkout.match(regex)
      return !!matched?.length
    })
    .map(checkout => {
      const matched = checkout.match(regex)
      if(!matched?.length) {
        return {
          time: '',
          from: '',
          to: '',
        }
      }
      const [_, time, from, to] = matched
      return {
        time,
        from,
        to,
      }
    })

  type Time = {
    duration: number
    startAt: string
    endAt: string
  }
  const records: Record<string, Time> = {}

  forEachTwo(data, (current, next) => {
    const name = next.from
    const diff = dayjs(next.time).diff(dayjs(current.time))
    if (!records[name]) {
      records[name] = {
        duration: 0,
        startAt: current.time,
        endAt: next.time,
      }
    }
    records[name].duration += diff
    records[name].endAt = next.time
  })

  const results = Object.entries(records).map(([name, item]) => {
    const d = dayjs.duration(item.duration)
    const time = dayjs.utc(d.asMilliseconds()).format(`${d.days()}[d] HH:mm`)
    const result = {
      name,
      time,
      ...item,
    }
    return result
  })

  console.table(results, ['name', 'time'])
}

const cli = cac()

cli.command("[dir]", "analyse git in this directory").action(async (dir) => {
  cd(dir)
  await exec()
})

cli.help()
cli.version("0.0.0")
cli.parse()
