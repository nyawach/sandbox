import { parse, Args } from "https://deno.land/std@0.66.0/flags/mod.ts"

const exec = async (cmd: string[]) => {
  const piped = Deno.run({
    cmd,
    stdout: "piped",
  })
  const output = await piped.output()
  const decoded = (new TextDecoder()).decode(output)
  return decoded
}

type CommandArgs = Args & {
  _: string
  target: string,
  t: string
}

;(async () => {
  const { _, target, t } = parse(Deno.args) as CommandArgs
  const getCurrentBranch = async () => {
    const branch = await exec(["git", "symbolic-ref", "--short", "HEAD"])
    return branch.replace(/\n/g, "")
  }

  const branch = _[0]
  ? _[0]
  : target
    ? target
    : t
      ? t
      : await getCurrentBranch()

  const result = await exec(["git", "reflog", "--date=iso", "--pretty='%gd %gs'", "--date=format:'%Y-%m-%d %H:%M:%S'"])
  const lines = result.split(/\n/g)
  const checkouts = lines
    .filter(line => /checkout\:/g.test(line))

  const targets = checkouts
    .filter(line => {
      return line.includes(branch)
    })
    .reverse()

  const data = targets.map(t => {
    // NOTE: 'HEAD@{'2021-05-29 12:49:29'} checkout: moving from master to feature/0010-deno-git'
    const matched = t.match(/HEAD\@\{\'(.+)\'\}.+from\s(.+)\sto\s(.+)\'/i)
    if(!matched?.length) return
    const [_, time, from, to] = matched
    return {
      time,
      from,
      to,
    }
  })

  console.log(data)

  if(branch === null) {
    Deno.exit(1)
  }

})();
