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


  export default modalData;