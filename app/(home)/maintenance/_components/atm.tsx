"use client";
import React, {  useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "./customerDataTable";
import { toast } from "sonner";
import dayjs from "dayjs";
import { ATM } from "@/types/request";
import modalData from "./modal";
import { Download, Plus, Search, XIcon } from "lucide-react";
import exportToExcel from "@/components/exportToExcel";
import { AnimatePresence, motion } from "motion/react";

function Atm() {
  const [data, setData] = useState<any[]>([]);
  console.log("Page data", data);
  
  const [columns, setColumns] = useState<ColumnDef<any, any>[]>([]);
  const [formData, setFormData] = useState({
    deviceId: 0,
    description: "",
    requestedBy: 0,
    maintenanceType: 0
  });
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchAtmData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/devices/atm/maintenance/Requests`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          } 
        );

        if (!response.ok) throw new Error("Серверээс алдаа ирлээ");
  
        const json = await response.json();
        setData(json);                     
      } catch (error) {
        console.error("Алдаа:", error);
        toast.error("Мэдээлэл ачаалахад алдаа гарлаа");
      } finally {
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

    return Object.keys(allOrgs[0]).map((key) => {
      const isDateField = key.toLowerCase().includes("date");

      return {
        accessorKey: key,
        header: () => (
          <span className="text-xs font-medium text-white uppercase tracking-wider ">
            {key.replace('atm_', '').replace(/([A-Z])/g, ' $1').trim()}
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

          return <span className="text-[12px] text-gray-100/80 truncate max-w-[200px] text-center">{value.toString()}</span>;
        },
      };
    });
  };

  

  const handleSave = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/devices/atm/maintenance/Requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error("Шинээр хадгалах үед алдаа гарлаа");
  
      const newItem = await response.json();
      toast.success("Амжилттай хадгалагдлаа");
      setData(prev => [...prev, newItem]);
      setFormData({
        deviceId: 0,
        description: "",
        requestedBy: 0,
        maintenanceType: 0
      });
    } catch (error) {
      console.error("Алдаа:", error);
      toast.error("Хадгалах үед алдаа гарлаа");
    }
  };
  

  const handleDelete = (id: number) => {
    setFormData(data.find(item => item.atm_id === id));
  };


  const handleUpdate = async (id: number, formData: ATM) => {
    try {
      const response = await fetch(`/api/atm/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error("Шинэчлэхэд алдаа гарлаа");
      
      toast.success("Амжилттай шинэчлэгдлээ");
      setData(data.map(item => item.atm_id === id ? formData : item));
    } catch (error) {
      console.error("Алдаа:", error);
      toast.error("Шинэчлэхэд алдаа гарлаа");
    }
  };

  return (
          <div className="">
              <div className="py-6 ">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <h2 className="text-xl font-semibold text-white">
            ATM жагсаалт
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="w-64 pl-10 pr-10 py-2 border border-gray-100/20 rounded-lg text-sm text-white placeholder-gray-400 relative bg-gradient-to-l from-white/5">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Хайх..."
                className="border-none outline-none bg-transparent w-full pr-6"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <AnimatePresence>
                {inputValue && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    onClick={() => setInputValue("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-gray-700/30 rounded-full p-1"
                  >
                    <motion.div
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <XIcon size={16} />
                    </motion.div>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex gap-3">
              <button
           onClick={() => exportToExcel(data, "devices_data.xlsx")}

                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium transition-colors border border-green-600"
              >
                <Download size={16} />
                <span>Excel</span>
              </button>
              
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsEditMode(false);
                  setFormData({
                    deviceId: 0,
                    description: "",
                    requestedBy: 0,
                    maintenanceType: 0
                  });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Plus size={16} />
                <span>Шинэ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
            <DataTable
              onDelete={handleDelete}
              data={[...data].reverse()}
              columns={columns}
              onSave={handleSave}
              modalData={modalData}
              formData={formData}
              setFormData={setFormData}
              onUpdate={handleUpdate}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              inputValue={inputValue}
              setInputValue={setInputValue}
              exportToExcel={() => exportToExcel(data, "maintenance_data.xlsx")}
            />
          </div>
  
  );
}

export default Atm; 