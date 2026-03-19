import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Trash2, Heart, BadgeCheck } from "lucide-react";
import { toast } from "react-toastify";

const AnswerBox = ({ ans, setDeleting: notifyParent }) => {
  const [deleting, setDeleting] = useState(false);
  const [liked, setLiked]       = useState(false);
  const [likes, setLikes]       = useState(ans.likes ?? 0);

  const isOwner  = localStorage.getItem("username") === ans.displayName;
  const isExpert = ans.role === "EXPERT";

  const displayTime = (date) =>
    new Date(date).toLocaleString("en-US", {
      month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  const handleDelete = async () => {
    if (!window.confirm("Delete your answer?")) return;
    try {
      setDeleting(true);
      if (notifyParent) notifyParent(true);
      const res = await axios.delete(
        `http://localhost:8080/api/answer/deleteAnswer/${ans.id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (res.data === true) {
        toast.success("Answer deleted successfully.");
      } else {
        toast.error("Failed to delete answer.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.");
    } finally {
      setDeleting(false);
      if (notifyParent) notifyParent(false);
    }
  };

  const handleLike = () => {
    setLiked(p => !p);
    setLikes(p => liked ? p - 1 : p + 1);
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden
                    bg-white dark:bg-gray-800
                    border border-purple-100 dark:border-gray-700
                    shadow-sm hover:shadow-md hover:-translate-y-0.5
                    transition-all duration-200">

      {/* Hover accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />

      {/* Expert badge strip */}
      {isExpert && (
        <div className="h-0.5 w-full"
          style={{ background: "linear-gradient(90deg,#3b82f6,#6366f1)" }} />
      )}

      <div className="p-4 sm:p-5">

        {/* ── Header row ── */}
        <div className="flex items-start justify-between gap-3 mb-3">

          {/* Avatar + name */}
          <div className="flex items-start gap-3 min-w-0 flex-1">
            {/* Avatar with gradient ring */}
            <div className="shrink-0 p-0.5 rounded-full"
              style={{ background: isExpert
                ? "linear-gradient(135deg,#3b82f6,#6366f1)"
                : "linear-gradient(135deg,#3C9BF9,#9100BD)" }}>
              <img
                src={`https://i.pravatar.cc/50?u=${ans.displayName}`}
                alt={ans.displayName}
                className="w-8 h-8 rounded-full object-cover block"
                style={{ border: "2px solid white" }}
              />
            </div>

            <div className="min-w-0">
              {isExpert ? (
                <Link
                  to="/user/expertDetails"
                  state={{ expertId: ans.accountId }}
                  className="inline-flex items-center gap-1.5 group/link"
                >
                  <span className="text-sm font-bold text-gray-900 dark:text-white
                                   group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400
                                   transition-colors truncate">
                    {ans.displayName}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5
                                   rounded-full shrink-0"
                    style={{ background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" }}>
                    <BadgeCheck size={9} /> Expert
                  </span>
                </Link>
              ) : (
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {ans.displayName}
                </p>
              )}
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                {displayTime(ans.createdAt)}
              </p>
            </div>
          </div>

          {/* Delete button — owner only */}
          {isOwner && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              title="Delete answer"
              className="shrink-0 p-1.5 rounded-lg transition-colors duration-150
                         text-gray-300 dark:text-gray-600
                         hover:bg-red-50 dark:hover:bg-red-900/20
                         hover:text-red-500 dark:hover:text-red-400"
            >
              {deleting
                ? <span className="text-[10px] text-gray-400">...</span>
                : <Trash2 size={14} />
              }
            </button>
          )}
        </div>

        {/* ── Answer text ── */}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {ans.answer}
        </p>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/60">

          {/* Like button */}
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                       transition-all duration-200 select-none"
            style={liked
              ? { background: "linear-gradient(90deg,#3C9BF9,#9100BD)", color: "white" }
              : { background: "#faf5ff", color: "#9100BD", border: "1px solid #ddd6fe" }
            }
          >
            <Heart
              size={12}
              fill={liked ? "white" : "#9100BD"}
              stroke={liked ? "white" : "#9100BD"}
            />
            {likes}
          </button>

          {/* Role badge */}
          <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">
            {isExpert ? "🩺 Expert answer" : "💬 Community"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnswerBox;