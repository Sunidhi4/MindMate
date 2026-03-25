import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Heart, Shield, Brain, MessageCircle, Sparkles,
  TrendingUp, Users, Calendar, ChevronRight, Star,
  Wind, Sun, Moon, Flame,
} from "lucide-react";
import Snapshots from "./Snapshots";
import DailyTip from "./DailyTip";

const moods = [
  { emoji: "😔", label: "Low",   color: "#6366f1" },
  { emoji: "😐", label: "Meh",   color: "#06b6d4" },
  { emoji: "🙂", label: "OK",    color: "#10b981" },
  { emoji: "😊", label: "Good",  color: "#f59e0b" },
  { emoji: "🤩", label: "Great", color: "#f43f5e" },
];

const UserDashboard = () => {
  const name = sessionStorage.getItem("name") || "Friend";
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodSaved, setMoodSaved] = useState(false);
  const [quote, setQuote] = useState(0);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const quotes = [
    "You don't have to carry this alone.",
    "Every feeling deserves to be heard.",
    "Your story matters more than you know.",
    "Healing is not linear — and that's okay.",
  ];

  useEffect(() => {
    const t = setInterval(() => setQuote(q => (q + 1) % quotes.length), 4000);
    return () => clearInterval(t);
  }, []);

  const handleMoodSave = () => {
    if (!selectedMood) return;
    setMoodSaved(true);
    setTimeout(() => setMoodSaved(false), 2500);
  };

  return (
    /*
      min-h-full  → stretches to fill whatever height the Outlet gives
      w-full      → fills full width inside the outlet (sidebar handled by parent layout)
      bg-gradient → your custom Tailwind class for light bg
      dark:bg-gray-900 → solid dark override
      NO negative margins — parent layout owns the spacing
    */
    <div className="min-h-full w-full bg-gradient ">

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        .card-lift { transition: box-shadow 0.2s ease, transform 0.2s ease; }
        .card-lift:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(109,40,217,0.12); }
        .mood-pill { background: none; border: none; cursor: pointer; padding: 4px; transition: all 0.18s ease; }
        .mood-pill:hover { transform: scale(1.15); }
        .action-btn { transition: all 0.18s ease; display: inline-flex; align-items: center; gap: 6px; }
        .action-btn:hover { transform: translateY(-1px); }
        .quote-anim { animation: fadeUp 0.45s ease both; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ticker-wrap { overflow: hidden; width: 100%; }
        .ticker { display: flex; white-space: nowrap; animation: ticker 28s linear infinite; gap: 3rem; }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .section-divider {
          border: none; height: 1px; margin: 0;
          background: linear-gradient(to right, transparent, #ddd6fe, transparent);
        }
        .dark .section-divider {
          background: linear-gradient(to right, transparent, #374151, transparent);
        }
      `}</style>

      <div className="w-full max-w-5xl mx-auto py-6 space-y-5">

        {/* ══ HERO ══ */}
        <div className="rounded-2xl overflow-hidden shadow-sm
                        border border-purple-100 dark:border-gray-700
                        bg-white dark:bg-gray-800">
          <div style={{ height: 4, background: "linear-gradient(90deg,#7c3aed,#3b82f6,#ec4899)" }} />

          <div className="p-5 flex flex-col md:flex-row gap-5">

            {/* Greeting */}
            <div className="flex-1 min-w-0 space-y-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase
                               text-purple-600 dark:text-purple-400
                               bg-purple-50 dark:bg-purple-900/30
                               px-3 py-1 rounded-full
                               border border-purple-200 dark:border-purple-700/50">
                <Sparkles size={11} /> Your safe space
              </span>

              <h1 className="text-2xl md:text-3xl font-bold leading-snug 
                             text-gray-900 dark:text-white">
                {greeting},{" "}
                <span style={{
                  background: "linear-gradient(90deg,#7c3aed,#ec4899,#3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  {name}
                </span>{" "}👋
              </h1>

              <div className="h-6 overflow-hidden">
                <p key={quote} className="quote-anim text-sm italic text-gray-400 dark:text-gray-500">
                  "{quotes[quote]}"
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <Link to="/user/share"
                  className="action-btn px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-sm"
                  style={{ background: "linear-gradient(90deg,#7c3aed,#3b82f6)" }}>
                  <MessageCircle size={14} /> Share Your Feelings
                </Link>
                <Link to="/user/appointments"
                  className="action-btn px-4 py-2 rounded-xl text-sm font-medium
                             text-gray-600 dark:text-gray-300
                             border border-gray-200 dark:border-gray-600
                             bg-gray-50 dark:bg-gray-700/50
                             hover:border-purple-300 hover:text-purple-600 dark:hover:border-purple-500 dark:hover:text-purple-400">
                  <Calendar size={14} /> Appointments
                </Link>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-100 dark:bg-gray-700 self-stretch" />

            {/* Mood check-in */}
            <div className="w-full md:w-60 shrink-0 space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                How are you feeling today?
              </p>
              <div className="flex justify-between">
                {moods.map(m => (
                  <button key={m.label} onClick={() => setSelectedMood(m.label)} title={m.label}
                    className="mood-pill flex flex-col items-center gap-0.5 text-xl"
                    style={{
                      opacity: selectedMood && selectedMood !== m.label ? 0.28 : 1,
                      filter: selectedMood === m.label ? `drop-shadow(0 0 5px ${m.color})` : "none",
                    }}>
                    {m.emoji}
                    <span className="text-[9px] font-medium"
                      style={{ color: selectedMood === m.label ? m.color : "#bbb" }}>
                      {m.label}
                    </span>
                  </button>
                ))}
              </div>
              <button onClick={handleMoodSave}
                className="w-full py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: selectedMood ? "linear-gradient(90deg,#7c3aed,#3b82f6)" : undefined,
                  backgroundColor: selectedMood ? undefined : "rgb(243 244 246)",
                  color: selectedMood ? "#fff" : "#ccc",
                  cursor: selectedMood ? "pointer" : "not-allowed",
                }}>
                {moodSaved ? "✓ Mood logged!" : "Log Mood"}
              </button>
            </div>
          </div>
        </div>

        {/* ══ SNAPSHOTS ══ */}
        <Snapshots />

        {/* ══ MIDDLE PANEL: Why Sharing + Daily Tip + Research ══ */}
        <div className="rounded-2xl overflow-hidden shadow-sm
                        border border-gray-100 dark:border-gray-700
                        bg-white dark:bg-gray-800">

          {/* Why Sharing Helps */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Brain size={16} className="text-purple-500" />
              <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100">Why Sharing Helps</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: <Heart size={17} className="text-pink-500" />,    bg: "#fff1f5", bgDark: "#2d1b22", border: "#fce7f0", borderDark: "#4b2030", title: "Emotional Relief",  desc: "Expressing thoughts reduces emotional burden and brings clarity to your inner world." },
                { icon: <Wind size={17} className="text-cyan-500" />,     bg: "#f0fdfb", bgDark: "#0f2926", border: "#ccfbf1", borderDark: "#134e4a", title: "Mental Clarity",    desc: "Verbalising feelings organises fragmented thoughts and melts anxiety away." },
                { icon: <Shield size={17} className="text-purple-500" />, bg: "#faf5ff", bgDark: "#1e1235", border: "#ede9fe", borderDark: "#3b2a6b", title: "Safe & Anonymous",  desc: "Your identity stays private. No judgment, no pressure — just genuine support." },
              ].map((c, i) => (
                <div key={i} className="card-lift rounded-xl p-4 border" style={{ background: c.bg, borderColor: c.border }}>
                  <div className="mb-2">{c.icon}</div>
                  <p className="font-semibold text-gray-800 text-sm mb-1">{c.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="section-divider" />

          {/* Daily Tip */}
          <DailyTip />

          <hr className="section-divider" />

          {/* Research */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-blue-500" />
              <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100">Backed by Research</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { tag: "Neuroscience", tagStyle: { color: "#1d4ed8", background: "#eff6ff", border: "1px solid #bfdbfe" }, icon: <Flame size={11} />, title: "Talking Reduces Stress Hormones",    desc: "Sharing emotions lowers cortisol levels and improves mental health significantly over time." },
                { tag: "Psychology",   tagStyle: { color: "#7c3aed", background: "#faf5ff", border: "1px solid #ddd6fe" }, icon: <Heart size={11} />, title: "Social Support Prevents Depression", desc: "People who share regularly feel less isolated, build resilience, and recover from setbacks faster." },
              ].map((r, i) => (
                <div key={i} className="card-lift rounded-xl p-4 border space-y-2
                                        border-gray-100 dark:border-gray-700
                                        bg-gray-50 dark:bg-gray-700/40">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={r.tagStyle}>
                    {r.icon} {r.tag}
                  </span>
                  <p className="font-semibold text-sm leading-snug text-gray-800 dark:text-gray-100">{r.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{r.desc}</p>
                  <button className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-500 hover:text-purple-700 transition-colors">
                    Read more <ChevronRight size={11} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ COMMUNITY PANEL ══ */}
        <div className="rounded-2xl overflow-hidden shadow-sm
                        border border-gray-100 dark:border-gray-700
                        bg-white dark:bg-gray-800">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users size={16} className="text-purple-500" />
              <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100">Community & Support</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Peer Support */}
              <div className="card-lift rounded-xl p-5 text-white space-y-2"
                style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,255,255,0.18)" }}>
                    <Users size={13} className="text-white" />
                  </div>
                  <p className="font-semibold text-sm">Peer Support 💬</p>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Connect with people who truly understand your journey. Share anonymously and grow together.
                </p>
                <Link to="/user/support" className="action-btn text-xs font-semibold"
                  style={{ color: "rgba(255,255,255,0.9)" }}>
                  Explore community <ChevronRight size={12} />
                </Link>
              </div>

              {/* Expert Guidance */}
              <div className="card-lift rounded-xl p-5 border space-y-2
                              border-gray-100 dark:border-gray-700
                              bg-gray-50 dark:bg-gray-700/40">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center shrink-0">
                    <Star size={13} className="text-purple-500" />
                  </div>
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">Expert Guidance 👨‍⚕️</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Certified counsellors ready to walk with you through whatever you're facing — at your own pace.
                </p>
                <Link to="/user/appointments"
                  className="action-btn text-xs font-semibold text-purple-500 hover:text-purple-700 dark:hover:text-purple-400">
                  Book a session <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ══ TICKER ══ */}
        <div className="ticker-wrap rounded-xl py-3
                        border border-purple-100 dark:border-gray-700
                        bg-white dark:bg-gray-800">
          <div className="ticker select-none">
            {[
              "You are enough ✦","Your feelings are valid ✦","Progress not perfection ✦",
              "You deserve peace ✦","Small steps still count ✦","You are not alone ✦",
              "Healing is possible ✦","Be gentle with yourself ✦",
              "You are enough ✦","Your feelings are valid ✦","Progress not perfection ✦",
              "You deserve peace ✦","Small steps still count ✦","You are not alone ✦",
              "Healing is possible ✦","Be gentle with yourself ✦",
            ].map((text, i) => (
              <span key={i} className="text-xs font-medium text-purple-400 shrink-0">{text}</span>
            ))}
          </div>
        </div>

        {/* ══ QUICK ACTIONS + CTA ══ */}
        <div className="rounded-2xl overflow-hidden shadow-sm
                        border border-gray-100 dark:border-gray-700
                        bg-white dark:bg-gray-800">
          <div style={{ height: 4, background: "linear-gradient(90deg,#3b82f6,#7c3aed,#ec4899)" }} />

          <div className="p-5 space-y-5">
            <div>
              <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-3">Quick Actions</h2>
              <div className="flex flex-wrap gap-2">
                <Link to="/user/share"
                  className="action-btn px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-sm"
                  style={{ background: "linear-gradient(90deg,#7c3aed,#3b82f6)" }}>
                  <MessageCircle size={13} /> Share Thoughts
                </Link>
                <Link to="/user/share"
                  className="action-btn px-4 py-2 rounded-xl text-sm font-medium
                             text-gray-600 dark:text-gray-300
                             border border-gray-200 dark:border-gray-600
                             bg-gray-50 dark:bg-gray-700/50
                             hover:border-pink-300 hover:text-pink-600">
                  <Heart size={13} /> My Posts
                </Link>
                <Link to="/user/appointments"
                  className="action-btn px-4 py-2 rounded-xl text-sm font-medium
                             text-gray-600 dark:text-gray-300
                             border border-gray-200 dark:border-gray-600
                             bg-gray-50 dark:bg-gray-700/50
                             hover:border-purple-300 hover:text-purple-600">
                  <Calendar size={13} /> Appointments
                </Link>
                <Link to="/user/journal"
                  className="action-btn px-4 py-2 rounded-xl text-sm font-medium
                             text-gray-600 dark:text-gray-300
                             border border-gray-200 dark:border-gray-600
                             bg-gray-50 dark:bg-gray-700/50
                             hover:border-blue-300 hover:text-blue-600">
                  <Moon size={13} /> Daily Journal
                </Link>
              </div>
            </div>

            <hr className="section-divider" />

            {/* CTA */}
            <div className="rounded-xl p-5 text-center text-white"
              style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
              <Sparkles className="mx-auto mb-2 opacity-80" size={20} />
              <p className="font-bold text-base mb-1">Healing starts when you start sharing.</p>
              <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
                Every word you share is a step toward a lighter, freer version of yourself.
              </p>
              <Link to="/user/share"
                className="action-btn inline-flex justify-center px-5 py-2 rounded-lg text-sm font-semibold text-purple-600 bg-white shadow-sm hover:shadow-md">
                Begin your journey <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;