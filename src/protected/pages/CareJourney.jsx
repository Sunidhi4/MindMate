import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Sunrise, Sun, Sunset, Moon, Sparkles, RefreshCw,
  Clock, ChevronRight, Loader2, X, AlarmClock, Bed,
  FileText, Lightbulb, Calendar
} from "lucide-react";

// ─── Section config ───────────────────────────────────────────────────────────
const sections = [
  {
    key: "morningBoost",
    label: "Morning Boost",
    icon: Sunrise,
    color: "#f59e0b",
    darkBg: "rgba(245,158,11,0.1)",
    lightBg: "#fffbeb",
    border: "#fde68a",
    darkBorder: "rgba(245,158,11,0.2)",
    dot: "#f59e0b",
    gradient: "linear-gradient(135deg,#f59e0b,#ef4444)",
    time: "6 AM – 9 AM",
  },
  {
    key: "daytimeBalance",
    label: "Daytime Balance",
    icon: Sun,
    color: "#3C9BF9",
    darkBg: "rgba(60,155,249,0.1)",
    lightBg: "#eff6ff",
    border: "#bfdbfe",
    darkBorder: "rgba(60,155,249,0.2)",
    dot: "#3C9BF9",
    gradient: "linear-gradient(135deg,#3C9BF9,#9100BD)",
    time: "9 AM – 5 PM",
  },
  {
    key: "eveningReset",
    label: "Evening Reset",
    icon: Sunset,
    color: "#ec4899",
    darkBg: "rgba(236,72,153,0.1)",
    lightBg: "#fdf2f8",
    border: "#fbcfe8",
    darkBorder: "rgba(236,72,153,0.2)",
    dot: "#ec4899",
    gradient: "linear-gradient(135deg,#ec4899,#9100BD)",
    time: "5 PM – 9 PM",
  },
  {
    key: "nightWindDown",
    label: "Night Wind Down",
    icon: Moon,
    color: "#9100BD",
    darkBg: "rgba(145,0,189,0.1)",
    lightBg: "#faf5ff",
    border: "#ddd6fe",
    darkBorder: "rgba(145,0,189,0.2)",
    dot: "#9100BD",
    gradient: "linear-gradient(135deg,#9100BD,#3b82f6)",
    time: "9 PM – Sleep",
  },
  {
    key: "weekendIdeas",
    label: "Weekend Ideas",
    icon: Calendar,
    color: "#10b981",
    darkBg: "rgba(16,185,129,0.1)",
    lightBg: "#f0fdf4",
    border: "#bbf7d0",
    darkBorder: "rgba(16,185,129,0.2)",
    dot: "#10b981",
    gradient: "linear-gradient(135deg,#10b981,#3C9BF9)",
    time: "Sat & Sun",
  },
  {
    key: "personalizedTips",
    label: "Personalized Tips",
    icon: Lightbulb,
    color: "#f97316",
    darkBg: "rgba(249,115,22,0.1)",
    lightBg: "#fff7ed",
    border: "#fed7aa",
    darkBorder: "rgba(249,115,22,0.2)",
    dot: "#f97316",
    gradient: "linear-gradient(135deg,#f97316,#ec4899)",
    time: "Always",
  },
];

