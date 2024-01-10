import React, { useState } from 'react';

interface TextFieldProps {
  onTranscriptUpdate: (transcript: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({ onTranscriptUpdate }) => {
  const [transcript, setTranscript] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTranscript(event.target.value);
    onTranscriptUpdate(event.target.value);
  };

  return (
    <div className="flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-md border border-gray-300 rounded">
      <input
        type="text"
        value={transcript}
        onChange={handleChange}
        className="flex-1 px-3 py-2 rounded border-transparent text-black bg-transparent focus:border-gray-300 focus:bg-white/30"
        placeholder="Enter text here"
      />
    </div>
  );
};

export default TextField;