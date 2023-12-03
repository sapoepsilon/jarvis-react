import React, {useState, useEffect, useRef} from 'react';
import MicrophoneButton from '../components/DemoPage/MicrophoneButton';
import SendButton from '../components/DemoPage/SendButton';
import 'tailwindcss/tailwind.css';
// import useMicrophoneVolume from "@/hooks/useMicrophoneVolume";
import ScrollableView from "@/components/DemoPage/ScrollableView";
import chatGPT from './api/chatGPT';
import MessageList from "@/components/DemoPage/MessageList";
import {MessageInterface} from "@/interfaces/Message";
// import {elevenlabs_getVoices, elevenlabs_request} from "@/pages/api/elevenlabs";
import {generateDeviceFingerprint} from "@/hooks/fingerprint";
import {Fingerprint} from "@/interfaces/FingerprintModel";
import FingerprintService from "@/pages/api/fingerprint_service";
import { send } from 'process';
import {toast} from "@/constants/debug_toast";
import {set} from "@firebase/database";
import Navbar from "@/components/navbar/NavBar";
// import VoiceRecorder from '@/components/utility/VoiceRecorder';

const Home: React.FC = () => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const handleTranscriptUpdate = (newTranscript: string) => {
        setTranscript(newTranscript ?? "");
        handleSendClick(newTranscript);
      };
      
    const [transcript, setTranscript] = useState<string>('');
    const [messages, setMessages] = useState<MessageInterface[]>([]);
    const [isSupported, setIsSupported] = useState<boolean>(true);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    // const value = useMicrophoneVolume();
    const fingerprintService = new FingerprintService();
    const [fingerprint, setFingerprint] = useState<Fingerprint | null>(null);
    const [isRecognitionDone, setRecognitionDone] = useState(false);
    const [sendTime, setSendTime] = useState<Date | null>(null);
    const today: Date = new Date();

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
                    setRecognitionDone(true);

                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        const transcript = event.results[i][0].transcript;
                        if (!event.results[i].isFinal) {
                            eachTranscript += transcript;
                            setTranscript(interimTranscript + eachTranscript);
                            console.log("trascript is set in is Final else")
                        } else {
                            interimTranscript += transcript;
                            setTranscript(interimTranscript);
                            console.log("ELSE")
                        }
                    }
                    eachTranscript = '';
                };
                recognitionRef.current.onend = () => {
                    console.log("recognition ended");
                    setIsListening(false);
                    setTranscript(interimTranscript);
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
            let r
            generateDeviceFingerprint().then(async (fingerprint: string) => {
                r = await fingerprintService.fetchFingerprintData(fingerprint);
                if (r != null || r != undefined) {
                    const timestampInMilliseconds = r.fingerprintValue.date.seconds * 1000 + r.fingerprintValue.date.nanoseconds / 1000000;
                    const date = new Date(timestampInMilliseconds);
                    const fingerprint: Fingerprint = {
                        fingerprint: r.fingerprintValue.fingerprint,
                        date: date,
                        values: r.fingerprintValue.values
                    }
                    setFingerprint(fingerprint);
                }
            });
        }
        fetchRequestAmount();
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    // const handleMouseDown = () => {
    //     // setRecognitionDone(false);
    //     // setTranscript("Recognizing your voice...")
    //     // if (recognitionRef.current) {
    //     //     setIsListening(true);
    //     //     if (isListening) {
    //     //         return;
    //     //     }
    //     //     recognitionRef.current.start();
    //     // }
    // };

    // const handleMouseUp = () => {
    //     if (recognitionRef.current) {
    //         setIsListening(false);
    //         recognitionRef.current.stop();
    //         handleSendClick();
    //     }
    // };

    const handleClearClick = () => {
        setTranscript('');
        console.log("transcript cleared" + transcript);
        setTranscript('');
    };

    const playSound = () => {
        const audio = new Audio("/bell.wav");
        audio.play().then(r => console.log("sound played"));
    };

    const handleSendClick = (newTranscript?: string) => {
        console.log("new transcript: " + newTranscript);
        const sendClickTime = new Date();
        console.log("sendClickTime: " + sendClickTime.getTime());
        setSendTime(sendClickTime);
        if (transcript != "Recognizing your voice..." && transcript != "" && fingerprint?.values < 5) {
            playSound();
        }
        let fingerprintDate = fingerprint?.date ? fingerprint.date : null;
        if (newTranscript!.trim()) {
            const userMessage: MessageInterface = createMessage(newTranscript!, true, false);
            handleSubmit(userMessage).then(r => console.log(r));
        } else {
            console.log("transcript is empty " + transcript)
        }
    };
    const removeLastMessage = () => {
        setMessages(messages.slice(0, -1));
    }
    const handleSubmit = async (userMessage: MessageInterface) => {
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setTranscript("");
        console.log("userMessage: " + userMessage.text)
        const gptResponse = await chatGPT(userMessage.text, sendTime ?? new Date());

        // @ts-ignore
        const gptMessage: MessageInterface = createMessage(gptResponse, false, false);
        // removeLastMessage()
        setMessages((prevMessages) => [
            ...prevMessages,
            gptMessage
        ]);
        // @ts-ignore
        // TODO: Use openAI TTS


        generateDeviceFingerprint().then(async (fingerprintValue: string) => {
            const fingerprintDate: Date | null = fingerprint?.date ? fingerprint.date : null;

            if (fingerprintDate?.getDay() == today.getDay()) {
                console.log("trying to add date to existing fingerprintValue...")
                await fingerprintService.addDateToFingerprint(fingerprintValue, today, fingerprint!.values + 1).then(r => console.log(r));
                const updateFingerprint: Fingerprint = {
                    fingerprint: fingerprintValue,
                    date: today,
                    values: fingerprint!.values + 1
                };
                setFingerprint(updateFingerprint);
            } else {
                console.log("trying to add date to fingerprintValue...")
                fingerprintService.addDateToFingerprint(fingerprintValue, today, 1).then(r => console.log(r));
                const updateFingerprint: Fingerprint = {fingerprint: fingerprintValue, date: today, values: 1};
                setFingerprint(updateFingerprint);
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
            <Navbar />
            <ScrollableView>
                <div className="w-full mb-5">
                    <MessageList messages={messages} interimTranscript={transcript}/>
                </div>
            </ScrollableView>
            <div className="flex items-center text-white">
                {isRecognitionDone || !transcript ? (
                    <div>{transcript}</div>
                ) : (
                    <>
                        <div>{transcript}</div>
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-wrap items-center justify-between w-full max-w-2xl pt-2 space-x-4">
                <SendButton onClick={() => handleSendClick()}/>
                <MicrophoneButton onTranscriptUpdate={handleTranscriptUpdate } />
                <button
                    className="px-3 py-3 text-white bg-red-500 rounded focus:outline-none"
                    onClick={() => handleClearClick()}>
                    Clear
                </button>
            </div>
        </div>
    );
};

export default Home;
