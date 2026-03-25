import { useState, useEffect } from "react";
import { MessageCircleHeart, Shield, Image, Users, UserCheck, HeartHandshake } from "lucide-react";
import Snapshots from "../../../protected/components/dashboardComponent/Snapshots";

const featuresData = [
  {
    icon: <Shield size={22} />,
    color: "#9100BD",
    lightBg: "linear-gradient(135deg,#faf5ff,#f3e8ff)",
    darkBg:  "linear-gradient(135deg,rgba(145,0,189,0.18),rgba(145,0,189,0.08))",
    lightBorder: "#ddd6fe", darkBorder: "rgba(145,0,189,0.35)",
    title: "100% Anonymous",
    desc: "Share thoughts and struggles freely without ever revealing your identity.",
  },
  {
    icon: <MessageCircleHeart size={22} />,
    color: "#3C9BF9",
    lightBg: "linear-gradient(135deg,#eff6ff,#dbeafe)",
    darkBg:  "linear-gradient(135deg,rgba(60,155,249,0.18),rgba(60,155,249,0.08))",
    lightBorder: "#bfdbfe", darkBorder: "rgba(60,155,249,0.35)",
    title: "Peer-to-Peer Support",
    desc: "Connect with people who truly understand in a safe, welcoming space.",
  },
  {
    icon: <UserCheck size={22} />,
    color: "#ec4899",
    lightBg: "linear-gradient(135deg,#fdf2f8,#fce7f3)",
    darkBg:  "linear-gradient(135deg,rgba(236,72,153,0.18),rgba(236,72,153,0.08))",
    lightBorder: "#fbcfe8", darkBorder: "rgba(236,72,153,0.35)",
    title: "Expert Guidance",
    desc: "Get professional advice from verified mental health experts, on your schedule.",
  },
  {
    icon: <Image size={22} />,
    color: "#10b981",
    lightBg: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
    darkBg:  "linear-gradient(135deg,rgba(16,185,129,0.18),rgba(16,185,129,0.08))",
    lightBorder: "#bbf7d0", darkBorder: "rgba(16,185,129,0.35)",
    title: "Share Image Posts",
    desc: "Express yourself visually — post images and connect through shared experiences.",
  },
  {
    icon: <HeartHandshake size={22} />,
    color: "#f59e0b",
    lightBg: "linear-gradient(135deg,#fffbeb,#fef3c7)",
    darkBg:  "linear-gradient(135deg,rgba(245,158,11,0.18),rgba(245,158,11,0.08))",
    lightBorder: "#fde68a", darkBorder: "rgba(245,158,11,0.35)",
    title: "Affordable Support",
    desc: "Access expert mental health help at a cost designed to be accessible for all.",
  },
  {
    icon: <Users size={22} />,
    color: "#6366f1",
    lightBg: "linear-gradient(135deg,#eef2ff,#e0e7ff)",
    darkBg:  "linear-gradient(135deg,rgba(99,102,241,0.18),rgba(99,102,241,0.08))",
    lightBorder: "#c7d2fe", darkBorder: "rgba(99,102,241,0.35)",
    title: "Community Healing",
    desc: "Grow together in a compassionate, judgment-free mental wellness community.",
  },
];

const Features = () => {
  // ── Reactive dark mode — watches the <html> class in real time ──
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-16 sm:py-20 relative overflow-hidden transition-colors duration-300"
      style={{
        background: isDark
          ? "#111827"
          : "linear-gradient(160deg,#f5f3ff 0%,#eff6ff 50%,#fdf4ff 100%)",
      }}
    >
      <style>{`
        @keyframes featureFadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .feat-card { animation: featureFadeUp 0.5s ease both; }
      `}</style>

      {/* Decorative orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(145,0,189,0.18),transparent 70%)" }} />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(60,155,249,0.15),transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(236,72,153,0.07),transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase
                       px-3 py-1 rounded-full shadow-sm mb-4 transition-colors duration-300"
            style={{
              color: isDark ? "#c084fc" : "#9100BD",
              background: isDark ? "rgba(145,0,189,0.15)" : "white",
              border: `1px solid ${isDark ? "rgba(145,0,189,0.35)" : "#ddd6fe"}`,
            }}
          >
            ✦ Why Us
          </span>

          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-3 transition-colors duration-300"
            style={{ color: isDark ? "#fff" : "#111827" }}
          >
            Why Choose{" "}
            <span style={{
              background: "linear-gradient(90deg,#9100BD,#3C9BF9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              PsychoTalk?
            </span>
          </h2>

          <p
            className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed transition-colors duration-300"
            style={{ color: isDark ? "#9ca3af" : "#4b5563" }}
          >
            A safe digital space for emotional expression, expert guidance, and
            supportive connections — all in one place.
          </p>

          <div className="mt-5 h-px max-w-xs mx-auto"
            style={{ background: "linear-gradient(to right,transparent,#9100BD,transparent)" }} />
        </div>

        {/* ── Snapshots ── */}
        <div className="mb-10">
          <Snapshots />
        </div>

        {/* ── Feature cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuresData.map((f, i) => (
            <div
              key={i}
              className="feat-card group relative rounded-2xl p-5 overflow-hidden
                         border shadow-sm hover:shadow-xl hover:-translate-y-1.5
                         transition-all duration-200 cursor-default"
              style={{
                background: isDark ? f.darkBg : f.lightBg,
                borderColor: isDark ? f.darkBorder : f.lightBorder,
                animationDelay: `${i * 0.07}s`,
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at top left,${f.color}22,transparent 65%)` }} />

              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg,${f.color},${f.color}33)` }} />

              <div className="relative z-10">

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4
                              group-hover:scale-110 transition-transform duration-200"
                  style={{
                    background: isDark ? `${f.color}25` : "white",
                    color: f.color,
                    border: `1px solid ${f.color}35`,
                    boxShadow: `0 4px 14px ${f.color}28`,
                  }}
                >
                  {f.icon}
                </div>

                <h3
                  className="text-sm font-bold mb-1.5 transition-colors duration-300"
                  style={{ color: isDark ? "#f9fafb" : "#111827" }}
                >
                  {f.title}
                </h3>

                <p
                  className="text-xs leading-relaxed transition-colors duration-300"
                  style={{ color: isDark ? "#d1d5db" : "#4b5563" }}
                >
                  {f.desc}
                </p>

                {/* Learn more tag */}
                <div
                  className="mt-4 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: `${f.color}${isDark ? "25" : "15"}`,
                    color: f.color,
                  }}
                >
                  ✦ Learn more
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom strip ── */}
        <div
          className="mt-12 rounded-2xl p-5 sm:p-6 text-center transition-all duration-300"
          style={{
            background: isDark
              ? "linear-gradient(135deg,rgba(124,58,237,0.15),rgba(59,130,246,0.15))"
              : "linear-gradient(135deg,rgba(124,58,237,0.07),rgba(59,130,246,0.07))",
            border: `1px solid ${isDark ? "rgba(124,58,237,0.3)" : "rgba(124,58,237,0.18)"}`,
          }}
        >
          <p
            className="text-sm font-semibold transition-colors duration-300"
            style={{ color: isDark ? "#e9d5ff" : "#374151" }}
          >
            💜 Join{" "}
            <span style={{ color: "#9100BD", fontWeight: 700 }}>thousands</span>
            {" "}of people already healing together on PsychoTalk
          </p>
        </div>

      </div>
    </section>
  );
};

export default Features;