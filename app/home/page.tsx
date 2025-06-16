"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/customerDataTable";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/ui/deleteModal";
import dayjs from "dayjs";
import { ATM } from "@/types/request";

function Page() {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<ColumnDef<any, any>[]>([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ATM>({
    atm_id: 0,
    atm_name: "",
    atm_model: "",
    atm_IP: "",
    atm_port: 0,
    atm_installationDate: "",
    atm_orgName: "",
    atm_location: "",
    atm_serialNumber: "",
    atm_expiredDate: "",
    atm_province: "",
    atm_masterKey: ""
  });

  useEffect(() => {
    const fetchAtmData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/atm");    
        if (!response.ok) throw new Error("Серверээс алдаа ирлээ");
  
        const json = await response.json();
        setData(json);                     
      } catch (error) {
        console.error("Алдаа:", error);
        toast.error("Мэдээлэл ачаалахад алдаа гарлаа");
      } finally {
        setLoading(false);
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
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {key.replace('atm_', '').replace(/([A-Z])/g, ' $1').trim()}
          </span>
        ),
        cell: ({ getValue }) => {
          const value = getValue<any>();
          if (value === null || value === undefined || value === "") return "-";

          if (isDateField) {
            return (
              <span className="text-sm text-gray-600">
                {dayjs(value).isValid()
                  ? dayjs(value).format("YYYY-MM-DD")
                  : value}
              </span>
            );
          }

          return <span className="text-sm text-gray-800">{value.toString()}</span>;
        },
      };
    });
  };

  const modalData = (formData: ATM | any, setFormData: any) => (
    <div className="space-y-4">
      {Object.keys(formData).map((key) => (
        <div key={key} className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            {key.replace('atm_', '').replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <input
            type={key.toLowerCase().includes("date") ? "date" : "text"}
            value={formData[key]}
            onChange={(e) => setFormData({...formData, [key]: e.target.value})}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          />
        </div>
      ))}
    </div>
  );

  const handleSave = async () => {
    try {
      const response = await fetch("/api/atm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error("Хадгалахад алдаа гарлаа");
      
      toast.success("Амжилттай хадгалагдлаа");
      // Refresh data
      const json = await response.json();
      setData([...data, json]);
    } catch (error) {
      console.error("Алдаа:", error);
      toast.error("Хадгалахад алдаа гарлаа");
    }
  };

  const handleDelete = (id: number) => {
    setIsDeleteOpen(true);
    setFormData(data.find(item => item.atm_id === id));
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/atm/${formData.atm_id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) throw new Error("Устгахад алдаа гарлаа");
      
      toast.success("Амжилттай устгагдлаа");
      setData(data.filter(item => item.atm_id !== formData.atm_id));
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Алдаа:", error);
      toast.error("Устгахад алдаа гарлаа");
    }
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-22 px-20">
          {/* DataTable */}
          <div className="">
            <DataTable
              onDelete={handleDelete}
              data={[...data].reverse()}
              columns={columns}
              onSave={handleSave}
              modalData={modalData}
              formData={formData}
              setFormData={setFormData}
              title={"ATM нэмэх"}
              onUpdate={handleUpdate}
            />
          </div>
    </div>
  );
}

export default Page;