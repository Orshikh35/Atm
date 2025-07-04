"use client";
import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/reportTable";
import { toast } from "sonner";
import dayjs from "dayjs";
import { ATM } from "@/types/request";

function Page() {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<ColumnDef<any, any>[]>([]);

  useEffect(() => {
    const fetchAtmData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/devices/atm/maintenance/Records`,
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

  const handleSave = async () => {};
  
  const handleDelete = async (id: number) => {};

  const handleUpdate = async (id: number, formData: ATM) => { };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-22 px-20">
      <div className="">
        <DataTable
          onDelete={handleDelete}
          data={[...data].reverse()}
          columns={columns}
          onSave={handleSave}
          title={"Тайлан"}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}

export default Page;
