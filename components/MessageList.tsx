import React from 'react';
import Message from './Message';

interface MessageListProps {
    messages: string[];
    interimTranscript: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, interimTranscript }) => {
    return (
        <div className="flex flex-col space-y-3">
            {messages.map((message, index) => (
                <Message key={index} message={message} isInterim={false} />
            ))}
            {interimTranscript && <Message message={interimTranscript} isInterim={true} />}
        </div>
    );
};

export default MessageList;
