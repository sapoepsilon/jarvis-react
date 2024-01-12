import React, { useState } from 'react';

interface TextFieldProps {
  onTranscriptUpdate: (transcript: string) => void;
  onEnterPress?: () => void; // Optional prop for the Enter key function
}

const TextField: React.FC<TextFieldProps> = ({ onTranscriptUpdate, onEnterPress }) => {
  const [transcript, setTranscript] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTranscript(event.target.value);
    onTranscriptUpdate(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onEnterPress) {
      onEnterPress();
      setTranscript('');
    }
  };

  return (
      <div className="flex-grow items-center justify-center bg-transparent bg-opacity-50 border border-black hover:border-gray-200 transition duration-300 hover:shadow rounded backdrop-blur-md">
        <input
          type="text"
          value={transcript}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 rounded text-black bg-transparent "
          placeholder="Enter text here"
        />
      </div>
    );
};

export default TextField;
