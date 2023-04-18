import React, {useState, useEffect, useRef} from 'react';
import MessageList from '../components/MessageList';
import MicrophoneButton from '../components/MicrophoneButton';
import SendButton from '../components/SendButton';
import 'tailwindcss/tailwind.css';
import {isLineTerminator} from "sucrase/dist/types/parser/traverser/util";
import ClearButton from "@/components/ClearButton";
import VoiceVisualizer from "@/components/CircularAnimation";
import useMicrophoneVolume from "@/hooks/useMicrophoneVolume";

const Home: React.FC = () => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);
    const [isSupported, setIsSupported] = useState<boolean>(true);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const value = useMicrophoneVolume();

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();

            if (recognitionRef.current) {
                recognitionRef.current.continuous = true;
                recognitionRef.current.interimResults = true;

                let interimTranscript = '';
                let eachTranscript = '';
                recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
                    const isSamsungBrowser = navigator.userAgent.match(/SamsungBrowser/i);
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        const transcript = event.results[i][0].transcript;

                        if (event.results[i].isFinal) {
                            if (!isSamsungBrowser || (isSamsungBrowser && i === event.results.length - 1)) {
                                setTranscript(transcript);
                            } else {
                                interimTranscript += transcript;
                                setTranscript(interimTranscript);
                            }
                        } else {
                            if (!isSamsungBrowser || (isSamsungBrowser && i === event.results.length - 1)) {
                                setTranscript(transcript);
                            } else {
                                eachTranscript += transcript;
                                setTranscript(interimTranscript + eachTranscript);
                            }
                        }
                    }
                    eachTranscript = '';

                };


                recognitionRef.current.onend = () => {
                    console.log("recognition ended");
                    setIsListening(false);
                };
            }

        } else {
            alert('SpeechRecognition is not supported in this browser. Please use Chrome or Safari.');
            console.error('SpeechRecognition is not supported in this browser.');
            setIsSupported(false);
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

    const handleClearClick = () => {
        setTranscript('');
        setMessages([]);
    };

    const handleSendClick = () => {
        console.log("clicked send button")
        if (transcript.trim()) {
            setMessages((prevMessages) => [...prevMessages, transcript]);
            setTranscript('');
        }
    };

    typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="mb-5 w-full max-w-2xl">
                <MessageList messages={messages} interimTranscript={transcript} />
            </div>
            <div className="flex flex-wrap items-center w-full max-w-2xl">

                <button
                    className="bg-red-500 text-white px-3 py-2 focus:outline-none"
                    onClick={() => setTranscript('')}
                >
                    Clear
                </button>
                <SendButton onClick={() => handleSendClick()} />
                <MicrophoneButton
                    isListening={isListening}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                 voiceValue={value}/>
            </div>
        </div>
    );
};

export default Home;
