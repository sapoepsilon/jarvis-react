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
import {Fingerprint} from "@/interfaces/FingerprintModel";
import FingerprintService from "@/pages/api/fingerprint_service";
import Fingerprint_service from "@/pages/api/fingerprint_service";

const Home: React.FC = () => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>('');
    const [messages, setMessages] = useState<MessageInterface[]>([]);
    const [isSupported, setIsSupported] = useState<boolean>(true);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const value = useMicrophoneVolume();
    const fingerprintService = new FingerprintService();
    const [fingerprintData, setFingerprintData] = useState<Fingerprint | null>(null);

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
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
            } else {
                alert("Error initializing")
            }

        } else {
            alert('SpeechRecognition is not supported in this browser. Please use Chrome or Safari.');
            console.error('SpeechRecognition is not supported in this browser.');
            setIsSupported(false);
        }

        const fetchRequestAmount = async () => {
            const r = await fingerprintService.fetchFingerprintData();
            const timestampInMilliseconds = r.fingerprintValue.date.seconds * 1000 + r.fingerprintValue.date.nanoseconds / 1000000;
            const date = new Date(timestampInMilliseconds);
            const fingerprint: Fingerprint = {
                fingerprint: r.fingerprintValue.fingerprint,
                values: r.fingerprintValue.values,
                date: date
            }
            setFingerprintData(fingerprint);
            console.log("fingerprint date: " + fingerprint.date);

        }

        fetchRequestAmount();

        for (let finger in fingerprintData) {
            console.log(finger + " " + fingerprintData[finger])
        }
        if(fingerprintData?.values >= 5 ) {
            alert("You have reached the maximum amount of requests for today. Please try again tomorrow.");
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
        if (transcript.trim()) {
            const userMessage: MessageInterface = createMessage(transcript, true, false);
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            handleSubmit().then(r => console.log(r));
            setTranscript('');
        }
    };

    const handleSubmit = async () => {
        if (!transcript) return;
        // const gptResponse = await chatGPT(transcript);
        // // @ts-ignore
        // const gptMessage: MessageInterface = createMessage(gptResponse, false, false);
        // setMessages((prevMessages) => [
        //     ...prevMessages,
        //     gptMessage
        // ]);
        // @ts-ignore
        // await elevenlabs_request(gptResponse, "PjOz2N4u2h6AEZecKtW6");

        generateDeviceFingerprint().then(async (fingerprint: string) => {


            const today: Date = new Date();
            const fingerprintDate =  new Date(fingerprintData.date);
            console.log("today: " + today.getDay());
            console.log("fingerprint date day: " + fingerprintDate.getDay());

            if (fingerprintDate.getDay() == today.getDay()) {
                console.log("trying to add date to existing fingerprint...")
                await fingerprintService.addDateToFingerprint(fingerprint, today, fingerprintData.values + 1).then(r => console.log(r));
            } else {
                console.log("trying to add date to fingerprint...")
                fingerprintService.addDateToFingerprint(fingerprint, today, 1).then(r => console.log(r));
            }
        });
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
