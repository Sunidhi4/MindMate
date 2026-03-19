import { Heart, Shield, Users, BookOpen, Star, ArrowRight, CheckCircle2, Sparkles, Brain, Lock } from "lucide-react";
import Snapshots from "../../protected/components/dashboardComponent/Snapshots";
const stats = [
  { value: "24K+", label: "Community Members" },
  { value: "187K+", label: "Feelings Shared"   },
  { value: "9.2K+", label: "Expert Sessions"   },
  { value: "52K+",  label: "Lives Impacted"    },
];

const features = [
  { icon: <Shield size={20} />,   color: "#9100BD", bg: "#faf5ff", darkBg: "rgba(145,0,189,0.1)", title: "Anonymous & Safe",          desc: "Share freely without revealing your identity. Your privacy is our top priority." },
  { icon: <Users size={20} />,    color: "#3C9BF9", bg: "#eff6ff", darkBg: "rgba(60,155,249,0.1)", title: "Peer Community",            desc: "Connect with people who truly understand. You're never alone in this journey." },
  { icon: <Brain size={20} />,    color: "#ec4899", bg: "#fdf2f8", darkBg: "rgba(236,72,153,0.1)", title: "Expert Guidance",           desc: "Book confidential sessions with certified mental health professionals." },
  { icon: <Heart size={20} />,    color: "#10b981", bg: "#f0fdf4", darkBg: "rgba(16,185,129,0.1)", title: "Emotional Support",         desc: "Express your struggles and receive empathetic responses from the community." },
  { icon: <Lock size={20} />,     color: "#f59e0b", bg: "#fffbeb", darkBg: "rgba(245,158,11,0.1)",  title: "Secure Platform",          desc: "Role-based access and encrypted communication keeps your data safe." },
  { icon: <BookOpen size={20} />, color: "#6366f1", bg: "#eef2ff", darkBg: "rgba(99,102,241,0.1)", title: "Curated Resources",        desc: "Access research-backed articles, tips, and wellness content anytime." },
];

const audience = [
  { emoji: "🧑‍💻", title: "Individuals",        desc: "Anyone seeking anonymous peer support and a safe space to share their mental health journey." },
  { emoji: "👨‍⚕️", title: "Professionals",       desc: "Mental health experts offering guidance, sessions, and support to those in need." },
  { emoji: "👨‍👩‍👧", title: "Families & Caregivers", desc: "Those supporting loved ones through mental health challenges with empathy and resources." },
];

const values = [
  { icon: "💜", title: "Empathy First",    desc: "Every interaction is rooted in kindness, understanding, and genuine care." },
  { icon: "🔒", title: "Privacy Always",  desc: "We never compromise on your right to privacy and anonymous expression." },
  { icon: "🌱", title: "Growth Together", desc: "We believe healing happens in community, not in isolation." },
  { icon: "✨", title: "Destigmatize",    desc: "We're committed to breaking the stigma around mental health, one story at a time." },
];

