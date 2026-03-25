import { useState, useEffect } from "react";
import { Shield, Lock, Eye, Database, UserX, Bell, Mail, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: <Eye size={18} />,
    color: "#9100BD",
    title: "Information We Collect",
    content: [
      {
        heading: "Account Information",
        text: "When you register, we collect only your chosen display name and password. We do not require your real name, phone number, or address. Your identity stays private.",
      },
      {
        heading: "Usage Data",
        text: "We collect anonymised data on how users interact with the platform — such as pages visited and features used — to improve the experience. This data cannot be traced back to you personally.",
      },
      {
        heading: "Content You Share",
        text: "Posts, answers, and messages you submit are stored securely. They are linked only to your display name, never to personally identifiable information.",
      },
    ],
  },
  {
    icon: <Database size={18} />,
    color: "#3C9BF9",
    title: "How We Use Your Information",
    content: [
      {
        heading: "Platform Operations",
        text: "Your information is used solely to provide, maintain, and improve PsychoTalk's features — including community discussions, expert sessions, and notifications.",
      },
      {
        heading: "Communication",
        text: "We may send platform-related notifications (e.g. replies to your posts). You can opt out of non-essential communications at any time from your settings.",
      },
      {
        heading: "Safety & Moderation",
        text: "Content is reviewed to enforce community guidelines and protect users from harmful behaviour. Moderation is conducted with your anonymity preserved.",
      },
    ],
  },
  {
    icon: <Shield size={18} />,
    color: "#ec4899",
    title: "Data Protection & Security",
    content: [
      {
        heading: "Encryption",
        text: "All data transmitted between your device and our servers is encrypted using industry-standard TLS/SSL protocols. Stored data is encrypted at rest.",
      },
      {
        heading: "Access Controls",
        text: "Only authorised personnel with a legitimate need can access user data. Access logs are maintained and reviewed regularly.",
      },
      {
        heading: "Breach Response",
        text: "In the unlikely event of a data breach, affected users will be notified within 72 hours and we will take immediate remediation steps.",
      },
    ],
  },
  {
    icon: <UserX size={18} />,
    color: "#10b981",
    title: "Data Sharing & Third Parties",
    content: [
      {
        heading: "No Data Sales",
        text: "We never sell, rent, or trade your personal data to advertisers or third parties. Full stop.",
      },
      {
        heading: "Service Providers",
        text: "We work with a limited number of trusted service providers (e.g. hosting, email delivery) who are contractually bound to protect your data and use it only for the services they provide.",
      },
      {
        heading: "Legal Requirements",
        text: "We may disclose data if required by law or to prevent imminent harm. We will always seek to minimise such disclosure and notify you where legally permitted.",
      },
    ],
  },
  {
    icon: <Lock size={18} />,
    color: "#f59e0b",
    title: "Your Rights & Controls",
    content: [
      {
        heading: "Access & Portability",
        text: "You can request a copy of the data we hold about you at any time by contacting our support team.",
      },
      {
        heading: "Deletion",
        text: "You may delete your account at any time. Upon deletion, your posts become anonymous and your personal account data is permanently removed within 30 days.",
      },
      {
        heading: "Correction",
        text: "If any information we hold is inaccurate, you have the right to request correction. Contact support and we will address it promptly.",
      },
    ],
  },
  {
    icon: <Bell size={18} />,
    color: "#6366f1",
    title: "Cookies & Tracking",
    content: [
      {
        heading: "Essential Cookies",
        text: "We use only essential cookies required for authentication and security. We do not use advertising or tracking cookies.",
      },
      {
        heading: "Analytics",
        text: "We use privacy-respecting analytics tools that do not track individuals across sessions or sites. Aggregate data only is collected.",
      },
    ],
  },
];

