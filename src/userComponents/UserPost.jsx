import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom'
export const UserPost = ({ question, onDelete }) => {
  const questionData = {
    id: question.id,
    username: question.username || "Anonymous",
    userId: question.userId,
    userImage: "https://i.pravatar.cc/60?u=techlearner",
    question: question.question,
    createdTime: question.createdTime,
    initialLikes: question.rating,
    answerCount : question.answerList.length
  };

  const [likes, setLikes] = useState(questionData.initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLikeToggle = () => {
    setLikes(hasLiked ? likes - 1 : likes + 1);
    setHasLiked(!hasLiked);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      setIsDeleting(true);
      const res = await axios.delete(
        `http://localhost:8080/question/deleteById/${questionData.id}`
      );
      if (res.data === true || res.data.status === "success") {
        alert("Question deleted successfully!");
        window.location.reload();
      } else {
        alert("Failed to delete question.");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const readableTime = new Date(questionData.createdTime).toLocaleString("en-US", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="relative w-full bg-gradient-to-b from-[#ebf0f1] to-[#d6e4f2] shadow-lg rounded-lg border border-[#3C9BF9] p-4 mb-4 transition hover:shadow-xl">
      {/* User info */}
      <Link to="/user/discussion"
        state={{questionId : question.id}}
      >
        <div className="flex items-center mb-2">
          <img
            src={questionData.userImage}
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-[#9100BD] mr-3"
          />
          <div>
            <div className="font-semibold text-purple-800">{questionData.username}</div>
            <div className="text-xs text-gray-500">{readableTime}</div>
          </div>
        </div>

        {/* Question text */}
        <div className="text-gray-800 mb-6">{questionData.question}</div>
      </Link>
      <div className="flex justify-between">
        {/* Like button */}
        <button
          onClick={handleLikeToggle}
          aria-pressed={hasLiked}
          className={`flex items-center gap-1 text-sm px-2 py-1 rounded transition
          ${hasLiked
              ? "bg-gradient-to-r from-[#3C9BF9] to-[#9100BD] text-white"
              : "text-purple-700 hover:bg-gray-200"}
        `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={hasLiked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke={hasLiked ? "none" : "#9100BD"}
            strokeWidth="1.5"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.8 7.3c-.8-3-4.1-4.2-6.5-2.2L12 8.1l-3.3-3c-2.4-2-5.7-.9-6.5 2.2-.9 3.3 1.1 6.1 3.7 8.3L12 21l6.1-5.3c2.6-2.2 4.6-5 3.7-8.4z"
            />
          </svg>
          <span>{likes}</span>
        </button>

        <div className="flex gap-3">
          <span className="text-green-700 text-xs border border-gray-300 rounded-full py-1 px-3 bg-purple-100/50 font-medium tracking-wide shadow-inner">
    Supports: <span className="text-indigo-800 font-extrabold">{questionData.answerCount}</span>
</span>
           {/* ✅ Delete Button (Bottom-right corner) */}
        {String(sessionStorage.getItem("id")) === String(questionData.userId) && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className=" text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-md transition disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}

        </div>

      </div>
    </div>
  );
};
