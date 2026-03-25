import { useState, useEffect } from "react";
import { FileText, Users, ShieldAlert, Gavel, AlertTriangle, RefreshCw, Mail, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: <Users size={18} />,
    color: "#9100BD",
    title: "Eligibility & Account",
    content: [
      {
        heading: "Age Requirement",
        text: "You must be at least 13 years old to use PsychoTalk. Users under 18 should have parental awareness of their participation on the platform.",
      },
      {
        heading: "Account Responsibility",
        text: "You are responsible for maintaining the confidentiality of your login credentials. Any activity under your account is your responsibility. Notify us immediately if you suspect unauthorised access.",
      },
      {
        heading: "One Account Per User",
        text: "Creating multiple accounts to evade bans or misuse the platform is strictly prohibited and may result in permanent removal.",
      },
    ],
  },
  {
    icon: <ShieldAlert size={18} />,
    color: "#ec4899",
    title: "Community Standards",
    content: [
      {
        heading: "Prohibited Content",
        text: "You may not post content that is abusive, hateful, threatening, sexually explicit, or that promotes self-harm. Violating these standards will result in immediate removal of content and possible account suspension.",
      },
      {
        heading: "Anonymity Respect",
        text: "Attempting to identify, expose, or threaten the anonymity of other users is strictly forbidden and constitutes a serious breach of community trust.",
      },
      {
        heading: "Misinformation",
        text: "Spreading false or misleading medical information is prohibited. PsychoTalk is a supportive community — not a substitute for professional medical advice.",
      },
    ],
  },
  {
    icon: <FileText size={18} />,
    color: "#3C9BF9",
    title: "Content Ownership & Licence",
    content: [
      {
        heading: "Your Content",
        text: "You retain ownership of everything you post. By posting, you grant PsychoTalk a non-exclusive, royalty-free licence to display and store your content solely for the purpose of operating the platform.",
      },
      {
        heading: "Platform Content",
        text: "All PsychoTalk branding, design, and platform code is owned by PsychoTalk. You may not copy, reproduce, or redistribute platform assets without written permission.",
      },
      {
        heading: "Content Removal",
        text: "We reserve the right to remove any content that violates these terms without prior notice. We will make reasonable efforts to explain moderation decisions.",
      },
    ],
  },
  {
    icon: <AlertTriangle size={18} />,
    color: "#f59e0b",
    title: "Disclaimers & Limitations",
    content: [
      {
        heading: "Not Medical Advice",
        text: "PsychoTalk is a peer support and professional connection platform. Content shared by users or experts does not constitute formal medical or psychiatric advice. Always consult a licensed professional for medical decisions.",
      },
      {
        heading: "Service Availability",
        text: "We strive for high availability but do not guarantee uninterrupted access. Scheduled maintenance and unexpected outages may occur. We are not liable for losses arising from service interruptions.",
      },
      {
        heading: "Limitation of Liability",
        text: "To the extent permitted by law, PsychoTalk is not liable for indirect, incidental, or consequential damages arising from your use of the platform.",
      },
    ],
  },
  {
    icon: <Gavel size={18} />,
    color: "#10b981",
    title: "Expert Sessions",
    content: [
      {
        heading: "Expert Verification",
        text: "Experts on PsychoTalk undergo a credential verification process. However, users are encouraged to do their own due diligence before booking sessions.",
      },
      {
        heading: "Session Conduct",
        text: "All sessions must comply with professional ethical standards. Experts may not solicit users for off-platform services or personal contact.",
      },
      {
        heading: "Fees & Refunds",
        text: "Session fees are set by individual experts. Refund eligibility depends on cancellation timing — contact support within 24 hours of a disputed charge.",
      },
    ],
  },
  {
    icon: <RefreshCw size={18} />,
    color: "#6366f1",
    title: "Changes & Termination",
    content: [
      {
        heading: "Policy Updates",
        text: "We may update these terms periodically. Significant changes will be communicated via platform notification. Continued use after changes constitutes acceptance.",
      },
      {
        heading: "Account Termination",
        text: "We reserve the right to suspend or terminate accounts that violate these terms. You may also delete your account at any time from account settings.",
      },
      {
        heading: "Governing Law",
        text: "These terms are governed by the laws of India. Disputes will be resolved under the jurisdiction of courts in Mumbai, Maharashtra.",
      },
    ],
  },
];

