import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export const UserPost = ({ question, onPostDeleteSuccess , setRefresh }) => {
  const questionData = {
    id: question.id,
    username: question.username || "Anonymous",
    userId: question.userId,
    userImage: "https://i.pravatar.cc/80?u=" + question.username,
    question: question.question,
    createdTime: question.createdTime,
    initialLikes: question.likes,
    answerCount: question.answerCount
  };

  const [likes, setLikes] = useState(questionData.initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLikeToggle = () => {
    setLikes(hasLiked ? likes - 1 : likes + 1);
    setHasLiked(!hasLiked);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      setIsDeleting(true);
      const res = await axios.delete(
        `http://localhost:8080/user/question/${questionData.id}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      if (res.data === true || res.data.status === "success") {
        setIsDeleting(false);
        toast.success("Question deleted successfully!");
        onPostDeleteSuccess();
      } else {
        alert("Failed to delete question.");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    } finally {
      setIsDeleting(false);
    }
    setRefresh(true)
  };

  const readableTime = new Date(questionData.createdTime).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="relative border border-purple-600 group bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
      p-5 mb-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(145,0,189,0.2)]"
    >
      <Link
        to="/user/discussion"
        state={{ question: questionData }}
        className="block"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={questionData.userImage}
              alt="User"
              className="w-11 h-11 rounded-full border-2 border-purple-500 ring-2 ring-purple-300 ring-offset-2 transition-all group-hover:ring-purple-500"
            />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {questionData.username}
              </h3>
              <p className="text-xs text-gray-500">{readableTime}</p>
            </div>
          </div>


        </div>

        {/* Question Content */}

        <p className="text-gray-800 leading-relaxed mb-5 text-[15.5px] tracking-wide hover:text-purple-700 transition-colors">
          {questionData.question}
        </p>

      </Link>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Like Button */}
        <button
          onClick={handleLikeToggle}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium shadow-inner 
          transition-all duration-200 
          ${hasLiked
              ? "bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg"
              : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-purple-50"
            }`}
        >
          <Heart
            size={16}
            fill={hasLiked ? "white" : "none"}
            stroke={hasLiked ? "white" : "#9333ea"}
          />
          {likes}
        </button>

        <div className="flex gap-2">

          {/* Delete button */}
          {String(localStorage.getItem("username")) === String(questionData.username) && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-all duration-200"
            >
              {isDeleting ? (
                <span className="text-xs text-gray-400">Deleting...</span>
              ) : (
                <Trash2 size={18} />
              )}
            </button>
          )}


          {/* Answers Count */}
          <span
            className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full 
          bg-purple-50 border border-purple-200 text-purple-700"
          >
            <MessageCircle size={14} />
            {questionData.answerCount} Answers
          </span>


        </div>
      </div>

      {/* Animated Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

    </div>
  );
};
