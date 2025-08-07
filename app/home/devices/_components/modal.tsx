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
        className="relative w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl text-white"
        style={{
          background: "rgba(59, 130, 246, 0.15)", 
          border: "1.5px solid transparent",
          backdropFilter: "blur(8px)",
        }}
      >
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Төхөөрөмжийн нэр", name: "deviceName", type: "text" },
            { label: "Сериал дугаар", name: "serialNumber", type: "text" },
            { label: "Загвар", name: "model", type: "text" },
            { label: "IP хаяг", name: "ip", type: "text" },
            { label: "Порт", name: "port", type: "number" },
            { label: "Байршил", name: "location", type: "text" },
            { label: "Аймаг / Хот", name: "province", type: "text" },
            {
              label: "Суулгасан огноо",
              name: "installationDate",
              type: "date",
            },
            { label: "Эзэмшигч ID", name: "ownerId", type: "number" },
            { label: "Байгууллага", name: "orgId", type: "text" },
          ].map((field, i) => (
            <div key={i}>
              <label className="block mb-1 text-sm font-medium text-white/90">
                {field.label}
              </label>
              <input
                type={field.type}
                value={formData[field.name] ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.name]:
                      field.type === "number"
                        ? e.target.value === ""
                          ? ""
                          : parseInt(e.target.value)
                        : e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder:text-white/50 outline-none transition"
                placeholder={field.label}
              />
            </div>
          ))}
          <div>
            <label className="block mb-1 text-sm font-medium text-white/90">
              Төхөөрөмжийн төрөл
            </label>
            <select
              value={formData.deviceType ?? 0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deviceType: parseInt(e.target.value),
                })
              }
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value={0}>ATM</option>
              <option value={1}>Kiosk</option>
              <option value={2}>POS</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-white/90">
              Төлөв
            </label>
            <select
              value={formData.status ?? 0}
              onChange={(e) =>
                setFormData({ ...formData, status: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value={0}>Идэвхтэй</option>
              <option value={1}>Идэвхгүй</option>
            </select>
          </div>
        </div>
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