// ─── Redesign Modal ───────────────────────────────────────────────────────────
const RedesignModal = ({ onClose, onSubmit, isDark, loading }) => {
  const [form, setForm] = useState({
    wakeUpTime: "",
    sleepTime: "",
    dailyRoutineDescription: "",
  });

  const handleSubmit = () => {
    if (!form.wakeUpTime || !form.sleepTime || !form.dailyRoutineDescription.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    onSubmit(form);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "12px",
    border: `1px solid ${isDark ? "rgba(145,0,189,0.25)" : "#ddd6fe"}`,
    background: isDark ? "rgba(255,255,255,0.04)" : "#faf5ff",
    color: isDark ? "#f9fafb" : "#111827",
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: isDark ? "#9ca3af" : "#6b7280",
    marginBottom: "6px",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          background: isDark ? "#0f0a1a" : "white",
          border: `1px solid ${isDark ? "rgba(145,0,189,0.2)" : "#ede9fe"}`,
          boxShadow: "0 25px 60px rgba(145,0,189,0.25)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Bar */}
        <div className="h-1" style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#f0e9ff"}` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: isDark ? "rgba(145,0,189,0.2)" : "#f3e8ff" }}
            >
              <Sparkles size={14} style={{ color: "#9100BD" }} />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: isDark ? "#f9fafb" : "#111827" }}>
                Redesign Your Routine
              </p>
              <p className="text-[11px]" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                MindMate AI will craft a new plan for you
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: isDark ? "rgba(255,255,255,0.07)" : "#f3f4f6", border: "none", cursor: "pointer", color: isDark ? "#9ca3af" : "#6b7280" }}
          >
            <X size={13} />
          </button>
        </div>

        {/* Form */}
        <div className="px-5 py-5 space-y-4">
          {/* Wake + Sleep in a row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={labelStyle}>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <AlarmClock size={10} /> Wake Up Time
                </span>
              </label>
              <input
                type="time"
                value={form.wakeUpTime}
                onChange={e => setForm(f => ({ ...f, wakeUpTime: e.target.value }))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Bed size={10} /> Sleep Time
                </span>
              </label>
              <input
                type="time"
                value={form.sleepTime}
                onChange={e => setForm(f => ({ ...f, sleepTime: e.target.value }))}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <FileText size={10} /> Describe Your Daily Life
              </span>
            </label>
            <textarea
              rows={4}
              placeholder="e.g. I work from home, feel anxious in the evenings, enjoy light exercise, want to read more..."
              value={form.dailyRoutineDescription}
              onChange={e => setForm(f => ({ ...f, dailyRoutineDescription: e.target.value }))}
              style={{ ...inputStyle, resize: "none", lineHeight: "1.6" }}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-5 pb-5 flex gap-3"
        >
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: isDark ? "rgba(255,255,255,0.06)" : "#f3f4f6",
              color: isDark ? "#9ca3af" : "#6b7280",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white transition-all flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60"
            style={{ background: "linear-gradient(90deg,#9100BD,#3b82f6)", border: "none", cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading
              ? <><Loader2 size={12} className="animate-spin" /> Generating...</>
              : <><Sparkles size={12} /> Generate Routine</>
            }
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Section Card ─────────────────────────────────────────────────────────────
const SectionCard = ({ section, items, isDark, index }) => {
  const Icon = section.icon;
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-md"
      style={{
        background: isDark ? "rgba(255,255,255,0.03)" : "white",
        border: `1px solid ${isDark ? section.darkBorder : section.border}`,
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Top accent bar */}
      <div className="h-0.5" style={{ background: section.gradient }} />

      {/* Header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: isDark ? section.darkBg : section.lightBg }}
          >
            <Icon size={15} style={{ color: section.color }} />
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: isDark ? "#f9fafb" : "#111827" }}>
              {section.label}
            </p>
            <p className="text-[10px]" style={{ color: isDark ? "#6b7280" : "#9ca3af" }}>
              <Clock size={9} style={{ display: "inline", marginRight: 3, verticalAlign: "middle" }} />
              {section.time}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: isDark ? section.darkBg : section.lightBg, color: section.color }}
          >
            {items?.length || 0}
          </span>
          <ChevronRight
            size={14}
            style={{
              color: isDark ? "#6b7280" : "#9ca3af",
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </div>
      </button>

      {/* Items */}
      {expanded && (
        <div
          className="px-4 pb-4 space-y-2"
          style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.04)" : section.border + "60"}` }}
        >
          {(items || []).map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 px-3 py-2.5 rounded-xl"
              style={{ background: isDark ? section.darkBg : section.lightBg, marginTop: i === 0 ? "12px" : 0 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{ background: section.dot }}
              />
              <p className="text-xs leading-relaxed" style={{ color: isDark ? "#d1d5db" : "#374151" }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({ isDark, onGenerate }) => (
  <div
    className="rounded-2xl p-12 text-center"
    style={{
      background: isDark ? "rgba(255,255,255,0.03)" : "white",
      border: `1px solid ${isDark ? "rgba(145,0,189,0.15)" : "#ede9fe"}`,
    }}
  >
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
      style={{ background: isDark ? "rgba(145,0,189,0.15)" : "#f3e8ff" }}
    >
      <Sparkles size={28} style={{ color: "#9100BD", opacity: 0.6 }} />
    </div>
    <p className="font-bold text-base mb-1" style={{ color: isDark ? "#f9fafb" : "#111827" }}>
      No routine yet
    </p>
    <p className="text-xs mb-5" style={{ color: isDark ? "#9ca3af" : "#6b7280", maxWidth: 260, margin: "0 auto 20px" }}>
      Let MindMate AI craft a personalized daily routine tailored just for you.
    </p>
    <button
      onClick={onGenerate}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
      style={{ background: "linear-gradient(90deg,#9100BD,#3b82f6)", border: "none", cursor: "pointer" }}
    >
      <Sparkles size={12} /> Generate My Routine
    </button>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const CareJourney = () => {
  const [routine, setRoutine]         = useState(null);
  const [loadingRoutine, setLoadingRoutine] = useState(true);
  const [showModal, setShowModal]     = useState(false);
  const [generating, setGenerating]   = useState(false);
  const [isDark, setIsDark]           = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Fetch existing routine on mount
  const fetchRoutine = async () => {
    try {
      setLoadingRoutine(true);
      const res = await axios.get("http://localhost:8080/api/lifestyle/routine", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRoutine(res.data || null);
    } catch {
      setRoutine(null);
    } finally {
      setLoadingRoutine(false);
    }
  };

  useEffect(() => { fetchRoutine(); }, []);

  // Generate / Redesign routine
  const handleGenerate = async (form) => {
    try {
      setGenerating(true);
      await axios.post(
        "http://localhost:8080/api/lifestyle/generate",
        form,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Your new routine is ready!");
      setShowModal(false);
      await fetchRoutine();   // reload to show new routine
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate routine.");
    } finally {
      setGenerating(false);
    }
  };

  const totalItems = routine
    ? sections.reduce((acc, s) => acc + (routine[s.key]?.length || 0), 0)
    : 0;

  return (
    <div className="min-h-full w-full py-6 transition-colors duration-300">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl font-bold" style={{ color: isDark ? "#f9fafb" : "#111827" }}>
              My Daily Routine
            </h1>
            <p className="text-xs mt-0.5" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
              Personalized by MindMate AI · {totalItems} activities planned
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchRoutine}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: isDark ? "rgba(145,0,189,0.15)" : "white",
                color: "#9100BD",
                border: "1px solid rgba(145,0,189,0.25)",
                cursor: "pointer",
              }}
            >
              <RefreshCw size={13} className={loadingRoutine ? "animate-spin" : ""} />
              Refresh
            </button>

            {routine && (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(90deg,#9100BD,#3b82f6)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Sparkles size={13} />
                Redesign Routine
              </button>
            )}
          </div>
        </div>

        {/* ── Stats bar (if routine exists) ── */}
        {!loadingRoutine && routine && (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-5">
            {sections.map((s) => (
              <div
                key={s.key}
                className="rounded-xl p-2.5 text-center"
                style={{
                  background: isDark ? s.darkBg : s.lightBg,
                  border: `1px solid ${isDark ? s.darkBorder : s.border}`,
                }}
              >
                <p className="text-lg font-extrabold" style={{ color: s.color }}>
                  {routine[s.key]?.length || 0}
                </p>
                <p className="text-[9px] font-semibold leading-tight mt-0.5" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                  {s.label.split(" ")[0]}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Content ── */}
        {loadingRoutine ? (
          // Skeleton
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl animate-pulse"
                style={{ background: isDark ? "rgba(255,255,255,0.04)" : "#f3f4f6" }}
              />
            ))}
          </div>
        ) : !routine ? (
          <EmptyState isDark={isDark} onGenerate={() => setShowModal(true)} />
        ) : (
          <div className="space-y-4">
            {sections.map((section, i) => (
              <SectionCard
                key={section.key}
                section={section}
                items={routine[section.key]}
                isDark={isDark}
                index={i}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Redesign Modal ── */}
      {showModal && (
        <RedesignModal
          onClose={() => !generating && setShowModal(false)}
          onSubmit={handleGenerate}
          isDark={isDark}
          loading={generating}
        />
      )}
    </div>
  );
};

export default CareJourney;