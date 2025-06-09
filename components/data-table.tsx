import { Edit, Trash2, Calendar, User, FileText } from 'lucide-react';
import type { ATM } from "@/app/page";

interface DataTableProps {
  records: ATM[];
  onEdit: (record: ATM) => void;
  onDelete: (id: string) => void;
}

export function DataTable({ records, onEdit, onDelete }: DataTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Шийдвэрлэсэн":
        return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200";
      case "Хүлээгдэж буй":
        return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200";
      case "Ажиллаж байна":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200";
      case "Цуцлагдсан":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200";
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200";
    }
  };

  if (records.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
          <FileText className="h-12 w-12 text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Одоогоор бичлэг байхгүй байна</h3>
        <p className="text-gray-500">Шинэ бичлэг нэмэхийн тулд дээрх товчийг дарна уу</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden ">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className=" border-b-1 border-gray-800">
              <th className="text-left p-4 font-semibold text-gray-700">Киоск</th>
              <th className="text-left p-4 font-semibold text-gray-700">Төлөв</th>
              <th className="text-left p-4 font-semibold text-gray-700">Хариуцсан инженер</th>
              <th className="text-left p-4 font-semibold text-gray-700">Хүсэлт илгээсэн</th>
              <th className="text-left p-4 font-semibold text-gray-700">Хүсэлт илгээсэн огноо</th>
              <th className="text-left p-4 font-semibold text-gray-700">Хаагдсан огноо</th>
              <th className="text-left p-4 font-semibold text-gray-700">Тайлбар</th>
              <th className="text-right p-4 font-semibold text-gray-700">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr
                key={record.id}
                className={`border-b border-gray-600  bg-gradient-to-br from-gray-200/40 to-gray-300/50  ${
                  index % 2 === 0 ? "bg-transparent" : "bg-gray-50/50"
                }`}
              >
                <td className="p-4 font-medium">{record.kiosk}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border ${getStatusColor(
                      record.status
                    )}`}
                  >
                    {record.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
  
                    <span className="font-medium ">{record.engineer}</span>
                  </div>
                </td>
                <td className="p-4 max-w-[200px]">
                  <div className="truncate " title={record.requestText}>
                    {record.requestText}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 ">
                    <Calendar className="h-4 w-4" />
                    <span>{record.requestDate}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="">
                    {record.closureDate || "Хаагдаагүй"}
                  </span>
                </td>
                <td className="p-4 max-w-[300px]">
                  <div className="truncate " title={record.description}>
                    {record.description}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(record)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200 group"
                      title="Засах"
                    >
                      <Edit className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    </button>
                    <button
                      onClick={() => onDelete(record.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200 group"
                      title="Устгах"
                    >
                      <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {records.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <span
                className={`px-3 py-2 rounded-xl text-xs font-semibold border ${getStatusColor(
                  record.status
                )}`}
              >
                {record.status}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(record)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(record.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="text-sm font-semibold text-gray-800 mb-3">
              {record.kiosk}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-800">{record.engineer}</span>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Хүсэлт:</p>
                <p className="text-gray-800">{record.requestText}</p>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{record.requestDate}</span>
                </div>
                {record.closureDate && (
                  <div>
                    Хаалт: {record.closureDate}
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Тайлбар:</p>
                <p className="text-gray-800">{record.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
