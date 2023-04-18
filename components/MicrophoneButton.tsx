import React from "react";
import VoiceVisualizer from "@/components/CircularAnimation";
import CircularAnimation from "@/components/CircularAnimation";
import VoiceRecognitionAnimation from "@/components/CircularAnimation";

const MicrophoneButton = ({
                              voiceValue,
                              isListening,
                              onMouseDown,
                              onMouseUp,
                          }: {
    voiceValue: number;
    isListening: boolean;
    onMouseDown: () => void;
    onMouseUp: () => void;
}) => {
    const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onMouseDown();
    };

    const handleTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onMouseUp();
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <VoiceRecognitionAnimation
                size={200}
                waveColor="#4B5563"
                value={isListening ? voiceValue : 0}
            >
                <button
                    className={`w-16 h-16 rounded-full focus:outline-none select-none ${
                        isListening ? 'bg-red-600' : 'bg-gray-600'
                    }`}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchEnd}
                >
                    🎤
                </button>
            </VoiceRecognitionAnimation>
        </div>
    );
};

export default MicrophoneButton;
