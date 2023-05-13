import React, {useState, useEffect, useRef} from 'react';
import MicrophoneButton from '../components/MicrophoneButton';
import SendButton from '../components/SendButton';
import 'tailwindcss/tailwind.css';
import useMicrophoneVolume from "@/hooks/useMicrophoneVolume";
import ScrollableView from "@/components/ScrollableView";
import chatGPT from "@/pages/api/chatGPT";
import MessageList from "@/components/MessageList";
import {MessageInterface} from "../interfaces/Message";
import {elevenlabs_getVoices, elevenlabs_request} from "@/pages/api/elevenlabs";
import {generateDeviceFingerprint} from "@/hooks/fingerprint";

const Home: React.FC = () => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>('');
    const [messages, setMessages] = useState<MessageInterface[]>([]);
    const [isSupported, setIsSupported] = useState<boolean>(true);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const value = useMicrophoneVolume();

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        generateDeviceFingerprint().then((fingerprint: string) => {
            // Use the fingerprint value as needed (e.g., send it to the server)
            console.log(fingerprint);
        });
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();

            if (recognitionRef.current) {
                recognitionRef.current.continuous = true;
                recognitionRef.current.interimResults = false;

                let interimTranscript = '';
                let eachTranscript = '';
                recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
                    const isSamsungBrowser = navigator.userAgent.match(/SamsungBrowser/i);
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        const transcript = event.results[i][0].transcript;
                        if (event.results[i].isFinal) {
                            interimTranscript += transcript;
                            setTranscript(interimTranscript);
                            interimTranscript = '';
                        } else {
                            eachTranscript += transcript;
                            setTranscript(interimTranscript + eachTranscript);
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
            const userMessage: MessageInterface = createMessage(transcript, true, false);
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            handleSubmit().then(r => console.log(r));
            setTranscript('');
        }
    };

    const handleSubmit = async () => {
        if (!transcript) return;
        const gptResponse = await chatGPT(transcript);
        // @ts-ignore
        const gptMessage: MessageInterface = createMessage(gptResponse, false, false);
        setMessages((prevMessages) => [
            ...prevMessages,
            gptMessage
        ]);
        // @ts-ignore
        await elevenlabs_request(gptResponse, "PjOz2N4u2h6AEZecKtW6");
    };

    function createMessage(text: string, isMe: boolean, isInterim: boolean): MessageInterface {
        return {
            text,
            isMe,
            isInterim
        }
    }

    typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    return (
        <div className="flex flex-col items-center min-h-screen bg-app-background min-w-200">
            <ScrollableView>
                <div className="mb-5 w-full">
                    <MessageList messages={messages} interimTranscript={transcript}/>
                </div>
            </ScrollableView>
            <div className="text-white">
                {transcript}
            </div>
            <div className="flex flex-wrap pt-2 justify-between items-center w-full max-w-2xl space-x-4">
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
