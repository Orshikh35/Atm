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
    <div className="fixed inset-0 bg-gray-900/80 flex justify-center items-center z-50">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-md w-auto max-h-[80vh] overflow-y-auto">
        <p className="w-full flex justify-center items-center dark:text-white font-medium text-[24px]">{title}</p>
        <div>{modalData()}</div>
        <div className="flex gap-3 mt-4 w-full justify-center items-center">
         
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Болих
          </button>
          <button
            onClick={onSave}
            className={`px-4 py-2 bg-blue-600 text-white rounded   opacity-50 cursor-not-allowed : ""}`}
          >
            Илгээх
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;