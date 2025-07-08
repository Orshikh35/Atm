"use client";
import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/fixDataTable";
import { toast } from "sonner";
import dayjs from "dayjs";
import { ATM } from "@/types/request";
import modalData from "./_components/modal";

function Page() {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<ColumnDef<any, any>[]>([]);
  const [formData, setFormData] = useState<any>({
    deviceName: "",
    serialNumber: "",
    model: "",
    deviceType: 0,
    status: 0,
    ip: "",
    port: 0,
    location: "",
    province: "",
    masterkey: "",
    installationDate: "",
    expiredDate: "",
    ownerId: 1,
    orgName: ""
  });

  useEffect(() => {
    const fetchAtmData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/Devices`,
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


  const handleSave = async () => {
    try {
      // formData-д заавал байх ёстой бүх талбаруудыг үүсгэнэ
      const payload = {
        deviceName: formData.deviceName || "",
        serialNumber: formData.serialNumber || "",
        model: formData.model || "",
        deviceType: formData.deviceType ?? 0,  // default 0
        status: formData.status ?? 0,          // default 0
        ip: formData.ip || "",
        port: formData.port ?? 0,
        location: formData.location || "",
        province: formData.province || "",
        masterkey: formData.masterkey || "",
        installationDate: formData.installationDate || null,
        expiredDate: formData.expiredDate || null,
        ownerId: formData.ownerId ?? 0,
        orgName: formData.orgName || ""
      };
  
      console.log("Sending payload:", payload);
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/Devices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Server error response:", errorData);
        throw new Error("Шинээр хадгалах үед алдаа гарлаа");
      }
  
      const newItem = await response.json();
      toast.success("Амжилттай хадгалагдлаа");
      setData(prev => [...prev, newItem]);
  
      // formData-г анхны утгад буцаах
      setFormData({
        deviceName: "",
        serialNumber: "",
        model: "",
        deviceType: 0,
        status: 0,
        ip: "",
        port: 0,
        location: "",
        province: "",
        masterkey: "",
        installationDate: "",
        expiredDate: "",
        ownerId: 1,
        orgName: ""
      });
    } catch (error) {
      console.error("Алдаа:", error);
      toast.error("Хадгалах үед алдаа гарлаа");
    }
  };
  
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Та энэ төхөөрөмжийг устгахдаа итгэлтэй байна уу?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/Devices/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Устгах үед алдаа гарлаа");

      toast.success("Амжилттай устгагдлаа");
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Алдаа:", error);
      toast.error("Устгах үед алдаа гарлаа");
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

      <div className="">
        <DataTable
          onDelete={handleDelete}
          data={[...data].reverse()}
          columns={columns}
          onSave={handleSave}
          modalData={modalData}
          formData={formData}
          setFormData={setFormData}
          title={"Төхөөрөмж"}
          onUpdate={handleUpdate}
        />
      </div>

  );
}

export default Page;
