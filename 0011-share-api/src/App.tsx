import React, { ChangeEvent, useState } from 'react'
import './App.css'

const share = async (data: ShareData & { files: File[] }) => {
  if(!navigator.share) {
    throw new Error('This browser is not supported Web Share API')
  }
  await navigator.share(data)
}

function App() {

  const [imageFile, setImageFile] = useState<File | undefined>()

  const handleClickShare = async () => {
    try {
      if(!imageFile) throw new Error('no image file')
      await share({title: 'テスト', text: 'テキスト', url: 'https://example.com', files: [imageFile]})
    }
    catch(e) {
      console.error(e)
      alert(e.message)
    }
  }

  const handleChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    if(!evt.target.files || !evt.target.files[0]) return
    setImageFile(evt.target.files[0])
  }

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <div>
        <button onClick={handleClickShare}>Share Image</button>
      </div>
      <div>
        <input type="file" accept="image/png, image/jpeg, image/gif" onChange={handleChange} />
      </div>
    </div>
  )
}

export default App
