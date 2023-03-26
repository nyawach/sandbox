import AudioPlayer from "@/components/AutdioPlayer";
import RecordButton from "@/components/RecordButton";
import { TextWriter } from "@/components/TextWriter";
import { useSendAudio } from "@/hooks/use-send-audio";
import { NextPage } from "next"
import { useState } from "react";

const IndexPage: NextPage = () => {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const handleDataAvailable = (data: Blob) => {
    setAudioBlob(data);
    handleBlob(data);
  }
  const { sendAudio, handleBlob, convertedText } = useSendAudio()

  return (
    <div>
      <button onClick={sendAudio} >
        Send Audio
      </button>
      <RecordButton onDataAvailable={handleDataAvailable} />
      <AudioPlayer audioBlob={audioBlob} />
      {convertedText && <TextWriter text={convertedText} delay={10} />}
    </div>
  )
}

export default IndexPage
