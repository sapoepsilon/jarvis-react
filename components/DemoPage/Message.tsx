import React from 'react';
import { MessageInterface as MessageModel } from '../../interfaces/Message';
import ReactMarkdown from 'react-markdown';
import { FaRegCopy, FaCheck } from 'react-icons/fa';

export interface MessageProps {
  message: MessageModel;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { text, isMe, isInterim } = message;
  const messageClass = isMe ? 'text-right' : 'text-left';
  const bgColor = isMe
    ? 'bg-user-message backdrop-filter backdrop-blur-md'
    : isInterim
      ? 'bg-slate-300'
      : 'bg-slate-950  backdrop-filter backdrop-blur-md bg-opacity-80';
  const textColor = isMe ? 'text-white' : 'text-white';
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div className={`w-full ${messageClass} relative`}>
      {!isMe && (
        <div
          className="absolute top-1 right-1 z-10 text-white-500 hover:text-white-700 cursor-pointer p-1"
          onClick={handleCopy}
        >
          {copied ? (
            <FaCheck color="green" size={20} />
          ) : (
            <FaRegCopy color="white" size={20} />
          )}
        </div>
      )}
      <span
        className={`inline-block rounded-lg px-3 py-2 ${bgColor} ${textColor} text-sm`}
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </span>
    </div>
  );
};

export default Message;
