import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Trash2, Heart, BadgeCheck, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import PsycheAI from "../../public/assets/psycheAI.png";

/* ── Role config ─────────────────────────────────────────
   Each role gets: accent gradient, badge label/style, layout
─────────────────────────────────────────────────────────── */
const roleConfig = {
  AI: {
    barGradient:    "linear-gradient(90deg,#6366f1,#8b5cf6,#a855f7)",
    ringGradient:   "linear-gradient(135deg,#6366f1,#a855f7)",
    badgeBg:        "#f5f3ff",
    badgeColor:     "#6d28d9",
    badgeBorder:    "#ddd6fe",
    badgeLabel:     "✨ PsycheAI",
    cardBg:         "linear-gradient(135deg,rgba(99,102,241,0.07),rgba(168,85,247,0.04))",
    cardBgDark:     "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(168,85,247,0.08))",
    cardBorder:     "#ddd6fe",
    cardBorderDark: "rgba(99,102,241,0.3)",
    footerLabel:    "🤖 AI Response",
    rightAlign:     true,   // avatar + name on the RIGHT
  },
  EXPERT: {
    barGradient:    "linear-gradient(90deg,#3b82f6,#6366f1)",
    ringGradient:   "linear-gradient(135deg,#3b82f6,#6366f1)",
    badgeBg:        "#eff6ff",
    badgeColor:     "#1d4ed8",
    badgeBorder:    "#bfdbfe",
    badgeLabel:     "🩺 Expert",
    cardBg:         "white",
    cardBgDark:     "rgba(255,255,255,0.05)",
    cardBorder:     "#bfdbfe",
    cardBorderDark: "rgba(59,130,246,0.25)",
    footerLabel:    "🩺 Expert answer",
    rightAlign:     false,
  },
  USER: {
    barGradient:    "linear-gradient(90deg,#3C9BF9,#9100BD)",
    ringGradient:   "linear-gradient(135deg,#3C9BF9,#9100BD)",
    badgeBg:        "#faf5ff",
    badgeColor:     "#7c3aed",
    badgeBorder:    "#ddd6fe",
    badgeLabel:     "💬 Community",
    cardBg:         "white",
    cardBgDark:     "rgba(255,255,255,0.04)",
    cardBorder:     "#e9d5ff",
    cardBorderDark: "rgba(145,0,189,0.2)",
    footerLabel:    "💬 Community",
    rightAlign:     false,
  },
};

