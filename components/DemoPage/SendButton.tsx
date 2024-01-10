import React from 'react';

interface SendButtonProps {
    onClick: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 ml-3 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-green-300"
        >
            Send
        </button>
    );
};

export default SendButton;
