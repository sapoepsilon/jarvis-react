import React, {useState, useEffect, useRef} from 'react';
import MessageList from '../components/MessageList';
import MicrophoneButton from '../components/MicrophoneButton';
import SendButton from '../components/SendButton';
import 'tailwindcss/tailwind.css';
import useMicrophoneVolume from "@/hooks/useMicrophoneVolume";
import ScrollableView from "@/components/ScrollableView";

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
                            if (isSamsungBrowser || (isSamsungBrowser && i === event.results.length - 1)) {
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
                    setTranscript('');
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
            handleSendClick();
        }
    };

    const handleClearClick = () => {
        setTranscript('');
        console.log("transcript cleared" + transcript);
        setTranscript('');
    };

    const handleSendClick = () => {
        console.log("clicked send button")
        if (transcript.trim()) {
            handleSubmit(transcript).then(r => console.log(r));
            setMessages((prevMessages) => [...prevMessages, transcript]);
            setTranscript('');
        }
    };

    const handleSubmit = async (request: String) => {
        const res = await fetch("/api/chatgpt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: transcript }),
        });

        if (res.ok) {
            const data = await res.json();
            alert(data.data.choices[0].text);
        } else {
            console.error("Error fetching ChatGPT response");
        }
    };

    typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
            <ScrollableView>
                <div className="mb-5 w-full max-w-2xl">
                    <MessageList messages={messages} interimTranscript={transcript}/>
                </div>
            </ScrollableView>
            <div className="flex flex-wrap justify-between items-center w-full max-w-2xl space-x-4">
                <SendButton onClick={() => handleSendClick()}/>
                <MicrophoneButton
                    isListening={isListening}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    voiceValue={value}/>
                <button
                    className="bg-red-500 text-white px-3 py-3 rounded focus:outline-none"
                    onClick={() => handleClearClick()}
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default Home;
