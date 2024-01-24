interface ModalWindowProps {
  isVisible: boolean;
  onClose: () => void; // Assuming no arguments are passed to the onClose function
}

const ModalWindow = ({ isVisible, onClose }: ModalWindowProps) => {
  if (!isVisible) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="text-2xl font-bold text-center">Thank you!</h2>
        <p className="text-center mt-4">
          Our support team will review your request and respond to you within 1
          business day.
        </p>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-accent-purple hover:from-blue-700 hover:to-accent-purple"
        >
          Close
        </button>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          width: 100%;
          max-width: 400px;
        }
      `}</style>
    </div>
  );
};

export default ModalWindow;
