"use client";
import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { AddRecordModal } from "@/components/add-record-modal";
import { EditRecordModal } from "@/components/edit-record-modal";
import { exportToWord } from "@/lib/export-word";
import { Plus, Download, Activity } from 'lucide-react';

export interface ATM {
  id: string;
  status: string;
  engineer: string;
  requestText: string;
  requestDate: string;
  closureDate: string;
  description: string;
  details: string;
  attachments: File[];
}

export default function Component() {
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
      records.map((record) =>
        record.id === updatedRecord.id ? updatedRecord : record
      )
    );
    setEditingRecord(null);
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  const handleExportToWord = () => {
    exportToWord(records);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Activity className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                ATM Тайлангийн Систем
              </h1>
            </div>
            <p className="text-blue-100 text-lg">
              Системийн хүсэлт болон засварын мэдээллийг удирдах
            </p>
          </div>
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-3">
              <div className="p-1 bg-white/20 rounded-lg">
                <Plus className="h-5 w-5" />
              </div>
              Шинэ бичлэг нэмэх
            </div>
          </button>
          
          <button
            onClick={handleExportToWord}
            disabled={records.length === 0}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-3">
              <div className="p-1 bg-white/20 rounded-lg">
                <Download className="h-5 w-5" />
              </div>
              Word файл татах
            </div>
          </button>
        </div>

        {/* Data Table Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
          <DataTable
            records={records}
            onEdit={setEditingRecord}
            onDelete={handleDeleteRecord}
          />
        </div>
      </div>

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
