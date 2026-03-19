import axios from "axios";
import { useEffect, useState } from "react";
import { UserPost } from "../components/UserPost";
import Pagination from "../../utils/Pagination";
import { Send, BookOpen, Sparkles } from "lucide-react";

const Share = () => {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState([]);
  const userId = localStorage.getItem("id");
  const [posted, setPosted] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [size] = useState(6);

  useEffect(() => {
    const getAllQuestionsByUserId = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/user/question/getMy?page=${page}&size=${size}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setQuestions(res.data.content);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    getAllQuestionsByUserId();
  }, [page, userId, posted, refresh]);

  const handlePostDelete = () => setRefresh(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      alert("Please enter some text before sending!");
      return;
    }
    try {
      setIsSubmitting(true);
      setPosted(true);
      const res = await axios.post(
        "http://localhost:8080/user/question/post",
        { question: inputValue },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (res.data) setInputValue("");
      else console.error("Server error:", res.data);
    } catch (error) {
      console.error("Error posting question:", error);
    } finally {
      setPosted(false);
      setIsSubmitting(false);
    }
  };

  const charCount = inputValue.length;
  const maxChars = 500;

  return (
    <div className="min-h-full w-full bg-gradient">
      <div className="w-full  mx-auto px-10 py-8 flex flex-col gap-6">

        {/* ══ COMPOSE CARD ══ */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-purple-100">
          {/* top accent */}
          <div className="h-1" style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />

          <div className="p-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg,#eff6ff,#faf5ff)", border: "1px solid #ddd6fe" }}>
                <Sparkles size={15} style={{ color: "#9100BD" }} />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">Share Your Mind</h2>
                <p className="text-xs text-gray-400">Express freely — this is your safe space</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.slice(0, maxChars))}
                  placeholder="Express your thoughts, emotions, or feelings here..."
                  rows={5}
                  className="w-full p-4 rounded-xl text-sm text-gray-800 placeholder-gray-400 
                             resize-none focus:outline-none transition-all duration-200 bg-white dark:bg-gray-900"
                  style={{
                    border: "1.5px solid #ddd6fe",
                    boxShadow: "inset 0 1px 4px rgba(145,0,189,0.04)",
                  }}
                  onFocus={e => e.target.style.borderColor = "#9100BD"}
                  onBlur={e => e.target.style.borderColor = "#ddd6fe"}
                />
                {/* char counter */}
                <span className="absolute bottom-3 right-3 text-[10px] font-medium"
                  style={{ color: charCount > maxChars * 0.85 ? "#f43f5e" : "#c4b5fd" }}>
                  {charCount}/{maxChars}
                </span>
              </div>

              {/* Submit row */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span style={{ color: "#9100BD" }}>✦</span> Your post is anonymous to others
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting || !inputValue.trim()}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold
                             text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5
                             disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
                  style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}
                >
                  <Send size={14} />
                  {isSubmitting ? "Sending..." : "Share"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ══ REFLECTIONS LIST ══ */}
        <div className="flex flex-col gap-4">
          {/* Section header */}
          <div className="flex items-center gap-2">
            <BookOpen size={17} style={{ color: "#9100BD" }} />
            <h2 className="text-base font-bold text-gray-900">Your Shared Reflections</h2>
            { totalElements && totalElements > 0 && (
              <span className="ml-auto text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                style={{ background: "#faf5ff", color: "#9100BD", border: "1px solid #ddd6fe" }}>
                {totalElements} post{totalElements !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* thin divider */}
          <div className="h-px" style={{ background: "linear-gradient(to right,#ddd6fe,transparent)" }} />

          {questions && questions.length > 0 ? (
            questions.map(question => (
              <UserPost
                key={question.id}
                question={question}
                onPostDeleteSuccess={handlePostDelete}
                setRefresh={setRefresh}
              />
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-purple-100 p-12 text-center shadow-sm">
              <p className="text-4xl mb-3">✍️</p>
              <p className="text-gray-600 font-medium text-sm">You haven't shared anything yet.</p>
              <p className="text-gray-400 text-xs mt-1">Write something above to get started.</p>
            </div>
          )}
        </div>

        {/* ══ PAGINATION ══ */}
        {totalPages > 1 && (
          <div className="mt-2">
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        )}

      </div>
    </div>
  );
};

export default Share;