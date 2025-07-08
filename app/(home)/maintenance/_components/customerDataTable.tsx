"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnDef,
  getFilteredRowModel,
} from "@tanstack/react-table";
import React, { JSX, useEffect, useState } from "react";
import { ArrowUpDown, Download, Search, Plus, Edit3, Trash2, ChevronLeft, ChevronRight, Notebook } from "lucide-react";
import Modal from "../../../../components/ui/modal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


interface BaseData {
  id: number;
}

interface DataTableProps<TData extends BaseData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  onSave: (formData: any) => Promise<void>;
  modalData: (
    formData: any,
    setFormData: React.Dispatch<React.SetStateAction<any>>,
    isEditMode: boolean
  ) => JSX.Element;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onDelete: (id: number) => void;
  onUpdate: (id: number, formData: any) => Promise<void>;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isEditMode: boolean;
    setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    exportToExcel: () => void;
}

export default function DataTable<TData extends BaseData>({
  data,
  columns,
  onSave,
  modalData,
  formData,
  setFormData,
  onDelete,
  onUpdate,
  isModalOpen,
  setIsModalOpen,
  isEditMode,
  setIsEditMode,
  inputValue,
  setInputValue,
  exportToExcel,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");


  useEffect(() => {
    const timeout = setTimeout(() => {
      setGlobalFilter(inputValue);
    }, 300);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 10 } },
    onSortingChange: setSorting,
    state: {
      sorting,
      globalFilter,
    },
  });

  const handleEdit = (rowData: TData) => {
    setIsEditMode(true);
    setEditId(rowData.id);
    setFormData(rowData);
    setIsModalOpen(true);
  };

  const handleModalSave = async () => {
    if (isEditMode && editId !== null) {
      await onUpdate(editId, formData);
    } else {
      await onSave(formData);
    }
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditId(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-250px)] rounded-xl bg-[#1a1a1a] shadow-sm border border-[#2a2a2a] w-full p-1">

      {/* Table Section */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10 bg-[#1a1a1a]">
        <tr className="border-b border-[#2a2a2a]">
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs w-12">
                №
              </th>
              {table.getHeaderGroups()[0]?.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs"
                >
                  <button
                    onClick={() =>
                      header.column.toggleSorting(header.column.getIsSorted() === "asc")
                    }
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <ArrowUpDown size={12} className="text-gray-400" />
                  </button>
                </th>
              ))}
              <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase text-xs w-24">
                Үйлдэл
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2a2a]">
            {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id} className="hover:bg-[#2c2c2c]">
                <td className="px-4 py-3 text-gray-500 text-sm text-center">
                  {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + index + 1}
                </td>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-gray-700 text-sm">
                    <div className="truncate max-w-[200px]">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(row.original)}
                      className="p-1.5 text-blue-600 "
                      title="Засах"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleEdit(row.original)}
                      className="p-1.5 text-orange-600 "
                      title="Засах"
                    >
                      <Notebook size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(row.original.id)}
                      className="p-1.5 text-red-600"
                      title="Устгах"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">Мэдээлэл олдсонгүй</h3>
            <p className="text-gray-500 text-sm">Шинэ мэдээлэл нэмж эхлээрэй</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        modalData={() => modalData(formData, setFormData, isEditMode)}
        title={isEditMode ? "Засах" : ""}
      />
    </div>
  );
}