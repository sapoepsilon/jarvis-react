import React, { useState, useEffect } from 'react';
import CircularAnimation from "@/components/CircularAnimation";
import { sendAudioFile } from '@/pages/api/sendAudioFile';

const MicrophoneButton = ({ onTranscriptUpdate }: { onTranscriptUpdate: (transcript: string) => void }) => {  const [isListening, setIsListening] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [voiceValue, setVoiceValue] = useState<number>(0); // Adjust this as needed for animation
  const [transcript, setTranscript] = useState<string>(''); // Add this line to manage the transcript
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
          const transcriptText = await sendAudioFile(audioBlob);
          onTranscriptUpdate(transcriptText);
          // setAudioUrl(URL.createObjectURL(audioBlob));
          audioChunks.length = 0;
        };
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    }

    getMedia();

    const cleanup = () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };

    window.addEventListener('beforeunload', cleanup);

    return () => {
      window.removeEventListener('beforeunload', cleanup);
    };
  }, [audioUrl]);

  const handleMouseDown = () => {
    if (mediaRecorder && mediaRecorder.state === 'inactive') {
      mediaRecorder.start();
      setIsListening(true);
    }
  };
  
  const handleMouseUp = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsListening(false);
    }
  };
  

  const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleMouseDown();
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleMouseUp();
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <CircularAnimation
        size={200}
        waveColor="#4B5563"
        value={isListening ? voiceValue : 0}
      >
        <button
          className={`px-9 py-3 rounded-full focus:outline-none select-none ${
            isListening ? 'bg-red-600' : 'hover:bg-blue-300 bg-gray-600'
          } `}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          🎤
        </button>
      </CircularAnimation>
      {audioUrl && <audio src={audioUrl} controls />}
    </div>
  );
};

export default MicrophoneButton;
