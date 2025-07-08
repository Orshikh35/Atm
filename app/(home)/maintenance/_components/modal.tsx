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

  export default modalData;