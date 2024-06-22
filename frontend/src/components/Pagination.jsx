// src/components/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, setPage, perPage }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div>
      <span className="text-sm font-bold  text-gray-600">Page {currentPage}</span>
      </div>
      <div>
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="py-2 text-black font-bold disabled:opacity-50"
      >
        Previous - 
      </button>
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pl-1 py-2 font-bold text-black disabled:opacity-50"
      >
        Next
      </button>
      </div>
      <div>
      <span className="text-sm font-bold  text-gray-600">Per Page: {perPage}</span>
      </div>
    </div>
  );
};

export default Pagination;
