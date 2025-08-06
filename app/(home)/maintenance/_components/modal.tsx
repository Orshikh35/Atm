import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  formData: any;
  setFormData: (data: any) => void;
  isEditMode?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  formData,
  setFormData,
  isEditMode = false,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="relative w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl text-white"
        style={{
          background: "rgba(59, 130, 246, 0.15)", // glass effect
          border: "1.5px solid transparent",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {title || (isEditMode ? "Засах" : "Шинээр нэмэх")}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-300 transition text-2xl font-bold leading-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Device ID */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white/90">Device ID</label>
            <input
              type="number"
              value={formData.deviceId ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, deviceId: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder:text-white/50 outline-none transition"
              placeholder="Device ID"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white/90">Description</label>
            <input
              type="text"
              value={formData.description ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder:text-white/50 outline-none transition"
              placeholder="Description"
            />
          </div>

          {/* Requested By */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white/90">Requested By</label>
            <input
              type="number"
              value={formData.requestedBy ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, requestedBy: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder:text-white/50 outline-none transition"
              placeholder="Requested By"
            />
          </div>

          {/* Maintenance Type */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white/90">Maintenance Type</label>
            <select
              value={formData.maintenanceType ?? 0}
              onChange={(e) =>
                setFormData({ ...formData, maintenanceType: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value={0}>Төлөвлөгөөт</option>
              <option value={1}>Яаралтай</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition text-white font-medium"
          >
            Болих
          </button>
          <button
            onClick={() => {
              onSave();
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white font-semibold"
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
