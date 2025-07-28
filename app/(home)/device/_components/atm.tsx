"use client";
import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "./fixDataTable";
import dayjs from "dayjs";
import { ATM } from "@/types/request";
import modalData from "./modal";
import {
  Search,
  Download,
  Plus,
} from "lucide-react";
import exportToExcel from "@/components/exportToExcel";
import { deleteDevice, getDevicesATM, updateDevice } from "@/action/device";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/deleteModal";

function Atm() {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<ColumnDef<any, any>[]>([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
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
    orgName: "",
    atmZone: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchAtmData = async () => {
      const res = await getDevicesATM();
      console.log("Fetched ATM data:", res);

      if (res) {
        setData(res);
      } else {
        toast.error("ATM төхөөрөмжийн мэдээлэл авахад алдаа гарлаа");
        console.error("Error fetching ATM data:", res.message);
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

  const handleSave = async () => {
    try {
      const payload = {
        deviceName: formData.deviceName || "",
        serialNumber: formData.serialNumber || "",
        model: formData.model || "",
        deviceType: formData.deviceType ?? 0,
        status: formData.status ?? 0,
        ip: formData.ip || "",
        port: formData.port ?? 0,
        location: formData.location || "",
        province: formData.province || "",
        masterkey: formData.masterkey || "",
        installationDate: formData.installationDate || null,
        expiredDate: formData.expiredDate || null,
        ownerId: formData.ownerId ?? 0,
        orgName: formData.orgName || "",
      };

      console.log("Sending payload:", payload);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/Devices`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Server error response:", errorData);
        throw new Error("Шинээр хадгалах үед алдаа гарлаа");
      }

      const newItem = await response.json();
      toast.success("Амжилттай нэмэгдлээ");
      setData((prev) => [...prev, newItem]);

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
        orgName: "",
        atmZone: "",
      });
    } catch (error) {
      console.error("Алдаа:", error);
      toast.error("Хадгалах үед алдаа гарлаа");
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;

    const result = await deleteDevice(deleteId);

    if (result?.status) {
      const res = await getDevicesATM();
      if (res?.status) {
        setData(res.result);
      }
    } else {
      console.error("Устгах үед алдаа:", result?.message);
      toast.error(result?.message);
    }
    setIsDeleteOpen(false);
    setDeleteId(null);
  };

  const handleUpdate = async (id: number, formData: ATM) => {
    const res = await updateDevice(id, formData);
    if (res?.status) {
      const refreshed = await getDevicesATM();
      console.log({ refreshed });

      if (res?.status) {
        setData(refreshed.result);
        toast.success("Амжилттай шинэчиллээ");
      } else {
        console.error("Update алдаа:", res.message);
        toast.error(res.message);
      }
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
        orgName: "",
        atmZone: "",
      });
    }
  };

  return (
    <div className="">
      <div className="py-6 ">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <h2 className="text-xl font-semibold text-gray-100/50">
            ATM жагсаалт
          </h2>

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
                onClick={() => exportToExcel(data, "devices_data.xlsx")}
                className="flex items-center gap-2 px-4 py-2 text-orange-600 rounded-lg text-sm font-medium transition-colors border border-orange-600"
              >
                <Download size={16} />
                <span>Excel</span>
              </button>

              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsEditMode(false);
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
                    orgName: "",
                  });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
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
        data={data}
        columns={columns}
        onSave={handleSave}
        modalData={modalData}
        formData={formData}
        setFormData={setFormData}
        title={"Төхөөрөмж"}
        onUpdate={handleUpdate}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        inputValue={inputValue}
        setInputValue={setInputValue}
        exportToExcel={() => exportToExcel(data, "devices_data.xlsx")}
      />

<DeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Atm;
