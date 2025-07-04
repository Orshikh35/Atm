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
import { ArrowUpDown, Download, Search, Plus, Edit3, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Modal from "./ui/modal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


interface BaseData {
  id: number;
}

interface DataTableProps<TData extends BaseData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  onSave: (formData: any) => Promise<void>;
  onDelete: (id: number) => void;
  title: string;
  onUpdate: (id: number, formData: any) => Promise<void>;
}

export default function DataTable<TData extends BaseData>({
  data,
  columns,
  onSave,
  onDelete,
  onUpdate,
  title,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [inputValue, setInputValue] = useState("");

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
    setIsModalOpen(true);
  };


  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table Data");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(dataBlob, "table_data.xlsx");
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden  w-full">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {title}
        </h2>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Хайх..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm text-gray-700 placeholder-gray-400"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
            {/* <button
                onClick={exportToExcel}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-medium transition-colors border border-blue-100"
              >
                <Download size={16} />
                <span>Word</span>
              </button> */}
              <button
                onClick={exportToExcel}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-green-600 rounded-lg text-sm font-medium transition-colors border border-green-300"
              >
                <Download size={16} />
                <span>Excel</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="border-b border-gray-100">
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
          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.map((row, index) => (
              <tr 
                key={row.id} 
                className="hover:bg-gray-50 transition-colors"
              >
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
                      className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                      title="Засах"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(row.original.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
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

      {/* Pagination Section */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            Нийт: <span className="font-medium text-gray-700">{data.length}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 disabled:text-gray-300 transition-colors"
            >
              <ChevronLeft size={16} />
              Өмнөх
            </button>
            
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded">
                {table.getState().pagination.pageIndex + 1}
              </span>
              / 
              <span>{table.getPageCount()}</span>
            </div>
            
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 disabled:text-gray-300 transition-colors"
            >
              Дараах
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}