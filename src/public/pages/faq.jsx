import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, MessageCircle, Shield, Users, BookOpen, HelpCircle } from "lucide-react";

const faqCategories = [
  {
    label: "General",
    icon: <HelpCircle size={15} />,
    color: "#9100BD",
    faqs: [
      {
        question: "What is PsychoTalk?",
        answer: "PsychoTalk is a supportive online platform where individuals facing mental health challenges can share experiences anonymously, connect with peers, and access professional guidance in a safe, judgment-free environment.",
      },
      {
        question: "Who can use PsychoTalk?",
        answer: "Anyone seeking mental health support, peer connection, or professional guidance can join. Licensed mental health professionals also provide consultations through the platform.",
      },
      {
        question: "Is PsychoTalk free to use?",
        answer: "Community participation is completely free. Professional consultations may involve fees depending on the provider and session type chosen.",
      },
    ],
  },
  {
    label: "Privacy",
    icon: <Shield size={15} />,
    color: "#3C9BF9",
    faqs: [
      {
        question: "Is PsychoTalk anonymous and confidential?",
        answer: "Yes. We prioritize your privacy. You can participate anonymously using a display name, and all shared information and expert sessions remain confidential.",
      },
      {
        question: "Who can see my posts?",
        answer: "Posts are visible to the community but are tied only to your display name — never your real identity. You control what you share.",
      },
      {
        question: "How is my data protected?",
        answer: "We use encrypted connections and follow strict data protection standards. We never sell or share your personal information with third parties.",
      },
    ],
  },
  {
    label: "Community",
    icon: <Users size={15} />,
    color: "#ec4899",
    faqs: [
      {
        question: "Is the community judgment-free?",
        answer: "Absolutely. PsychoTalk fosters a respectful, empathetic environment where members are encouraged to share openly without fear of criticism.",
      },
      {
        question: "What if I experience inappropriate behavior?",
        answer: "Our moderation team actively monitors the platform. You can report any inappropriate content or behavior for immediate review and action.",
      },
      {
        question: "Can I support others in the community?",
        answer: "Yes! You can reply to posts, offer encouragement, and share your experiences. Peer support is at the heart of what we do.",
      },
    ],
  },
  {
    label: "Expert Sessions",
    icon: <BookOpen size={15} />,
    color: "#10b981",
    faqs: [
      {
        question: "How can I connect with a mental health expert?",
        answer: "You can browse verified professionals on the Experts page and book confidential one-on-one sessions directly through the platform.",
      },
      {
        question: "Are the experts verified?",
        answer: "Yes. All experts on PsychoTalk go through a verification process to confirm their qualifications and credentials before being approved.",
      },
      {
        question: "How do I get started?",
        answer: "Create an account, explore discussions, share your thoughts, and schedule expert sessions whenever you need personalized support.",
      },
    ],
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex]         = useState(null); // "catIdx-faqIdx"
  const [activeCategory, setActiveCategory] = useState(0);
  const [isDark, setIsDark]               = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggle = (key) => setOpenIndex(openIndex === key ? null : key);

  const activeCat = faqCategories[activeCategory];

  return (
    <section
      className="min-h-screen py-14 sm:py-20 relative overflow-hidden transition-colors duration-300"
      style={{
        background: isDark
          ? "#111827"
          : "linear-gradient(160deg,#f5f3ff 0%,#eff6ff 50%,#fdf4ff 100%)",
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .faq-enter { animation: fadeUp 0.35s ease both; }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, padding 0.25s ease;
        }
        .faq-answer.open {
          max-height: 400px;
        }
      `}</style>

      {/* Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(145,0,189,0.12),transparent 70%)" }} />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(60,155,249,0.10),transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6">

        {/* ══ HEADER ══ */}
        <div className="text-center mb-10">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase
                       px-3 py-1 rounded-full shadow-sm mb-4"
            style={{
              color: isDark ? "#c084fc" : "#9100BD",
              background: isDark ? "rgba(145,0,189,0.15)" : "white",
              border: `1px solid ${isDark ? "rgba(145,0,189,0.35)" : "#ddd6fe"}`,
            }}
          >
            ✦ Help Centre
          </span>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 transition-colors duration-300"
            style={{ color: isDark ? "#fff" : "#111827" }}
          >
            Frequently Asked{" "}
            <span style={{
              background: "linear-gradient(90deg,#9100BD,#3C9BF9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Questions
            </span>
          </h1>

          <p
            className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed transition-colors duration-300"
            style={{ color: isDark ? "#9ca3af" : "#4b5563" }}
          >
            Find answers about privacy, expert sessions, community guidelines, and more.
          </p>

          <div className="mt-5 h-px max-w-xs mx-auto"
            style={{ background: "linear-gradient(to right,transparent,#9100BD,transparent)" }} />
        </div>

        {/* ══ CATEGORY TABS ══ */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {faqCategories.map((cat, i) => {
            const isActive = activeCategory === i;
            return (
              <button
                key={i}
                onClick={() => { setActiveCategory(i); setOpenIndex(null); }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold
                           transition-all duration-200"
                style={{
                  background: isActive
                    ? `linear-gradient(90deg,${cat.color},${cat.color}bb)`
                    : isDark ? "rgba(255,255,255,0.06)" : "white",
                  color: isActive ? "white" : isDark ? "#9ca3af" : "#374151",
                  border: isActive
                    ? "none"
                    : `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb"}`,
                  boxShadow: isActive ? `0 4px 14px ${cat.color}35` : "none",
                }}
              >
                {cat.icon} {cat.label}
              </button>
            );
          })}
        </div>

        {/* ══ FAQ LIST ══ */}
        <div className="space-y-3 faq-enter" key={activeCategory}>
          {activeCat.faqs.map((faq, idx) => {
            const key   = `${activeCategory}-${idx}`;
            const open  = openIndex === key;

            return (
              <div
                key={key}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "white",
                  border: open
                    ? `1px solid ${activeCat.color}50`
                    : `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#ede9fe"}`,
                  boxShadow: open
                    ? `0 4px 20px ${activeCat.color}18`
                    : isDark ? "none" : "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                {/* Top accent on open */}
                {open && (
                  <div className="h-0.5 w-full"
                    style={{ background: `linear-gradient(90deg,${activeCat.color},${activeCat.color}44)` }} />
                )}

                {/* Question button */}
                <button
                  onClick={() => toggle(key)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
                >
                  <span
                    className="font-semibold text-sm sm:text-base transition-colors duration-200"
                    style={{ color: open ? activeCat.color : isDark ? "#f3f4f6" : "#1f2937" }}
                  >
                    {faq.question}
                  </span>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      background: open ? activeCat.color : isDark ? "rgba(255,255,255,0.08)" : "#f5f3ff",
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <ChevronDown size={14} color={open ? "white" : activeCat.color} />
                  </div>
                </button>

                {/* Answer */}
                <div className={`faq-answer ${open ? "open" : ""}`}>
                  <div
                    className="px-5 pb-5 text-sm leading-relaxed transition-colors duration-300"
                    style={{ color: isDark ? "#d1d5db" : "#4b5563" }}
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ══ STILL HAVE QUESTIONS ══ */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Contact card */}
          <div
            className="rounded-2xl p-6 text-center transition-all duration-300"
            style={{
              background: isDark
                ? "linear-gradient(135deg,rgba(145,0,189,0.15),rgba(60,155,249,0.10))"
                : "linear-gradient(135deg,rgba(145,0,189,0.06),rgba(60,155,249,0.06))",
              border: `1px solid ${isDark ? "rgba(145,0,189,0.25)" : "#ddd6fe"}`,
            }}
          >
            <MessageCircle
              size={24} className="mx-auto mb-3"
              style={{ color: "#9100BD" }}
            />
            <p
              className="font-bold text-sm mb-1 transition-colors duration-300"
              style={{ color: isDark ? "#f9fafb" : "#111827" }}
            >
              Still have questions?
            </p>
            <p
              className="text-xs mb-4 transition-colors duration-300"
              style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
            >
              Our team typically responds within 24 hours.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                         text-sm font-semibold text-white transition-all
                         hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}
            >
              Contact Support
            </Link>
          </div>

          {/* Community card */}
          <div
            className="rounded-2xl p-6 text-center transition-all duration-300"
            style={{
              background: isDark
                ? "linear-gradient(135deg,rgba(16,185,129,0.12),rgba(99,102,241,0.10))"
                : "linear-gradient(135deg,rgba(16,185,129,0.06),rgba(99,102,241,0.06))",
              border: `1px solid ${isDark ? "rgba(16,185,129,0.25)" : "#bbf7d0"}`,
            }}
          >
            <Users
              size={24} className="mx-auto mb-3"
              style={{ color: "#10b981" }}
            />
            <p
              className="font-bold text-sm mb-1 transition-colors duration-300"
              style={{ color: isDark ? "#f9fafb" : "#111827" }}
            >
              Join the Community
            </p>
            <p
              className="text-xs mb-4 transition-colors duration-300"
              style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
            >
              Connect with thousands of members for peer support.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                         text-sm font-semibold text-white transition-all
                         hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(90deg,#10b981,#6366f1)" }}
            >
              Get Started Free
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQs;