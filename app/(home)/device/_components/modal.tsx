const modalData = (formData: any, setFormData: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#1f1f1f]/70 backdrop-blur-md p-2 rounded-2xl shadow-inner shadow-orange-500/10">
    {[
      { label: "Төхөөрөмжийн нэр", name: "deviceName", type: "text" },
      { label: "Сериал дугаар", name: "serialNumber", type: "text" },
      { label: "Загвар", name: "model", type: "text" },
      { label: "IP хаяг", name: "ip", type: "text" },
      { label: "Порт", name: "port", type: "number" },
      { label: "Байршил", name: "location", type: "text" },
      { label: "Аймаг / Хот", name: "province", type: "text" },
      { label: "Master Key", name: "masterkey", type: "text" },
      { label: "Суулгасан огноо", name: "installationDate", type: "date" },
      { label: "Дуусах огноо", name: "expiredDate", type: "date" },
      { label: "Эзэмшигч ID", name: "ownerId", type: "number" },
      { label: "Байгууллага", name: "orgName", type: "text" },
    ].map((field, i) => (
      <div key={i}>
        <label className="block text-sm font-medium text-gray-300 mb-1">{field.label}</label>
        <input
          type={field.type}
          value={formData[field.name] ?? ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              [field.name]:
                field.type === "number"
                  ? e.target.value === ""
                    ? ""
                    : parseInt(e.target.value)
                  : e.target.value,
            })
          }
          className="w-full px-4 py-2 rounded-lg bg-[#2b2b2b]/70 border border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        />
      </div>
    ))}

    {/* Device Type */}
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Төхөөрөмжийн төрөл</label>
      <select
        value={formData.deviceType ?? 0}
        onChange={(e) => setFormData({ ...formData, deviceType: parseInt(e.target.value) })}
        className="w-full px-4 py-2 rounded-lg bg-[#2b2b2b]/70 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
      >
        <option value={0}>ATM</option>
        <option value={1}>Kiosk</option>
        <option value={2}>POS</option>
      </select>
    </div>

    {/* Status */}
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Төлөв</label>
      <select
        value={formData.status ?? 0}
        onChange={(e) => setFormData({ ...formData, status: parseInt(e.target.value) })}
        className="w-full px-4 py-2 rounded-lg bg-[#2b2b2b]/70 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
      >
        <option value={0}>Идэвхтэй</option>
        <option value={1}>Идэвхгүй</option>
      </select>
    </div>
  </div>
);
export default modalData;