const Privacy = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div
      className="min-h-screen py-14 sm:py-20 transition-colors duration-300"
      style={{
        background: isDark
          ? "#111827"
          : "linear-gradient(160deg,#f5f3ff 0%,#eff6ff 50%,#fdf4ff 100%)",
      }}
    >
      <style>{`
        .pa-answer { max-height:0; overflow:hidden; transition:max-height 0.35s ease; }
        .pa-answer.open { max-height:600px; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease both; }
      `}</style>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">

        {/* ══ HERO ══ */}
        <div className="text-center mb-12 fade-up">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#9100BD,#3C9BF9)" }}>
            <Shield size={26} className="text-white" />
          </div>

          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase
                       px-3 py-1 rounded-full shadow-sm mb-4"
            style={{
              color: isDark ? "#c084fc" : "#9100BD",
              background: isDark ? "rgba(145,0,189,0.15)" : "white",
              border: `1px solid ${isDark ? "rgba(145,0,189,0.35)" : "#ddd6fe"}`,
            }}
          >
            ✦ Legal
          </span>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 transition-colors duration-300"
            style={{ color: isDark ? "#fff" : "#111827" }}
          >
            Privacy{" "}
            <span style={{
              background: "linear-gradient(90deg,#9100BD,#3C9BF9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Policy
            </span>
          </h1>

          <p
            className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed transition-colors duration-300"
            style={{ color: isDark ? "#9ca3af" : "#4b5563" }}
          >
            Your privacy is fundamental to everything we build. This policy explains
            how PsychoTalk collects, uses, and protects your information.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-5">
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                background: isDark ? "rgba(16,185,129,0.15)" : "#f0fdf4",
                color: "#10b981",
                border: "1px solid rgba(16,185,129,0.25)",
              }}
            >
              ✓ Last updated: March 2026
            </span>
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                background: isDark ? "rgba(60,155,249,0.15)" : "#eff6ff",
                color: "#3C9BF9",
                border: "1px solid rgba(60,155,249,0.25)",
              }}
            >
              ✓ GDPR Compliant
            </span>
          </div>

          <div className="mt-6 h-px max-w-xs mx-auto"
            style={{ background: "linear-gradient(to right,transparent,#9100BD,transparent)" }} />
        </div>

        {/* ══ COMMITMENT STRIP ══ */}
        <div
          className="rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center gap-4 text-white"
          style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}
        >
          <Lock size={22} className="shrink-0 opacity-80" />
          <p className="text-sm leading-relaxed text-white/90 text-center sm:text-left">
            <strong>Our commitment:</strong> We will never sell your data, never show you ads,
            and never compromise your anonymity. PsychoTalk is built on trust.
          </p>
        </div>

        {/* ══ SECTIONS (accordion) ══ */}
        <div className="space-y-3 mb-12">
          {sections.map((s, i) => {
            const open = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: isDark ? "rgba(255,255,255,0.04)" : "white",
                  border: open
                    ? `1px solid ${s.color}50`
                    : `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#ede9fe"}`,
                  boxShadow: open ? `0 4px 20px ${s.color}18` : "none",
                }}
              >
                {open && (
                  <div className="h-0.5"
                    style={{ background: `linear-gradient(90deg,${s.color},${s.color}44)` }} />
                )}

                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${s.color}18`, color: s.color }}
                    >
                      {s.icon}
                    </div>
                    <span
                      className="font-semibold text-sm sm:text-base transition-colors duration-200"
                      style={{ color: open ? s.color : isDark ? "#f3f4f6" : "#1f2937" }}
                    >
                      {s.title}
                    </span>
                  </div>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      background: open ? s.color : isDark ? "rgba(255,255,255,0.08)" : "#f5f3ff",
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <ChevronDown size={14} color={open ? "white" : s.color} />
                  </div>
                </button>

                <div className={`pa-answer ${open ? "open" : ""}`}>
                  <div className="px-5 pb-5 space-y-4">
                    {s.content.map((c, j) => (
                      <div key={j}>
                        <p
                          className="text-xs font-bold uppercase tracking-wide mb-1"
                          style={{ color: s.color }}
                        >
                          {c.heading}
                        </p>
                        <p
                          className="text-sm leading-relaxed transition-colors duration-300"
                          style={{ color: isDark ? "#d1d5db" : "#4b5563" }}
                        >
                          {c.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ══ FOOTER ══ */}
        <div
          className="rounded-2xl p-6 text-center transition-all duration-300"
          style={{
            background: isDark
              ? "linear-gradient(135deg,rgba(145,0,189,0.12),rgba(60,155,249,0.10))"
              : "linear-gradient(135deg,rgba(145,0,189,0.06),rgba(60,155,249,0.06))",
            border: `1px solid ${isDark ? "rgba(145,0,189,0.25)" : "#ddd6fe"}`,
          }}
        >
          <Mail size={22} className="mx-auto mb-3" style={{ color: "#9100BD" }} />
          <p
            className="font-bold text-sm mb-1 transition-colors duration-300"
            style={{ color: isDark ? "#f9fafb" : "#111827" }}
          >
            Questions about this policy?
          </p>
          <p
            className="text-xs mb-4 transition-colors duration-300"
            style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
          >
            Our privacy team will respond within 48 hours.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                       transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}
          >
            Contact Privacy Team
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Privacy;