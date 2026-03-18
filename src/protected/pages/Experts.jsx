import axios from "axios";
import { useEffect, useState } from "react";
import { ExpertCard } from "../components/ExpertCard";
import Pagination from "../../utils/Pagination";
import { Users } from "lucide-react";

const SkeletonCard = () => (
  <div className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl border border-purple-100 dark:border-gray-700 p-5 flex gap-4">
    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
    <div className="flex-1 space-y-2.5">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
    </div>
  </div>
);

const Experts = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [size] = useState(10);

  useEffect(() => {
    async function getAllExperts() {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8080/public/getAllExperts?page=${page}&size=${size}`);
        setExperts(res.data.content);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    getAllExperts();
  }, [page]);

  return (
    <div className="min-h-full w-full bg-gradient dark:bg-gray-900">
      <div className="w-full mx-auto px-8 py-8">

        {/* ── Header ── */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase
                           text-purple-600 dark:text-purple-400
                           bg-purple-100 dark:bg-purple-900/30
                           px-3 py-1 rounded-full border border-purple-200 dark:border-purple-700/50">
            ✦ Our Team
          </span>
          <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-purple-500 dark:text-purple-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Find Your Expert</h1>
            </div>
            {!loading && totalElements > 0 && (
              <span className="text-[11px] font-semibold px-3 py-1 rounded-full"
                style={{ background: "#faf5ff", color: "#9100BD", border: "1px solid #ddd6fe" }}>
                {totalElements} expert{totalElements !== 1 ? "s" : ""} available
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Connect with certified mental health professionals ready to support you.
          </p>
          <div className="mt-4 h-px" style={{ background: "linear-gradient(to right,#ddd6fe,transparent)" }} />
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          ) : experts && experts.length > 0 ? (
            experts.map(expert => <ExpertCard key={expert.id} expert={expert} />)
          ) : (
            <div className="col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-purple-100 dark:border-gray-700 p-14 text-center shadow-sm">
              <p className="text-5xl mb-3">🔍</p>
              <p className="text-gray-600 dark:text-gray-300 font-medium text-sm">No experts found at the moment.</p>
            </div>
          )}
        </div>

        {/* ── Pagination ── */}
        {!loading && totalPages > 1 && (
          <div className="mt-6">
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        )}

      </div>
    </div>
  );
};

export default Experts;