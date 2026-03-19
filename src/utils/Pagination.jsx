import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, setPage }) => {
  if (!totalPages || totalPages <= 1) return null;

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* ── Smart page number logic ──
     Always show: first, last, current, and 1 neighbour each side.
     Fill gaps with "..." ellipsis.
  */
  const getPageNumbers = () => {
    const pages = [];
    const delta = 1; // neighbours on each side of current

    const rangeStart = Math.max(1, page - delta);          // 0-indexed → display 1-indexed
    const rangeEnd   = Math.min(totalPages - 2, page + delta);

    // Always include first page (index 0)
    pages.push(0);

    // Left ellipsis
    if (rangeStart > 1) pages.push("...");

    // Middle range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (i > 0 && i < totalPages - 1) pages.push(i);
    }

    // Right ellipsis
    if (rangeEnd < totalPages - 2) pages.push("...");

    // Always include last page
    if (totalPages > 1) pages.push(totalPages - 1);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const btnBase = `
    h-9 min-w-[36px] px-2.5 rounded-xl text-sm font-semibold
    flex items-center justify-center
    transition-all duration-150 select-none
  `;

  const activeBtn = `text-white shadow-sm`;
  const idleBtn   = `
    bg-white dark:bg-gray-800
    text-gray-600 dark:text-gray-300
    border border-gray-200 dark:border-gray-700
    hover:border-purple-400 dark:hover:border-purple-500
    hover:text-purple-600 dark:hover:text-purple-400
  `;
  const disabledBtn = `
    bg-gray-100 dark:bg-gray-800/50
    text-gray-300 dark:text-gray-600
    border border-gray-200 dark:border-gray-700
    cursor-not-allowed
  `;

  return (
    <div className="flex justify-center items-center gap-1.5 mt-6 flex-wrap">

      {/* ── Prev ── */}
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 0}
        className={`${btnBase} ${page === 0 ? disabledBtn : idleBtn} gap-1`}
        aria-label="Previous page"
      >
        <ChevronLeft size={15} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* ── Page numbers ── */}
      {pageNumbers.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`}
            className="h-9 w-8 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm font-medium">
            ···
          </span>
        ) : (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`${btnBase} ${page === p ? activeBtn : idleBtn}`}
            style={page === p
              ? { background: "linear-gradient(135deg,#3C9BF9,#9100BD)" }
              : {}
            }
            aria-label={`Page ${p + 1}`}
            aria-current={page === p ? "page" : undefined}
          >
            {p + 1}
          </button>
        )
      )}

      {/* ── Next ── */}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages - 1}
        className={`${btnBase} ${page === totalPages - 1 ? disabledBtn : idleBtn} gap-1`}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={15} />
      </button>

    </div>
  );
};

export default Pagination;