"use client";

import { useState } from "react";
import Image from "next/image";
import { DataTable } from "@/components/data-table";
import { AddRecordModal } from "@/components/add-record-modal";
import { EditRecordModal } from "@/components/edit-record-modal";
import { exportToWord } from "@/lib/export-word";
import { Plus, Download, Activity } from "lucide-react";
import Bg from "@/public/mountains-5819652.jpg";

export interface ATM {
  id: string;
  kiosk: string;
  status: string;
  engineer: string;
  requestText: string;
  requestDate: string;
  closureDate: string;
  description: string;
  details: string;
  attachments: File[];
}

export default function page() {
  const [records, setRecords] = useState<ATM[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ATM | null>(null);

  const handleAddRecord = (record: Omit<ATM, "id">) => {
    const newRecord: ATM = {
      ...record,
      id: Date.now().toString(),
    };
    setRecords([...records, newRecord]);
  };

  const handleEditRecord = (updatedRecord: ATM) => {
    setRecords(
      records.map((r) => (r.id === updatedRecord.id ? updatedRecord : r))
    );
    setEditingRecord(null);
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  const handleExportToWord = () => {
    exportToWord(records);
  };

  return (
    <div className="px-20 pt-22">
        <div className="w-full justify-between flex items-center mb-6">
          <h1>Tailan</h1>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="group   rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className=" flex items-center gap-3">
                <div className="p-1 bg-white/20 rounded-lg">
                  <Plus className="h-5 w-5" />
                </div>
                Шинэ тайлан нэмэх
              </div>
            </button>

            <button
              onClick={handleExportToWord}
              disabled={records.length === 0}
              className="group   rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className=" flex items-center gap-3">
                <div className="p-1 bg-white/20 rounded-lg">
                  <Download className="h-5 w-5" />
                </div>
                Word файл татах
              </div>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
          <DataTable
            records={records}
            onEdit={setEditingRecord}
            onDelete={handleDeleteRecord}
          />
        </div>
    

      {/* Modals */}
      <AddRecordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddRecord}
      />

      {editingRecord && (
        <EditRecordModal
          record={editingRecord}
          isOpen={!!editingRecord}
          onClose={() => setEditingRecord(null)}
          onEdit={handleEditRecord}
        />
      )}
    </div>
  );
}
