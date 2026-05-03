import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../utils/Pagination";
import { UserPost } from "../components/UserPost";
import { MessageSquare } from "lucide-react";

const SkeletonPost = () => (
  <div className="animate-pulse bg-white dark:bg-gray-800/60 rounded-2xl border border-purple-100 dark:border-gray-700 p-5">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
      <div className="space-y-2 flex-1">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-28" />
        <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded w-20" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
    </div>
    <div className="flex justify-between mt-5">
      <div className="h-7 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <div className="h-7 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
    </div>
  </div>
);

const Support = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://mindmate-production-81d8.up.railway.app/api/question/getAll?page=${page}&size=${size}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setTotalPages(res.data.totalPages);
        if (Array.isArray(res.data.content)) {
          setQuestions(
            res.data.content.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime))
          );
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };
    getAllQuestions();
  }, [page, refresh]);

  const handlePostDelete = () => setRefresh(prev => !prev);

  return (
    /*
      No negative margins. This div simply fills whatever space
      the Outlet gives it. The parent layout owns the sidebar/navbar.
      `min-h-full` stretches to at least fill the outlet height.
      `bg-gradient` is your custom Tailwind class.
      Dark mode overrides it with a solid dark bg.
    */
    <div className="min-h-full w-full bg-gradient dark:bg-gray-900">

      <div className="w-full  mx-auto px-10 py-8">

        {/* ── Header ── */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest
                           uppercase text-purple-600 dark:text-purple-400
                           bg-purple-100 dark:bg-purple-900/30
                           px-3 py-1 rounded-full
                           border border-purple-200 dark:border-purple-700/50">
            ✦ Community
          </span>

          <div className="flex items-center gap-2 mt-3">
            <MessageSquare size={20} className="text-purple-500 dark:text-purple-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reflections</h1>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            A safe space to share, reflect, and support one another.
          </p>

          {/* subtle divider */}
          <div className="mt-4 h-px w-full"
            style={{ background: "linear-gradient(to right, #ddd6fe, transparent)" }} />
        </div>

        {/* ── Posts list ── */}
        <div className="flex flex-col gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonPost key={i} />)
          ) : questions.length > 0 ? (
            questions.map(question => (
              <UserPost
                key={question.id}
                question={question}
                onPostDeleteSuccess={handlePostDelete}
                setRefresh={setRefresh}
              />
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800/60 rounded-2xl
                            border border-purple-100 dark:border-gray-700
                            p-14 text-center shadow-sm">
              <p className="text-5xl mb-3">💬</p>
              <p className="text-gray-600 dark:text-gray-300 font-medium text-sm">
                No reflections yet.
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                Be the first to share something.
              </p>
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

export default Support;