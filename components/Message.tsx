import React from 'react';

interface MessageProps {
    message: string;
    isInterim: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isInterim }) => {
    const bgColor = isInterim ? 'bg-slate-300' : 'bg-green-500';
    const textColor = isInterim ? 'text-black' : 'text-white';

    return (
        <div className="text-right">
        <span className={`inline-block rounded-lg px-3 py-2 ${bgColor} ${textColor}`}>
    {message}
    </span>
    </div>
);
};

export default Message;
