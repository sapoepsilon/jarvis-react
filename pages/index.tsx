import React, { useState, useEffect, useRef } from 'react';
import MessageList from '../components/MessageList';
import MicrophoneButton from '../components/MicrophoneButton';
import SendButton from '../components/SendButton';
import 'tailwindcss/tailwind.css';

const Home: React.FC = () => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();

            if (recognitionRef.current) {
                recognitionRef.current.continuous = true;
                recognitionRef.current.interimResults = true;0


                recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
                    let interimTranscript = '';

                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        const transcript = event.results[i][0].transcript;

                        if (!event.results[i].isFinal) {
                            console.log("transcript in: " + transcript);
                            interimTranscript += transcript;
                        }
                    }

                    setTranscript(interimTranscript);
                };
            }
        } else {
            alert('SpeechRecognition is not supported in this browser.');
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const handleMouseDown = () => {
        if (recognitionRef.current) {
            setIsListening(true);
            if (isListening) {
                return;
            }
            recognitionRef.current.start();
        }
    };

    const handleMouseUp = () => {
        if (recognitionRef.current) {
            setIsListening(false);
            recognitionRef.current.stop();
        }
    };

    const handleSendClick = () => {
        console.log("clicked send button")
        if (transcript.trim()) {
            setMessages((prevMessages) => [...prevMessages, transcript]);
            setTranscript('');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <div className="mb-5 w-full px-5">
                <MessageList messages={messages} interimTranscript={transcript} />
            </div>
            <div className="flex items-center">
                <input
                    type="text"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    className="w-72 px-3 py-2 mr-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    placeholder="Type your message"
                />
                <SendButton onClick={handleSendClick} />
            </div>
            <div className="mt-5">
                <MicrophoneButton isListening={isListening} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
            </div>
        </div>
    );
};

export default Home;
