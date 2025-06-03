"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { ATM } from "@/app/page";

interface EditRecordModalProps {
  record: ATM;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (record: ATM) => void;
}

export function EditRecordModal({
  record,
  isOpen,
  onClose,
  onEdit,
}: EditRecordModalProps) {
  const [formData, setFormData] = useState<ATM>(record);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(formData);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, attachments: Array.from(e.target.files) });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] shadow-2xl">
        {/* Header */}
        <div className="p-6 bg-gray-800/40 rounded-t-xl relative">
          <div className="relative z-10 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Бичлэг засах</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </div>

        {/* Form */}
        <div className="p-6 max-h-[calc(100vh-120px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Төлөв</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  required
                  className="w-full border-1 border-gray-800/60 px-4 py-3 rounded-xl transition-all duration-200"
                >
                  <option value="">Сонгоно уу</option>
                  <option value="Шийдвэрлэсэн">Шийдвэрлэсэн</option>
                  <option value="Хүлээгдэж буй">Хүлээгдэж буй</option>
                  <option value="Ажиллаж байна">Ажиллаж байна</option>
                  <option value="Цуцлагдсан">Цуцлагдсан</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Хариуцсан инженер</label>
                <input
                  type="text"
                  value={formData.engineer}
                  onChange={(e) =>
                    setFormData({ ...formData, engineer: e.target.value })
                  }
                  required
                  className="w-full border-1 border-gray-800/60 px-4 py-3 rounded-xl transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Хүсэлт илгээсэн</label>
              <input
                type="text"
                value={formData.requestText}
                onChange={(e) =>
                  setFormData({ ...formData, requestText: e.target.value })
                }
                required
                className="w-full border-1 border-gray-800/60 px-4 py-3 rounded-xl transition-all duration-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Хүсэлт илгээсэн огноо</label>
                <input
                  type="date"
                  value={formData.requestDate}
                  onChange={(e) =>
                    setFormData({ ...formData, requestDate: e.target.value })
                  }
                  required
                  className="w-full border-1 border-gray-800/60 px-4 py-3 rounded-xl transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Хаагдсан огноо</label>
                <input
                  type="date"
                  value={formData.closureDate}
                  onChange={(e) =>
                    setFormData({ ...formData, closureDate: e.target.value })
                  }
                  className="w-full border-1 border-gray-800/60 px-4 py-3 rounded-xl transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Тайлбар</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={3}
                className="w-full border-1 border-gray-800/60 px-4 py-3 rounded-xl transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Дэлгэрэнгүй</label>
              <textarea
                value={formData.details}
                onChange={(e) =>
                  setFormData({ ...formData, details: e.target.value })
                }
                rows={4}
                className="w-full border-1 border-gray-800/60 px-4 py-3 rounded-xl transition-all duration-200"
              />
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 font-semibold text-gray-700 transition-all duration-200 hover:scale-105"
              >
                Цуцлах
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Хадгалах
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
