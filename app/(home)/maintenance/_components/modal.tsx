const modalData = (formData: any, setFormData: any) => (
  <div className="space-y-5 text-white bg-[#1a1a1a]/80 p-4 rounded-2xl backdrop-blur-md shadow-md">
    {/* Device ID */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-300">Device ID</label>
      <input
        type="number"
        value={formData.deviceId}
        onChange={(e) =>
          setFormData({ ...formData, deviceId: parseInt(e.target.value) })
        }
        className="w-full px-4 py-2 rounded-lg bg-[#2b2b2b]/80 border border-gray-600 placeholder:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/70 transition"
      />
    </div>

    {/* Description */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-300">Description</label>
      <input
        type="text"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-[#2b2b2b]/80 border border-gray-600 placeholder:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/70 transition"
      />
    </div>

    {/* Requested By */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-300">Requested By</label>
      <input
        type="number"
        value={formData.requestedBy}
        onChange={(e) =>
          setFormData({ ...formData, requestedBy: parseInt(e.target.value) })
        }
        className="w-full px-4 py-2 rounded-lg bg-[#2b2b2b]/80 border border-gray-600 placeholder:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/70 transition"
      />
    </div>

    {/* Maintenance Type */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-300">Maintenance Type</label>
      <select
        value={formData.maintenanceType}
        onChange={(e) =>
          setFormData({ ...formData, maintenanceType: parseInt(e.target.value) })
        }
        className="w-full px-4 py-2 rounded-lg bg-[#2b2b2b]/80 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/70 transition"
      >
        <option value={0}>Төлөвлөгөөт</option>
        <option value={1}>Яаралтай</option>
      </select>
    </div>
  </div>
);
export default modalData;