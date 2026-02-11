const Pagination = ({ page, totalPages, setPage }) => {
  if (totalPages === 0) return null;

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      
      {/* Prev Button */}
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 0}
        className={`px-4 py-2 rounded-lg border transition-all duration-200
          ${page === 0
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-purple-600 border-purple-400 hover:bg-purple-100"
          }`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index)}
          className={`px-4 py-2 rounded-lg border transition-all duration-200
            ${page === index
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-white text-purple-600 border-purple-400 hover:bg-purple-100"
            }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages - 1}
        className={`px-4 py-2 rounded-lg border transition-all duration-200
          ${page === totalPages - 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-purple-600 border-purple-400 hover:bg-purple-100"
          }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
