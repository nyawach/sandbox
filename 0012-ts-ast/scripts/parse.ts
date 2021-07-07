import * as ts from 'typescript'
import * as path from 'path'
import * as fs from 'fs'

;(async () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../stories/atoms/Badge.stories.ts'), 'utf-8')
  const sourceFile = ts.createSourceFile('output.ts', source, ts.ScriptTarget.ES2020)
  const unique = new Set()
  sourceFile.forEachChild(node => {
    unique.add(ts.SyntaxKind[node.kind])
  })
  console.log(unique)
})();