const AnswerBox = ({ ans, setDeleting: notifyParent }) => {
  const [deleting, setDeleting] = useState(false);
  const [liked, setLiked]       = useState(false);
  const [likes, setLikes]       = useState(ans.likes ?? 0);

  const role    = ans.role || "USER";
  const cfg     = roleConfig[role] || roleConfig.USER;
  const isOwner  = localStorage.getItem("username") === ans.displayName;
  const isExpert = role === "EXPERT";
  const isAI     = role === "AI";

  // Detect dark from html class (simple check — no re-render needed for just style)
  const isDark = document.documentElement.classList.contains("dark");

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
        `https://mindmate-production-81d8.up.railway.app/api/answer/deleteAnswer/${ans.id}`,
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

  /* ── Avatar ── */
  const Avatar = () => (
    <div className="shrink-0 p-0.5 rounded-full overflow-hidden border border-purple-600" style={{ background: cfg.ringGradient }}>
      {isAI ? (
        <img src={PsycheAI} alt="MindMateAI"
          className="w-9 h-9 rounded-full object-cover scale-[1.2]"
          style={{ border: "2px solid white" }} />
      ) : (
        <img src={`https://i.pravatar.cc/50?u=${ans.displayName}`} alt={ans.displayName}
          className="w-9 h-9 rounded-full object-cover block"
          style={{ border: "2px solid white" }} />
      )}
    </div>
  );

  /* ── Name + badge ── */
  const NameRow = () => (
    <div className={`min-w-0 ${isAI ? "text-right" : ""}`}>
      {isExpert ? (
        <Link to="/user/expertDetails" state={{ expertId: ans.accountId }}
          className="inline-flex items-center gap-1.5">
          <span className="text-sm font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors truncate">
            {ans.displayName}
          </span>
          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0"
            style={{ background: cfg.badgeBg, color: cfg.badgeColor, border: `1px solid ${cfg.badgeBorder}` }}>
            <BadgeCheck size={9} /> Expert
          </span>
        </Link>
      ) : isAI ? (
        <div className={`flex items-center gap-1.5 ${isAI ? "justify-end" : ""}`}>
          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
            style={{ background: cfg.badgeBg, color: cfg.badgeColor, border: `1px solid ${cfg.badgeBorder}` }}>
            <Sparkles size={9} /> AI
          </span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">{ans.displayName}</span>
        </div>
      ) : (
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
          {ans.displayName}
        </p>
      )}
      <p className={`text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 ${isAI ? "text-right" : ""}`}>
        {displayTime(ans.createdAt)}
      </p>
    </div>
  );

  return (
    <div
      className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      style={{
        background: isDark ? cfg.cardBgDark : cfg.cardBg,
        border: `1px solid ${isDark ? cfg.cardBorderDark : cfg.cardBorder}`,
      }}
    >
      {/* Always-on top bar for all roles */}
      <div className="h-0.5 w-full" style={{ background: cfg.barGradient }} />

      {/* Hover glow line (bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: cfg.barGradient }} />

      <div className="p-4 sm:p-5">

        {/* ── Header ── */}
        <div className={`flex items-start justify-between gap-3 mb-3 ${isAI ? "flex-row-reverse" : ""}`}>

          {/* Avatar + name — right-aligned for AI, left for others */}
          <div className={`flex items-start gap-3 min-w-0 flex-1 ${isAI ? "flex-row-reverse" : ""}`}>
            <Avatar />
            <NameRow />
          </div>
          

          {/* Delete — only for owner, not AI */}
          {isOwner && !isAI && (
  <div className="flex items-center gap-3">
    
    {/* Safety Rating Badge */}
    <div
      className={`px-3 py-1 rounded-full text-xs font-semibold
        ${
          ans.safetyRating <= 3
            ? "bg-red-100 text-red-600"
            : ans.safetyRating <= 6
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-600"
        }`}
    >
      Safety: {ans.safetyRating}/10
      {" "}
      {ans.safetyRating <= 3 && "⚠️ High Risk"}
      {ans.safetyRating > 3 && ans.safetyRating <= 6 && "😐 Medium"}
      {ans.safetyRating > 6 && "✅ Very Safe"}
    </div>

    {/* Delete Button */}
    <button
      onClick={handleDelete}
      disabled={deleting}
      title="Delete answer"
      className="shrink-0 p-1.5 rounded-lg transition-colors text-gray-300 dark:text-gray-600
                 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400"
    >
      {deleting ? (
        <span className="text-[10px] text-gray-400">...</span>
      ) : (
        <Trash2 size={14} />
      )}
    </button>

  </div>
)}
        </div>

        {/* ── AI label strip ── */}
        {isAI && (
          <div className="mb-3 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            style={{ background: isDark ? "rgba(99,102,241,0.12)" : "#f5f3ff", color: "#6d28d9", border: "1px solid #ddd6fe" }}>
            <Sparkles size={12} /> AI-generated response · Always verify with a professional
          </div>
        )}

        {/* ── Answer text ── */}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {ans.answer}
        </p>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/60">

          {/* Like button */}
          <button onClick={handleLike}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                       transition-all duration-200 select-none"
            style={liked
              ? { background: cfg.barGradient, color: "white" }
              : { background: isDark ? "rgba(255,255,255,0.06)" : cfg.badgeBg, color: cfg.badgeColor, border: `1px solid ${cfg.badgeBorder}` }
            }>
            <Heart size={12}
              fill={liked ? "white" : cfg.badgeColor}
              stroke={liked ? "white" : cfg.badgeColor}
            />
            {likes}
          </button>

          {/* Role label */}
          <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">
            {cfg.footerLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnswerBox;