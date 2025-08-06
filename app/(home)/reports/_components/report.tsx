"use client";
import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/app/(home)/reports/_components/reportTable";
import { toast } from "sonner";
import dayjs from "dayjs";
import { ATM } from "@/types/request";
import { Download, Search } from "lucide-react";
import exportToExcel from "@/components/exportToExcel";
import { exportToWord } from "@/lib/export-word";
import { get } from "http";
import { getReport } from "@/action/reports";

function Report() {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<ColumnDef<any, any>[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchAtmData = async () => {
      try {
        const response = await getReport();
        console.log("Response:", response);
        
        if (response.status === false) {
          toast.error(response.message || "Алдаа гарлаа");
          return;
        } else {
          setData(response);
        }
      } catch (error) {
        console.error("Алдаа:", error);
        toast.error("Мэдээлэл ачаалахад алдаа гарлаа");
      }
    };

    fetchAtmData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && columns.length === 0) {
      setColumns(generateColumnsFromData(data));
    }
  }, [data, columns.length]);

  const generateColumnsFromData = (allOrgs: any[]): ColumnDef<any, any>[] => {
    if (!allOrgs.length) return [];

    return Object.keys(allOrgs[0])
    .filter((key) => key !== "id") 
    .map((key) => {
      const isDateField = key.toLowerCase().includes("date");

      return {
        accessorKey: key,
        header: () => (
          <span className="text-xs font-medium text-white uppercase tracking-wider ">
            {key
              .replace("atm_", "")
              .replace(/([A-Z])/g, " $1")
              .trim()}
          </span>
        ),
        cell: ({ getValue }) => {
          const value = getValue<any>();
          if (value === null || value === undefined || value === "") return "-";

          if (isDateField) {
            return (
              <span className="text-[12px] text-gray-100/80 truncate max-w-[200px] text-center">
                {dayjs(value).isValid()
                  ? dayjs(value).format("YYYY-MM-DD")
                  : value}
              </span>
            );
          }

          return (
            <span className="text-[12px] text-gray-100/80 truncate max-w-[200px] text-center">
              {value.toString()}
            </span>
          );
        },
      };
    });
  };

  return (
    <div className="">
      {/* Header Section */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <h2 className="text-xl font-semibold text-gray-100/50">Тайлан</h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="w-64 pl-10 pr-4 py-2 border border-gray-100/20 rounded-lg  text-sm text-white placeholder-gray-400 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Хайх..."
                className="border-none outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => exportToWord(data, "reports.docx")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors border border-blue-600"
              >
                <Download size={16} />
                <span>Word</span>
              </button>
              <button
                onClick={() => exportToExcel(data, "reports.xlsx")}
                className="flex items-center gap-2 px-4 py-2  text-white bg-green-600 rounded-lg text-sm font-medium transition-colors border border-green-600"
              >
                <Download size={16} />
                <span>Excel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <DataTable
        data={[...data].reverse()}
        columns={columns}
        inputValue={inputValue}
        setInputValue={setInputValue}
        exportToExcel={() => exportToExcel(data, "Report_data.xlsx")}
        exportToWord={() => exportToWord(data, "Report_data.dock")}
      />
    </div>
  );
}

export default Report;
