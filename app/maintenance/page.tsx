"use client";
import React, {  useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/customerDataTable";
import { toast } from "sonner";
import dayjs from "dayjs";
import { ATM } from "@/types/request";

function Page() {
  const [data, setData] = useState<any[]>([]);
  console.log("Page data", data);
  
  const [columns, setColumns] = useState<ColumnDef<any, any>[]>([]);
  const [formData, setFormData] = useState({
    deviceId: 0,
    description: "",
    requestedBy: 0,
    maintenanceType: 0
  });
  

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
      const isDateField = key.toLowerCase().includes("date") || key.toLowerCase().includes("requestedat");


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
                  ? dayjs(value).format("YYYY-MM-DD HH:mm")
                  : value}
              </span>
            );
          }
        
          return <span className="text-sm text-gray-800">{value.toString()}</span>;
        }
        
      };
    });
  };

  const modalData = (formData: any, setFormData: any) => (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Device ID</label>
        <input
          type="number"
          value={formData.deviceId}
          onChange={(e) => setFormData({ ...formData, deviceId: parseInt(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
        />
      </div>
  
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Description</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
        />
      </div>
  
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Requested By</label>
        <input
          type="number"
          value={formData.requestedBy}
          onChange={(e) => setFormData({ ...formData, requestedBy: parseInt(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
        />
      </div>
  
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Maintenance Type</label>
        <select
          value={formData.maintenanceType}
          onChange={(e) => setFormData({ ...formData, maintenanceType: parseInt(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
        >
          <option value={0}>Төлөвлөгөөт</option>
          <option value={1}>Яаралтай</option>
        </select>
      </div>
    </div>
  );
  

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
            <DataTable
              onDelete={handleDelete}
              data={[...data].reverse()}
              columns={columns}
              onSave={handleSave}
              modalData={modalData}
              formData={formData}
              setFormData={setFormData}
              onUpdate={handleUpdate}
            />
          </div>
  
  );
}

export default Page; 