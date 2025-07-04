"use client";
import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/fixDataTable";
import { toast } from "sonner";
import dayjs from "dayjs";
import { ATM } from "@/types/request";

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

  const modalData = (formData: any, setFormData: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Device Name */}
      <div>
        <label className="text-sm font-medium text-gray-600">Төхөөрөмжийн нэр</label>
        <input
          type="text"
          value={formData.deviceName ?? ""}
          onChange={(e) => setFormData({ ...formData, deviceName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Serial Number */}
      <div>
        <label className="text-sm font-medium text-gray-600">Сериал дугаар</label>
        <input
          type="text"
          value={formData.serialNumber ?? ""}
          onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Model */}
      <div>
        <label className="text-sm font-medium text-gray-600">Загвар</label>
        <input
          type="text"
          value={formData.model ?? ""}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Device Type */}
      <div>
        <label className="text-sm font-medium text-gray-600">Төхөөрөмжийн төрөл</label>
        <select
          value={formData.deviceType ?? 0}
          onChange={(e) => setFormData({ ...formData, deviceType: parseInt(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value={0}>ATM</option>
          <option value={1}>Kiosk</option>
          <option value={2}>POS</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="text-sm font-medium text-gray-600">Төлөв</label>
        <select
          value={formData.status ?? 0}
          onChange={(e) => setFormData({ ...formData, status: parseInt(e.target.value )})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value={0}>Идэвхтэй</option>
          <option value={1}>Идэвхгүй</option>
        </select>
      </div>

      {/* IP */}
      <div>
        <label className="text-sm font-medium text-gray-600">IP хаяг</label>
        <input
          type="text"
          value={formData.ip ?? ""}
          onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Port */}
      <div>
        <label className="text-sm font-medium text-gray-600">Порт</label>
        <input
          type="number"
          value={formData.port}
          onChange={(e) => {
            const val = e.target.value;
            setFormData({ ...formData, port: val === "" ? "" : parseInt(val) });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Location */}
      <div>
        <label className="text-sm font-medium text-gray-600">Байршил</label>
        <input
          type="text"
          value={formData.location ?? ""}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Province */}
      <div>
        <label className="text-sm font-medium text-gray-600">Аймаг / Хот</label>
        <input
          type="text"
          value={formData.province ?? ""}
          onChange={(e) => setFormData({ ...formData, province: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Master Key */}
      <div>
        <label className="text-sm font-medium text-gray-600">Master Key</label>
        <input
          type="text"
          value={formData.masterkey ?? ""}
          onChange={(e) => setFormData({ ...formData, masterkey: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Installation Date */}
      <div>
        <label className="text-sm font-medium text-gray-600">Суулгасан огноо</label>
        <input
          type="date"
          value={formData.installationDate ?? ""}
          onChange={(e) => setFormData({ ...formData, installationDate: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Expired Date */}
      <div>
        <label className="text-sm font-medium text-gray-600">Дуусах огноо</label>
        <input
          type="date"
          value={formData.expiredDate ?? ""}
          onChange={(e) => setFormData({ ...formData, expiredDate: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Owner ID */}
      <div>
        <label className="text-sm font-medium text-gray-600">Эзэмшигч ID</label>
        <input
          type="number"
          value={formData.ownerId}
          onChange={(e) => {
            const val = e.target.value;
            setFormData({ ...formData, ownerId: val === "" ? "" : parseInt(val) });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Organization Name */}
      <div>
        <label className="text-sm font-medium text-gray-600">Байгууллага</label>
        <input
          type="text"
          value={formData.orgName ?? ""}
          onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-22 px-20">
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
    </div>
  );
}

export default Page;
