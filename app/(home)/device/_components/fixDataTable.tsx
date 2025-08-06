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
import {
  Edit3,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Modal from "../../../../components/ui/modal";

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
  title: string;
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
    initialState: { pagination: { pageSize: 15 } },
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
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl shadow-lg p-1 pb-1 h-[calc(100vh-160px)] w-[calc(100vw-370px)] flex flex-col">
      <div className="flex-1 overflow-auto rounded-lg">
        <table className="w-full border-collapse text-white text-sm">
          <thead className="sticky top-0 bg-[rgba(255,255,255,0.04)] backdrop-blur-xl backdrop-brightness-90 border-b border-white/6 ">
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 text-left uppercase text-xs font-bold">
                №
              </th>
              {table.getHeaderGroups()[0]?.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-center uppercase text-xs font-bold"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
              <th className="px-4 py-3 text-right uppercase text-xs font-bold">
                Үйлдэл
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className="hover:bg-white/10 transition-all duration-150"
              >
                <td className="px-4 py-3 text-center">
                  {table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    index +
                    1}
                </td>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-center">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(row.original)}
                      className="p-1.5 rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-400"
                      title="Засах"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(row.original.id)}
                      className="p-1.5 rounded bg-red-600/20 hover:bg-red-600/30 text-red-400"
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
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-white/50" />
            </div>
            <h3 className="text-lg font-medium text-white">Мэдээлэл олдсонгүй</h3>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-white text-sm px-1">
        <div>
          Хуудас {table.getState().pagination.pageIndex + 1} /{" "}
          {table.getPageCount()}
        </div>
        <div className="flex gap-2">
          <button
            className="px-2 py-1 rounded bg-white/10 hover:bg-white/20"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="px-2 py-1 rounded bg-white/10 hover:bg-white/20"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={16} />
          </button>
        </div>
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
