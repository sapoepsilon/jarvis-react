import React, { useState, useEffect, useRef } from "react";
import SendButton from "../components/DemoPage/SendButton";
import "tailwindcss/tailwind.css";
import ScrollableView from "@/components/DemoPage/ScrollableView";
import MessageList from "@/components/DemoPage/MessageList";
import { MessageInterface } from "@/interfaces/Message";
import Navbar from "@/components/navbar/NavBar";
import TextField from "../components/DemoPage/MicrophoneButton";
import { callChatGPT } from "@/hooks/fetchChatGPTResponse";
import { supabase } from '@/utils/supabaseClient';
import { Session } from '@supabase/supabase-js';
const Home: React.FC = () => {
  const handleTranscriptUpdate = (newTranscript: string) => {
    setTranscript(newTranscript ?? "");
  };

  const [transcript, setTranscript] = useState<string>("");
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isRecognitionDone, setRecognitionDone] = useState(false);
  const today: Date = new Date();
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
  
    fetchSession();
  
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();

      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = false;

        let interimTranscript = "";
        let eachTranscript = "";
        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          setRecognitionDone(true);

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (!event.results[i].isFinal) {
              eachTranscript += transcript;
              setTranscript(interimTranscript + eachTranscript);
              console.log("trascript is set in is Final else");
            } else {
              interimTranscript += transcript;
              setTranscript(interimTranscript);
              console.log("ELSE");
            }
          }
          eachTranscript = "";
        };
        recognitionRef.current.onend = () => {
          console.log("recognition ended");
          setTranscript(interimTranscript);
        };
      } else {
        alert("Error initializing");
      }
    } 
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleClearClick = () => {
    setTranscript("");
    console.log("transcript cleared" + transcript);
    setTranscript("");
  };

  const playSound = () => {
    const audio = new Audio("/bell.wav");
    audio.play().then((r) => console.log("sound played"));
  };

  const handleSendClick = () => {
    // if (
    //   transcript != "Recognizing your voice..." &&
    //   transcript != "" &&
    //   // @ts-ignore
    //   fingerprint?.values < 5
    // ) {
    //   playSound();
    // }
    // let fingerprintDate = fingerprint?.date ? fingerprint.date : null;
    if (transcript.trim()) {
      const userMessage: MessageInterface = createMessage(
        transcript,
        true,
        false
      );
        console.log("user message: " + userMessage.text);
        handleSubmit(userMessage);
      }
    // }

  };
  const removeLastMessage = () => {
    setMessages(messages.slice(0, -1));
  };
  const handleSubmit = async (userMessage: MessageInterface) => {
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setTranscript("");
    if (!transcript) return;
    const placeholder: MessageInterface = createMessage(
      "Thinking. The response might take 60 seconds to generate...",
      false,
      false
    );
    setMessages((prevMessages) => [...prevMessages, placeholder]);
    // @ts-ignore
    let gptResponse =  ""
    try {
       const response  = (await callChatGPT(transcript, 1));
       console.log("response: " + response.response);
       gptResponse = response.response as string;
      // Additional code to handle the response
    } catch (error) {
        // Error handling
        alert(`An error occurred: ${error}`);
    }
    removeLastMessage();

    // @ts-ignore
    const gptMessage: MessageInterface = createMessage(
      // @ts-ignore
      gptResponse,
      false,
      false
    );
    setMessages((prevMessages) => [...prevMessages, gptMessage]);
  };

  function createMessage(
    text: string,
    isMe: boolean,
    isInterim: boolean
  ): MessageInterface {
    return {
      text,
      isMe,
      isInterim,
    };
  }

  typeof navigator !== "undefined" &&
    Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <img 
            src="https://framerusercontent.com/images/siDJlxSbSVb9JghKi3KVEmcs6nM.png" // Replace with your image path
            alt="Vitruvius logo"
            className="w-64 h-64 mb-4 rounded custom-spin"
          />
    
          <h1 className="text-center mb-4">You need to sign in to access this page.</h1>
    
          <button
            className="px-4 py-2 bg-black text-white rounded hover:bg-black-600"
            onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
    
    //
    
    
  } else {
  return (
    <div className="flex flex-col items-center min-h-screen bg-app-background min-w-200">
      <Navbar />
      <ScrollableView>
        <div className="w-full mb-5">
          <MessageList messages={messages} interimTranscript={transcript} />
        </div>
      </ScrollableView>
      <div className="flex items-center text-white">
        {isRecognitionDone || !transcript ? (
          <div>{transcript}</div>
        ) : (
          <>
            <div>{transcript}</div>
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between w-full pt-2 space-x-4 px-2 ">
        <TextField onTranscriptUpdate={handleTranscriptUpdate} />
        <SendButton onClick={() => handleSendClick()} />
      </div>
    </div>
  );
        }
};

export default Home;
