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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { exportToWord } from "@/lib/export-word";

interface BaseData {
  id: number;
}

interface DataTableProps<TData extends BaseData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  exportToExcel: () => void;
  exportToWord: () => void;
}

export default function DataTable<TData extends BaseData>({
  data,
  columns,
  inputValue,
  setInputValue,
  exportToExcel,
  exportToWord
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
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

  return (
    <div className="flex flex-col h-[calc(100vh-250px)] rounded-xl ] shadow-sm border border-white/10 w-full p-1 relative">
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-2xl pointer-events-none"></div>
    <div className="absolute inset-0 bg-gradient-to-tl from-blue-400/10 via-transparent to-purple-400/10 rounded-2xl pointer-events-none opacity-60"></div>

    {/* Animated shimmer effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
    </div>

      {/* Table Section */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10 ">
        <tr className="border-b border-white/10">
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs w-12">
                №
              </th>
              {table.getHeaderGroups()[0]?.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs"
                >
                  <button
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </button>
                </th>
              ))}
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
              </tr>
            ))}
          </tbody>
        </table>
        
        {data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-1">Мэдээлэл олдсонгүй</h3>

          </div>
        )}
      </div>
    </div>
  );
}