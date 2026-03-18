import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export const UserPost = ({ question, onPostDeleteSuccess, setRefresh }) => {
  const questionData = {
    id: question.id,
    username: question.username || "Anonymous",
    userId: question.userId,
    userImage: "https://i.pravatar.cc/80?u=" + question.username,
    question: question.question,
    createdTime: question.createdTime,
    initialLikes: question.likes,
    answerCount: question.answerCount,
  };

  const [likes, setLikes] = useState(questionData.initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLikeToggle = () => {
    setLikes(prev => hasLiked ? prev - 1 : prev + 1);
    setHasLiked(prev => !prev);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      setIsDeleting(true);
      const res = await axios.delete(
        `http://localhost:8080/user/question/${questionData.id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (res.data === true || res.data.status === "success") {
        toast.success("Question deleted successfully!");
        onPostDeleteSuccess();
      } else {
        toast.error("Failed to delete question.");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Something went wrong.");
    } finally {
      setIsDeleting(false);
      setRefresh(true);
    }
  };

  const readableTime = new Date(questionData.createdTime).toLocaleString("en-US", {
    month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  const isOwner = String(localStorage.getItem("username")) === String(questionData.username);
  const role = localStorage.getItem("role");
  const discussionPath = role === "USER" ? "/user/discussion" : "/expert/discussion";

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-white shadow-sm
                 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
      style={{ border: "1px solid #e9d5ff" }}
    >
      {/* Always-visible gradient top bar */}
      <div className="h-1 w-full"
        style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />

      <div className="p-5">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-3 mb-3">

          <Link
            to={discussionPath}
            state={{ question: questionData }}
            className="flex items-center gap-3 min-w-0 flex-1"
          >
            {/* Avatar with gradient ring */}
            <div className="shrink-0 p-0.5 rounded-full"
              style={{ background: "linear-gradient(135deg,#3C9BF9,#9100BD)" }}>
              <img
                src={questionData.userImage}
                alt={questionData.username}
                className="w-9 h-9 rounded-full object-cover block"
                style={{ border: "2px solid white" }}
              />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold truncate" style={{ color: "#9100BD" }}>
                @{questionData.username}
              </p>
              <p className="text-[11px] text-gray-400">{readableTime}</p>
            </div>
          </Link>

          {/* Delete — owner only */}
          {isOwner && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              title="Delete post"
              className="shrink-0 p-1.5 rounded-lg transition-colors duration-150
                         text-gray-300 hover:bg-red-50 hover:text-red-500"
            >
              {isDeleting
                ? <span className="text-[11px] text-gray-400">...</span>
                : <Trash2 size={15} />
              }
            </button>
          )}
        </div>

        {/* ── Question text ── */}
        <Link to={discussionPath} state={{ question: questionData }}>
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-3
                        group-hover:text-[#9100BD] transition-colors duration-150">
            {questionData.question}
          </p>
        </Link>

        {/* ── Divider ── */}
        <div className="my-4 h-px"
          style={{ background: "linear-gradient(to right,#e9d5ff,transparent)" }} />

        {/* ── Footer ── */}
        <div className="flex items-center justify-between">

          {/* Like button */}
          <button
            onClick={handleLikeToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                       transition-all duration-200 select-none"
            style={hasLiked
              ? { background: "linear-gradient(90deg,#3C9BF9,#9100BD)", color: "white" }
              : { background: "#faf5ff", color: "#9100BD", border: "1px solid #ddd6fe" }
            }
          >
            <Heart
              size={13}
              fill={hasLiked ? "white" : "#9100BD"}
              stroke={hasLiked ? "white" : "#9100BD"}
            />
            {likes}
          </button>

          {/* Answers count */}
          <Link
            to={discussionPath}
            state={{ question: questionData }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                       transition-all duration-200 hover:opacity-80"
            style={{ background: "linear-gradient(90deg,#eff6ff,#faf5ff)", color: "#3C9BF9", border: "1px solid #bfdbfe" }}
          >
            <MessageCircle size={13} />
            {questionData.answerCount} {questionData.answerCount === 1 ? "Answer" : "Answers"}
          </Link>

        </div>
      </div>

      {/* Bottom glow line on hover */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />
    </div>
  );
};