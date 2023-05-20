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
import {Fingerprint, FingerprintDocument} from "@/interfaces/FingerprintModel";
import FingerprintService from "@/pages/api/fingerprint_service";

const Home: React.FC = () => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>('');
    const [messages, setMessages] = useState<MessageInterface[]>([]);
    const [isSupported, setIsSupported] = useState<boolean>(true);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const value = useMicrophoneVolume();
    const fingerprintService = new FingerprintService();
    const [fingerprint, setFingerprint] = useState<FingerprintDocument | null>(null);
    const [isRecognitionDone, setRecognitionDone] = useState(false);
    const today: Date = new Date();

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();

            if (recognitionRef.current) {
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = true;

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
                            interimTranscript = '';
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
            let r
            generateDeviceFingerprint().then(async (fingerprint: string) => {
                r = await fingerprintService.fetchFingerprintData(fingerprint);
                if (r != null || r != undefined) {
                    const fingerprint: FingerprintDocument = {
                        fingerprintValue: r.fingerprintValue
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

    const handleMouseDown = () => {
        setRecognitionDone(false);
        setTranscript("Recognizing your voice...")
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
        let fingerprintDate = fingerprint?.fingerprintValue.date ? new Date(fingerprint.fingerprintValue.date) : null;
        if (transcript.trim()) {
            const userMessage: MessageInterface = createMessage(transcript, true, false);
            // @ts-ignore
            if (userMessage.text != "Recognizing your voice..." && (fingerprint.fingerprintValue.values < 5 ||  fingerprintDate?.getDay() != today.getDay())) {
                setMessages((prevMessages) => [...prevMessages, userMessage]);
                handleSubmit();
                setTranscript('');
            } else {
                alert("You have reached the maximum amount of requests for today. Please try again tomorrow. Sadly, computational power doesn't grow on trees, yet...");
                setIsSupported(false);
            }
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

        generateDeviceFingerprint().then(async (fingerprintValue: string) => {
            let fingerprintDate = fingerprint?.fingerprintValue.date ? new Date(fingerprint?.fingerprintValue.date) : null;
            if (fingerprintDate?.getDay() == today.getDay()) {
                console.log("trying to add date to existing fingerprintValue...")
                await fingerprintService.addDateToFingerprint(fingerprintValue, today, fingerprint!.fingerprintValue.values + 1).then(r => console.log(r));
                const updateFingerprint: Fingerprint = {
                    fingerprint: fingerprintValue,
                    date: today,
                    values: fingerprint!.fingerprintValue.values + 1
                };
                const updateFingerprintDocument: FingerprintDocument = {
                    fingerprintValue: updateFingerprint
                }
                setFingerprint(updateFingerprintDocument);
            } else {
                console.log("trying to add date to fingerprintValue...")
                fingerprintService.addDateToFingerprint(fingerprintValue, today, 1).then(r => console.log(r));
                const updateFingerprint: Fingerprint = {fingerprint: fingerprintValue, date: today, values: 1};
                const updateFingerprintDocument: FingerprintDocument = {fingerprintValue: updateFingerprint}
                setFingerprint(updateFingerprintDocument);
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
            <div className="text-white flex items-center">
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
