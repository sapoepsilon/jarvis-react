import React from 'react';
import {MessageInterface as MessageModel} from '../interfaces/Message';


export  interface MessageProps {
    message: MessageModel;
}


const Message: React.FC<MessageProps> = ({message}) => {
    const {text, isMe, isInterim} = message;
    const messageClass = isMe ? 'text-right' : 'text-left';
    const bgColor = isMe ? 'bg-blue-400' : isInterim ? 'bg-slate-300' : 'bg-green-500';
    const textColor = isInterim ? 'text-black' : 'text-white';

    return (
        <div className={`w-full ${messageClass}`}>
            <span className={`inline-block rounded-lg px-3 py-2 ${bgColor} ${textColor}`}>
                {text}
            </span>
        </div>
    );
};
export default Message;