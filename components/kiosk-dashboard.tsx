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
  modalData: (
    formData: any,
    setFormData: React.Dispatch<React.SetStateAction<any>>,
    isEditMode: boolean
  ) => JSX.Element;
  title: string;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onDelete: (id: number) => void;
  onUpdate: (id: number, formData: any) => Promise<void>;
}

export default function DataTable<TData extends BaseData>({
  data,
  columns,
  onSave,
  modalData,
  title,
  formData,
  setFormData,
  onDelete,
  onUpdate,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGlobalFilter(inputValue);
    }, 300);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  useEffect(() => {
    table.setColumnFilters(columnFilters);
  }, [columnFilters]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 50 } },
    onSortingChange: setSorting,
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
  });

  const handleEdit = (rowData: TData) => {
    console.log("🛠️ Засах гэж байна:", rowData);
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

  const getSortingIcon = (column: any) => {
    const isSorted = column.getIsSorted();
    return (
      <ArrowUpDown 
        size={14} 
        className={`ml-2 transition-all duration-200 ${
          isSorted ? 'text-blue-400 scale-110' : 'text-gray-500 hover:text-gray-300'
        }`} 
      />
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-118px)] w-full px-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-700 bg-gray-800/70 backdrop-blur-sm rounded-t-xl">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          {/* Left Side - Actions */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex gap-2">
              <button
                onClick={exportToExcel}
                className="group px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg flex items-center gap-2 cursor-pointer text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Download size={16} className="group-hover:scale-110 transition-transform duration-200" />
                Excel татах
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsEditMode(false);
                  setFormData({});
                }}
                className="group px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg flex items-center gap-2 cursor-pointer text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus size={16} className="group-hover:rotate-90 transition-transform duration-200" />
                Шинэ нэмэх
              </button>
            </div>
          </div>

          {/* Right Side - Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={18} />
            <input
              type="text"
              placeholder="Хайлт хийх..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm text-white placeholder-gray-400"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto">
          <div className="min-w-full">
            <table className="w-full border-collapse bg-gray-800 shadow-lg">
              <thead className="sticky top-0 z-10 bg-gradient-to-r from-gray-700 to-gray-800 backdrop-blur-md border-b border-gray-600">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider border-r border-gray-600 w-16">
                      №
                    </th>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider border-r border-gray-600 last:border-r-0"
                      >
                        <button
                          onClick={() =>
                            header.column.toggleSorting(
                              header.column.getIsSorted() === "asc"
                            )
                          }
                          className="flex items-center justify-start gap-1 w-full group hover:text-blue-400 transition-colors duration-200"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {getSortingIcon(header.column)}
                        </button>
                      </th>
                    ))}
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider w-32">
                      Үйлдэл
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-600">
                {table.getRowModel().rows.map((row, index) => (
                  <tr 
                    key={row.id} 
                    className={`
                      group transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-900/20 hover:to-indigo-900/20 cursor-pointer
                      ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700/50'}
                    `}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 border-r border-gray-600">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-full text-xs font-semibold text-blue-300">
                        {row.index + 1}
                      </div>
                    </td>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-r border-gray-600 last:border-r-0"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center items-center gap-3">
                        <button
                          onClick={() => handleEdit(row.original)}
                          className="group/btn p-2 rounded-lg bg-blue-900/50 text-blue-400 hover:bg-blue-800 transition-all duration-200 hover:scale-110"
                        >
                          <Edit3 size={14} className="group-hover/btn:rotate-12 transition-transform duration-200" />
                        </button>
                        <button
                          onClick={() => onDelete(row.original.id)}
                          className="group/btn p-2 rounded-lg bg-red-900/50 text-red-400 hover:bg-red-800 transition-all duration-200 hover:scale-110"
                        >
                          <Trash2 size={14} className="group-hover/btn:scale-110 transition-transform duration-200" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination Section */}
      <div className="p-6 border-t border-gray-700 bg-gray-800/70 backdrop-blur-sm rounded-b-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            Нийт <span className="font-semibold text-gray-100">{data.length}</span> бичлэг байна
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              Өмнөх
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">
                Хуудас
              </span>
              <div className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-semibold shadow-md">
                {table.getState().pagination.pageIndex + 1}
              </div>
              <span className="text-sm text-gray-300">
                / {table.getPageCount()}
              </span>
            </div>
            
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
            >
              Дараах
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        modalData={() => modalData(formData, setFormData, isEditMode)}
        title={isEditMode ? "Засах" : title}
      />
    </div>
  );
}