const AboutPage = () => {
  return (
    <div className="min-h-full w-full bg-gradient dark:bg-gray-900 overflow-x-hidden">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .fade-up {
          animation: fadeUp 0.6s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .card-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(145,0,189,0.12);
        }

        .gradient-text {
          background: linear-gradient(90deg, #9100BD, #3C9BF9, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-divider {
          border: none; height: 1px; margin: 0;
          background: linear-gradient(to right, transparent, #ddd6fe, transparent);
        }
        .dark .section-divider {
          background: linear-gradient(to right, transparent, #374151, transparent);
        }

        .ticker { display: flex; white-space: nowrap; animation: ticker 24s linear infinite; gap: 3rem; }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="w-full max-w-5xl mx-auto px-4 py-10 space-y-10">

        {/* ══ HERO ══ */}
        <div className="relative rounded-2xl overflow-hidden text-center px-6 py-14 fade-up"
          style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6,#ec4899)" }}>
          {/* subtle dot pattern overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase
                             text-white/80 bg-white/10 px-3 py-1 rounded-full border border-white/20 mb-4">
              <Sparkles size={11} /> Mental Health Platform
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              About PsychoTalk
            </h1>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              A supportive online platform dedicated to helping individuals facing mental health challenges.
              We provide a safe, anonymous space to share experiences, connect with peers, and access
              expert guidance — fostering a compassionate community where everyone feels heard and empowered.
            </p>
          </div>
        </div>

        {/* ══ STATS STRIP ══ */}
        <Snapshots/>

        {/* ══ MISSION + VISION ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              accent: "#9100BD",
              label: "Our Mission",
              icon: "🎯",
              text: "To provide a safe, anonymous, and supportive space where individuals can openly share their struggles, connect with empathetic peers, and access expert guidance for healing and growth.",
            },
            {
              accent: "#3C9BF9",
              label: "Our Vision",
              icon: "🌍",
              text: "To create a compassionate global community that destigmatizes mental health and empowers individuals to seek help confidently through collective support and professional care.",
            },
          ].map((item, i) => (
            <div key={i} className="card-lift rounded-2xl p-6
                                    bg-white dark:bg-gray-800
                                    border border-purple-100 dark:border-gray-700 shadow-sm">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}30` }}>
                {item.icon}
              </div>
              <h2 className="text-base font-bold mb-2 text-gray-900 dark:text-white">{item.label}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* ══ KEY FEATURES ══ */}
        <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800
                        border border-purple-100 dark:border-gray-700 shadow-sm">
          <div style={{ height: 4, background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Star size={17} className="text-purple-500" />
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Key Features</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <div key={i} className="card-lift rounded-xl p-4 border
                                        border-gray-100 dark:border-gray-700">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 shrink-0"
                    style={{ background: f.bg, color: f.color, border: `1px solid ${f.color}25` }}>
                    {f.icon}
                  </div>
                  <p className="font-semibold text-sm text-gray-800 dark:text-white mb-1">{f.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ WHO CAN USE ══ */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users size={17} className="text-blue-500" />
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Who Can Use PsychoTalk?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {audience.map((a, i) => (
              <div key={i} className="card-lift rounded-2xl p-5 text-center
                                      bg-white dark:bg-gray-800
                                      border border-purple-100 dark:border-gray-700 shadow-sm">
                <div className="text-4xl mb-3">{a.emoji}</div>
                <p className="font-bold text-sm text-gray-800 dark:text-white mb-2">{a.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ OUR VALUES ══ */}
        <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800
                        border border-gray-100 dark:border-gray-700 shadow-sm">
          <div style={{ height: 4, background: "linear-gradient(90deg,#ec4899,#9100BD,#3C9BF9)" }} />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Heart size={17} className="text-pink-500" />
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Our Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl
                                        bg-gray-50 dark:bg-gray-700/40
                                        border border-gray-100 dark:border-gray-700">
                  <span className="text-2xl shrink-0">{v.icon}</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-800 dark:text-white mb-0.5">{v.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ WHY CHOOSE ══ */}
        <div className="rounded-2xl p-6
                        bg-white dark:bg-gray-800
                        border border-purple-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle2 size={17} className="text-purple-500" />
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Why Choose PsychoTalk?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: "🛡️", text: "Safe and anonymous environment" },
              { icon: "🤝", text: "Supportive peer community" },
              { icon: "🏥", text: "Access to qualified mental health professionals" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl
                                      bg-purple-50 dark:bg-purple-900/20
                                      border border-purple-100 dark:border-purple-800/30">
                <span className="text-xl shrink-0">{item.icon}</span>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ AFFIRMATIONS TICKER ══ */}
        <div className="overflow-hidden rounded-xl py-3
                        border border-purple-100 dark:border-gray-700
                        bg-white dark:bg-gray-800">
          <div className="ticker select-none">
            {[
              "You are not alone ✦","Healing is possible ✦","Your story matters ✦",
              "Be gentle with yourself ✦","Progress not perfection ✦","We're here for you ✦",
              "You are enough ✦","Every step counts ✦",
              "You are not alone ✦","Healing is possible ✦","Your story matters ✦",
              "Be gentle with yourself ✦","Progress not perfection ✦","We're here for you ✦",
              "You are enough ✦","Every step counts ✦",
            ].map((t, i) => (
              <span key={i} className="text-xs font-medium text-purple-400 shrink-0">{t}</span>
            ))}
          </div>
        </div>

        {/* ══ FOOTER CTA ══ */}
        <div className="rounded-2xl p-8 text-center text-white"
          style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
          <Sparkles className="mx-auto mb-3 opacity-80" size={22} />
          <h3 className="text-xl font-bold mb-2">Thank You for Being Here</h3>
          <p className="text-sm text-white/75 leading-relaxed max-w-md mx-auto mb-5">
            Your willingness to share and seek help is a powerful step toward healing.
            PsychoTalk is here to support you — every step of the way.
          </p>
          <a href="/user/share"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
                       bg-white text-purple-600 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
            Start Your Journey <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;