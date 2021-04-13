import * as React from 'react'
import Character from './Character'

const App: React.FC = () => {
  const characters = '吾輩は猫である。名前はまだない。'
  return (
    <main>
      {characters.split('').map((c,i) => (
        <Character char={c} key={i} />
      ))}
    </main>
  )
}

export default App
