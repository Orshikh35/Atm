import { JSX } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  modalData: () => JSX.Element;
  title: string;
}

const Modal = ({ isOpen, onClose, onSave, modalData, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 bg-gradient-to-br from-[#2c3e50] to-[#1a1a1a] rounded-2xl shadow-[0_0_40px_rgba(255,123,0,0.3)] border border-orange-600/20 p-[2px]">
        <div className="bg-[#1a1a1a]/90 rounded-2xl backdrop-blur-lg p-6 overflow-y-auto max-h-[80vh]">
          {/* Title */}
          <h2 className="text-xl font-semibold text-white mb-4 text-center">{title}</h2>

          {/* Modal Body */}
          <div>{modalData()}</div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition duration-200 shadow-md"
            >
              Болих
            </button>
            <button
              onClick={onSave}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-600 text-white font-semibold hover:opacity-90 shadow-lg transition duration-200"
            >
              Нэмэх
            </button>
          </div>
        </div>

        {/* Bubble effects (optional) */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-orange-500 rounded-full opacity-30 blur-2xl " />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-yellow-400 rounded-full opacity-20 blur-2xl " />
      </div>
    </div>
  );
};


export default Modal;