const Terms = () => {
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
        .ta-answer { max-height:0; overflow:hidden; transition:max-height 0.35s ease; }
        .ta-answer.open { max-height:600px; }
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
            style={{ background: "linear-gradient(135deg,#3b82f6,#9100BD)" }}>
            <FileText size={26} className="text-white" />
          </div>

          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase
                       px-3 py-1 rounded-full shadow-sm mb-4"
            style={{
              color: isDark ? "#93c5fd" : "#3b82f6",
              background: isDark ? "rgba(59,130,246,0.15)" : "white",
              border: `1px solid ${isDark ? "rgba(59,130,246,0.35)" : "#bfdbfe"}`,
            }}
          >
            ✦ Legal
          </span>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 transition-colors duration-300"
            style={{ color: isDark ? "#fff" : "#111827" }}
          >
            Terms of{" "}
            <span style={{
              background: "linear-gradient(90deg,#3b82f6,#9100BD)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Use
            </span>
          </h1>

          <p
            className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed transition-colors duration-300"
            style={{ color: isDark ? "#9ca3af" : "#4b5563" }}
          >
            By using PsychoTalk you agree to these terms. Please read them carefully —
            they protect both you and our community.
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
                background: isDark ? "rgba(145,0,189,0.15)" : "#faf5ff",
                color: "#9100BD",
                border: "1px solid rgba(145,0,189,0.25)",
              }}
            >
              ✓ Effective immediately
            </span>
          </div>

          <div className="mt-6 h-px max-w-xs mx-auto"
            style={{ background: "linear-gradient(to right,transparent,#3b82f6,transparent)" }} />
        </div>

        {/* ══ ACCEPTANCE STRIP ══ */}
        <div
          className="rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center gap-4"
          style={{ background: "linear-gradient(135deg,#1e3a5f,#3730a3)", color: "white" }}
        >
          <Gavel size={22} className="shrink-0 opacity-80" />
          <p className="text-sm leading-relaxed text-white/90 text-center sm:text-left">
            <strong>By creating an account or using PsychoTalk</strong>, you confirm that
            you have read, understood, and agreed to these Terms of Use.
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
                    : `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e0e7ff"}`,
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
                      background: open ? s.color : isDark ? "rgba(255,255,255,0.08)" : "#eff6ff",
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <ChevronDown size={14} color={open ? "white" : s.color} />
                  </div>
                </button>

                <div className={`ta-answer ${open ? "open" : ""}`}>
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

        {/* ══ LINKS TO RELATED ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/privacy"
            className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:-translate-y-0.5"
            style={{
              background: isDark ? "rgba(145,0,189,0.12)" : "white",
              border: `1px solid ${isDark ? "rgba(145,0,189,0.25)" : "#ddd6fe"}`,
            }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg,#9100BD,#3C9BF9)" }}>
              <FileText size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold transition-colors duration-300"
                style={{ color: isDark ? "#f9fafb" : "#111827" }}>
                Privacy Policy
              </p>
              <p className="text-xs transition-colors duration-300"
                style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                How we protect your data
              </p>
            </div>
          </Link>

          <Link
            to="/faq"
            className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:-translate-y-0.5"
            style={{
              background: isDark ? "rgba(60,155,249,0.12)" : "white",
              border: `1px solid ${isDark ? "rgba(60,155,249,0.25)" : "#bfdbfe"}`,
            }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg,#3C9BF9,#6366f1)" }}>
              <Mail size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold transition-colors duration-300"
                style={{ color: isDark ? "#f9fafb" : "#111827" }}>
                FAQ
              </p>
              <p className="text-xs transition-colors duration-300"
                style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                Common questions answered
              </p>
            </div>
          </Link>
        </div>

        {/* ══ FOOTER ══ */}
        <div
          className="rounded-2xl p-6 text-center transition-all duration-300"
          style={{
            background: isDark
              ? "linear-gradient(135deg,rgba(59,130,246,0.12),rgba(99,102,241,0.10))"
              : "linear-gradient(135deg,rgba(59,130,246,0.06),rgba(99,102,241,0.06))",
            border: `1px solid ${isDark ? "rgba(59,130,246,0.25)" : "#bfdbfe"}`,
          }}
        >
          <AlertTriangle size={22} className="mx-auto mb-3" style={{ color: "#f59e0b" }} />
          <p
            className="font-bold text-sm mb-1 transition-colors duration-300"
            style={{ color: isDark ? "#f9fafb" : "#111827" }}
          >
            Need clarification on any term?
          </p>
          <p
            className="text-xs mb-4 transition-colors duration-300"
            style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
          >
            Our legal team is happy to explain any section in plain language.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                       transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(90deg,#3b82f6,#9100BD)" }}
          >
            Contact Us
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Terms;