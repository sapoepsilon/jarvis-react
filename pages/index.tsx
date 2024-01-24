import React, { useState, useEffect, useRef } from 'react';
import VitruviusButton from '../components/DemoPage/SendButton';
import 'tailwindcss/tailwind.css';
import ScrollableView from '@/components/DemoPage/ScrollableView';
import MessageList from '@/components/DemoPage/MessageList';
import { MessageInterface } from '@/interfaces/Message';
import Navbar from '@/components/navbar/NavBar';
import TextField from '../components/DemoPage/MicrophoneButton';
import { callChatGPT } from '@/hooks/fetchChatGPTResponse';
import { supabase } from '@/utils/supabaseClient';
import { Session } from '@supabase/supabase-js';
import Sidebar from '@/components/sidebar/Sidebar';
import { IVIUSAssistant, VIUSAssistant } from '@/constants/VIUSAssistant';
const Home: React.FC = () => {
  const handleTranscriptUpdate = (newTranscript: string) => {
    setTranscript(newTranscript ?? '');
  };

  const [transcript, setTranscript] = useState<string>('');
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isBeingProcessed, setPreccessedDone] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
  const placeholders = [
    'Got it, give me a second.',
    "OK give me a second I'm doing your job.",
    "I'm on it, double and triple checking.",
    'Got it, be right back.',
    "I'm on the case, cue elevator music.",
    'Got it, be patient!',
  ];

  const randomPlaceholder =
    placeholders[Math.floor(Math.random() * placeholders.length)];
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const toggleSidebar = () => {
    console.log('toggleSidebar');
    setIsSidebarVisible(!isSidebarVisible);
  };

  const [assistant, setAssistant] = useState<IVIUSAssistant>(
    VIUSAssistant.skyridge(),
  );

  const onAssistantSelect = (assistantFunc: () => IVIUSAssistant) => {
    setAssistant(assistantFunc());
  };

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session && !isPageLoaded) {
      const introduction: MessageInterface = createMessage(
        `Hello.  I am VIUS, a highly specialized LLM (Large Language Model), conceptualized and built by Vitruvius Design+Build.  I am tailored to provide guidance on luxury home building in Park City, Utah, and the surrounding areas. I am constantly staying up to date with the most current neighborhood architectural design and construction guidelines along with Jordanelle Specially Planned Area guidelines. My job is to make your life easy.  I try to communicate in a fun, technical manner, appropriate for construction professionals, and will sometimes ask for project details when needed to provide precise, customized advice. This approach ensures that my assistance is highly relevant, detailed, and tailored to each unique construction project.  All information that I provide is to be used as guidance only.\n\n   &nbsp;  \n\nHow can I help you?`,
        false,
        false,
      );
      setMessages((prevMessages) => [...prevMessages, introduction]);
      setIsPageLoaded(true);
    }
  }, [session]);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();

      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = false;

        let interimTranscript = '';
        let eachTranscript = '';
        recognitionRef.current.onend = () => {
          console.log('recognition ended');
          setTranscript(interimTranscript);
        };
      } else {
        alert('Error initializing');
      }
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const playSound = () => {
    const audio = new Audio('/bell.wav');
    audio.play().then((r) => console.log('sound played'));
  };

  const handleSendClick = () => {
    if (transcript.trim()) {
      const userMessage: MessageInterface = createMessage(
        transcript,
        true,
        false,
      );
      setPreccessedDone(false);
      console.log('user message: ' + userMessage.text);
      handleSubmit(userMessage);
      setTranscript('');
    }
  };

  const removeLastMessage = () => {
    setMessages(messages.slice(0, -1));
  };

  const handleSubmit = async (userMessage: MessageInterface) => {
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setTranscript('');
    if (!transcript) return;
    const placeholder: MessageInterface = createMessage(
      randomPlaceholder,
      false,
      false,
    );
    setMessages((prevMessages) => [...prevMessages, placeholder]);
    let gptResponse = '';
    try {
      const response = await callChatGPT(transcript, 1, assistant.code);
      gptResponse = response.response as string;
    } catch (error) {
      alert(`An error occurred: ${error}`);
    }

    // @ts-ignore
    const gptMessage: MessageInterface = createMessage(
      // @ts-ignore
      gptResponse,
      false,
      false,
    );
    playSound();
    setMessages((prevMessages) => [...prevMessages, gptMessage]);
    setPreccessedDone(true);
  };

  function createMessage(
    text: string,
    isMe: boolean,
    isInterim: boolean,
  ): MessageInterface {
    return {
      text,
      isMe,
      isInterim,
    };
  }

  typeof navigator !== 'undefined' &&
    Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <img
            src="https://framerusercontent.com/images/siDJlxSbSVb9JghKi3KVEmcs6nM.png"
            alt="Vitruvius logo"
            className="w-64 h-64 mb-4 rounded custom-spin"
          />

          <h1 className="text-center mb-4">
            You need to sign in to access this page.
          </h1>

          <button
            className="px-4 py-2 bg-black text-white rounded hover:bg-black-600"
            onClick={() =>
              supabase.auth.signInWithOAuth({ provider: 'google' })
            }
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-app-background min-w-200">
        <Navbar onSidebarClick={toggleSidebar} />
        <div className={`flex ${isSidebarVisible ? 'with-sidebar' : ''}`}>
          <div
            className={`sidebar ${isSidebarVisible ? 'sidebar-visible' : ''}`}
          >
            <Sidebar onAssistantSelect={onAssistantSelect} />
          </div>
          <div className="main-content">
            <ScrollableView>
              <div className="w-full mb-5">
                <MessageList
                  messages={messages}
                  interimTranscript={transcript}
                />
              </div>
            </ScrollableView>
            <div className="flex items-center justify-between w-full pt-2 px-2 ">
              {!isBeingProcessed ? (
                <div className="flex flex-1 items-center space-x-4">
                  <TextField
                    onTranscriptUpdate={handleTranscriptUpdate}
                    onEnterPress={handleSendClick}
                  />
                  <div className="spinner">
                    <div className="double-bounce1 bg-gray-200"></div>
                    <div className="double-bounce2 bg-gray-900"></div>
                  </div>
                  <VitruviusButton onClick={() => handleSendClick()} />
                </div>
              ) : (
                <div className="flex flex-1 items-center space-x-4">
                  <TextField
                    onTranscriptUpdate={handleTranscriptUpdate}
                    onEnterPress={handleSendClick}
                  />
                  <VitruviusButton onClick={() => handleSendClick()} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
