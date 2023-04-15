import React from 'react';

interface MicrophoneButtonProps {
    isListening: boolean;
    onMouseDown: () => void;
    onMouseUp: () => void;
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ isListening, onMouseDown, onMouseUp }) => {
    const bgColor = isListening ? 'bg-red-500' : 'bg-gray-700';

    return (
        <button
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            className={`w-24 h-24 flex justify-center items-center rounded-full text-4xl border-none focus:outline-none ${bgColor}`}
        >
            🎤
        </button>
    );
};

export default MicrophoneButton;
