import React from 'react'

function pagination() {
  return (
    <div className="p-4 border-t border-gray-100/10 bg-[#181719]">
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="text-sm text-gray-500">
        Нийт: <span className="font-medium text-gray-700">{data.length}</span>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 disabled:text-gray-300 transition-colors"
        >
          <ChevronLeft size={16} />
          Өмнөх
        </button>
        
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded">
            {table.getState().pagination.pageIndex + 1}
          </span>
          / 
          <span>{table.getPageCount()}</span>
        </div>
        
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 disabled:text-gray-300 transition-colors"
        >
          Дараах
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  </div>
  )
}

export default pagination