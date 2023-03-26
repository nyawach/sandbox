import { FC, useState } from 'react';

type RecordButtonProps = {
  onDataAvailable: (data: Blob) => void;
}

const RecordButton: FC<RecordButtonProps> = ({ onDataAvailable }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const options = { mimeType: 'audio/webm' }
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener('dataavailable', (event) => {
      onDataAvailable(event.data);
    });

    setMediaRecorder(mediaRecorder);
    setRecording(true);

    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
      setRecording(false);
    }
  };

  const handleClick = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <button onClick={handleClick}>{recording ? 'Stop Recording' : 'Start Recording'}</button>
  );
};

export default RecordButton;
