import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Clock, User } from "lucide-react";
import axios from "axios";
import Pagination from "../../utils/Pagination";
import AnswerBox from "../components/AnswerBox";
import TypeAnswer from "../components/TypeAnswer";

const SkeletonAnswer = () => (
  <div className="animate-pulse rounded-2xl border border-purple-100 dark:border-gray-700
                  bg-white dark:bg-gray-800 p-5 flex gap-3">
    <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
    </div>
  </div>
);

const Discussion = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const username  = localStorage.getItem("username");

  const [loading, setLoading]           = useState(false);
  const [submitting, setSubmitting]     = useState(false);
  const [deleting, setDeleting]         = useState(false);
  const [answers, setAnswers]           = useState([]);
  const [page, setPage]                 = useState(0);
  const [totalPages, setTotalPages]     = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [size]                          = useState(5);
  const [question]                      = useState(location.state?.question);

  useEffect(() => {
    if (!question) { alert("Question not found"); navigate(-1); }
  }, []);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8080/api/answer/getAllAnswersByQuestionId/${question.id}?page=${page}&size=${size}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
        setAnswers(res.data.content || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (question) fetchAnswers();
  }, [page, submitting, deleting]);

  const displayTime = (date) =>
    new Date(date).toLocaleString("en-US", {
      weekday: "short", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  const sortedAnswers = [...(answers || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const isOwner = question?.username === username;

  return (
    <div className="min-h-full w-full bg-gradient dark:bg-gray-900">
      <div className="w-full  mx-auto px-10 py-6 space-y-5">

        {/* ── Back button ── */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-medium transition-colors
                     text-purple-600 dark:text-purple-400
                     hover:text-blue-500 dark:hover:text-blue-400"
        >
          <ArrowLeft size={15} /> Back
        </button>

        {/* ══ QUESTION CARD ══ */}
        <div className="rounded-2xl overflow-hidden shadow-sm
                        bg-white dark:bg-gray-800
                        border border-purple-100 dark:border-gray-700">
          <div style={{ height: 4, background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />

          <div className="p-5 sm:p-6">
            {/* Question text */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug mb-4">
              {question?.question}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                  style={{ background: "linear-gradient(135deg,#3C9BF9,#9100BD)" }}>
                  {question?.username?.charAt(0)?.toUpperCase()}
                </div>
                Asked by{" "}
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  {isOwner ? "you" : question?.username}
                </span>
              </span>

              <span className="flex items-center gap-1">
                <Clock size={11} />
                {displayTime(question?.createdTime)}
              </span>

              <span className="flex items-center gap-1 ml-auto"
                style={{ color: "#3C9BF9" }}>
                <MessageCircle size={11} />
                {totalElements} {totalElements === 1 ? "answer" : "answers"}
              </span>
            </div>
          </div>
        </div>

        {/* ══ TYPE ANSWER (only for non-owners) ══ */}
        {!isOwner && (
          <TypeAnswer
            question={question}
            submitting={submitting}
            setSubmitting={setSubmitting}
          />
        )}

        {/* ══ ANSWERS SECTION ══ */}
        <div className="rounded-2xl overflow-hidden shadow-sm
                        bg-white dark:bg-gray-800
                        border border-purple-100 dark:border-gray-700">
          <div style={{ height: 4, background: "linear-gradient(90deg,#9100BD,#3C9BF9)" }} />

          <div className="p-5 sm:p-6">
            {/* Section heading */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <MessageCircle size={16} className="text-blue-500" />
                <h2 className="text-base font-bold text-gray-800 dark:text-white">
                  Answers
                </h2>
              </div>
              {totalElements > 0 && (
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                  style={{ background: "#faf5ff", color: "#9100BD", border: "1px solid #ddd6fe" }}>
                  {totalElements} total
                </span>
              )}
            </div>

            {/* Content */}
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => <SkeletonAnswer key={i} />)
              ) : sortedAnswers.length > 0 ? (
                sortedAnswers.map((ans) => (
                  <AnswerBox
                    key={ans.id}
                    ans={ans}
                    setDeleting={setDeleting}
                    deleting={deleting}
                  />
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-3xl mb-2">💬</p>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    No answers yet.
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Be the first to respond!
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="mt-5">
                <Pagination page={page} totalPages={totalPages} setPage={setPage} />
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Discussion;