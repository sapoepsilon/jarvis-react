import React from 'react';
import Message from './Message';
import { MessageInterface } from '@/interfaces/Message';

interface MessageListProps {
  messages: MessageInterface[];
  interimTranscript: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  interimTranscript,
}) => {
  return (
    <div className="flex flex-col space-y-3">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
