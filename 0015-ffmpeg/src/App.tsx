import React, { useEffect, useState } from 'react'
import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg'

const  App = () => {
  const [ffmpeg, setFFmpeg] = useState<FFmpeg | null>(null)
  const [message, setMessage] = useState('')
  const [videoSrc, setVideoSrc] = useState('')

  useEffect(() => {
    if (!ffmpeg) {
      setFFmpeg(createFFmpeg({ log: true }))
    }
  }, [ffmpeg])

  const transcode: React.ChangeEventHandler<HTMLInputElement> = async ({ target: { files } }) => {
    if (!ffmpeg) return
    if (!files) return
    const { name } = files[0]
    setMessage('Loading ffmpeg-core.js')
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load()
    }
    ffmpeg.FS('writeFile', name, await fetchFile(files[0]))
    setMessage('Start transcoding')
    await ffmpeg.run('-i', name,  'output.mp4')
    setMessage('Complete transcoding')
    const data = ffmpeg.FS('readFile', 'output.mp4')

    setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })))
  }
  
  const cancel = () => {
    if (!ffmpeg) return
    try {
      ffmpeg.exit()
    } catch(e) {}
    setFFmpeg(null)
  }

  return (
    <div className="App">
      <h3>Upload a video to transcode to mp4 (x264) and play!</h3>
      <video id="output-video" controls src={videoSrc}></video><br/>
      <input type="file" id="uploader" onChange={transcode} />
      <button onClick={cancel}>Cancel</button>
      <p id="message">{message}</p>
    </div>
  )
}

export default App
