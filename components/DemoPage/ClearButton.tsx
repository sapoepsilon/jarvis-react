import React from 'react';

interface ClearButtonProps {
  onClick: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-red-600"
      onClick={onClick}
    >
      Clear
    </button>
  );
};

export default ClearButton;
