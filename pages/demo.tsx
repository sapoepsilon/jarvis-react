import React, { useState, useRef } from "react";
import "tailwindcss/tailwind.css";
import { MessageInterface } from "@/interfaces/Message";
import FingerprintService from "./api/fingerprint_service";
import { Fingerprint } from "@/interfaces/FingerprintModel";
import AlertDialog from "@/components/Alert";
import Navbar from "@/components/navbar/NavBar";
import MessageList from "@/components/DemoPage/MessageList";
import ScrollableView from "@/components/DemoPage/ScrollableView";

const Home: React.FC = () => {
  const [isAlert, setIsAlert] = useState(true);
  const [transcript, setTranscript] = useState<string>("");
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [fingerprint, setFingerprint] = useState<Fingerprint | null>(null);
  const [isRecognitionDone, setRecognitionDone] = useState(false);
  const today: Date = new Date();
  // TODO: fix the dummy finction
  const setIsNavbarExpanded = (value: boolean) => {
    // Implement the necessary functionality here
    console.log("Navbar expanded state:", value);
  };

  function handleConfirm() {
    setIsAlert(false);
  }
  function handleCancel() {
    setIsAlert(false);
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-app-background min-w-200">
      <Navbar setIsNavbarExpanded={setIsNavbarExpanded} />
      {isAlert && (
        <AlertDialog
          header="Call this number"
          phoneNumber={"8016350784"}
          onYes={handleConfirm}
          onNo={handleCancel}
          backgroundColor={"bg-app-background"}
        ></AlertDialog>
      )}

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
            <div className="spinner">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
