import { FC, useRef } from 'react';

interface AudioPlayerProps {
  audioBlob: Blob | null;
}

const AudioPlayer: FC<AudioPlayerProps> = ({ audioBlob }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!audioBlob) {
    return null;
  }

  const audioUrl = URL.createObjectURL(audioBlob);

  return (
    <div>
      <audio ref={audioRef} src={audioUrl} controls />
    </div>
  );
};

export default AudioPlayer;
