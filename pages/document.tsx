import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";

export default function Document({
                                     handleMouseDown,
                                     handleMouseUp,
                                     isListening,
                                     transcript
                                 }: { handleMouseDown: any, handleMouseUp: any, isListening: any, transcript: any }) {
  return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
          <div className="mb-5 text-gray-700">
              <p>{transcript}</p>
          </div>
          <button
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className={`w-24 h-24 flex justify-center items-center rounded-full text-4xl border-none focus:outline-none ${
                  isListening ? 'bg-red-500' : 'bg-gray-700'
              }`}
          >
              🎤
          </button>
      </div>
  )
}
