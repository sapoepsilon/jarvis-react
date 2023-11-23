// components/VoiceRecorder.tsx
import { sendAudioFile } from '@/pages/api/sendAudioFile';
import React, { useState, useEffect } from 'react';


interface VoiceRecorderProps {
  // You can add additional props if needed
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');

  useEffect(() => {
    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        const audioChunks: BlobPart[] = [];
        recorder.ondataavailable = (event: BlobEvent) => {
          audioChunks.push(event.data);
        };

        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks);
          await sendAudioFile(audioBlob);
          setAudioUrl(URL.createObjectURL(audioBlob));
        };
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    }

    getMedia();

    // Cleanup function to delete the file on close
    const cleanup = () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };

    window.addEventListener('beforeunload', cleanup);

    return () => {
      window.removeEventListener('beforeunload', cleanup);
    };
  }, [audioUrl]);

  const startRecording = () => {
    mediaRecorder?.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setRecording(false);
  };

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>Record</button>
      <button onClick={stopRecording} disabled={!recording}>Stop</button>
      {audioUrl && <audio src={audioUrl} controls />}
    </div>
  );
};

export default VoiceRecorder;
