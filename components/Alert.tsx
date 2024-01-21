import React from 'react';

interface AlertProps {
    header: string;
  phoneNumber: string;
  onYes: () => void;
  onNo: () => void;
  backgroundColor?: string;
}

const AlertDialog: React.FC<AlertProps> = ({header, phoneNumber, onYes, onNo, backgroundColor }) => {
    return (
      <div className={`fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}>
        <div className={`relative shadow-white shadow-md hover:shadow-lg hover:shadow-white top-20 mx-auto p-5 border w-96 rounded-md ${backgroundColor ?? 'bg-white'}`}>
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-white">{header}</h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-md text-white">{phoneNumber}</p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                onClick={onYes}
                className="px-4 py-2 bg-green-700 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Yes
              </button>
              <button
                onClick={onNo}
                className="mt-3 px-4 py-2 bg-red-700 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default AlertDialog;
