import PsychoTalkLogo from "../../assets/psychotalk_logo.webp";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";


const Welcome = () => {
  const badges = [
    "Safe & Anonymous",
    "Peer Support",
    "Expert Guidance",
    "Judgment-Free",
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden
                        bg-gradient dark:bg-gray-900">
      <style>{`
        @keyframes floatLogo {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50%      { transform: translateY(-16px) rotate(1deg); }
        }
        .float-logo { animation: floatLogo 5s ease-in-out infinite; }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-heading {
          background: linear-gradient(90deg,#9100BD,#3C9BF9,#ec4899,#9100BD);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up-1 { animation: fadeUp 0.6s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.6s ease 0.25s both; }
        .fade-up-3 { animation: fadeUp 0.6s ease 0.4s both; }
        .fade-up-4 { animation: fadeUp 0.6s ease 0.55s both; }
      `}</style>

      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle,#9100BD,transparent 70%)" }} />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#3C9BF9,transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-6xl mx-auto -top-12 px-6 py-6 md:py-12
                      flex flex-col md:flex-row items-center gap-12 md:gap-8">

        {/* ── LEFT: Text ── */}
        <div className="flex-1 text-center md:text-left space-y-6">

          <div className="fade-up-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase
                             text-purple-600 dark:text-purple-400
                             bg-purple-100 dark:bg-purple-900/30
                             px-3 py-1 rounded-full border border-purple-200 dark:border-purple-700/50">
              <Sparkles size={11} /> Mental Wellness Platform
            </span>
          </div>

          <div className="fade-up-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight
                           text-gray-900 dark:text-white">
              Welcome to{" "}
              <span className="shimmer-heading">PsychoTalk</span>
            </h1>
          </div>

          <div className="fade-up-3">
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto md:mx-0">
              Share your thoughts and feelings safely, talk with people who
              understand, and get help from certified experts — all
              <strong className="text-purple-600 dark:text-purple-400"> anonymously</strong> and
              without judgment.
            </p>
          </div>

          {/* Badge pills */}
          <div className="fade-up-3 flex flex-wrap justify-center md:justify-start gap-2">
            {badges.map((b, i) => (
              <span key={i}
                className="text-xs font-semibold px-3 py-1.5 rounded-full
                           text-purple-700 dark:text-purple-300
                           bg-white dark:bg-gray-800
                           border border-purple-200 dark:border-purple-700/50
                           shadow-sm">
                ✦ {b}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="fade-up-4 flex flex-wrap justify-center md:justify-start gap-3 pt-2">
            <Link to="/signup"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl
                         text-sm font-bold text-white shadow-lg shadow-purple-300/30
                         transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}>
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link to="/experts"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl
                         text-sm font-semibold transition-all
                         text-purple-700 dark:text-purple-300
                         bg-white dark:bg-gray-800
                         border-2 border-purple-300 dark:border-purple-600
                         hover:bg-purple-50 dark:hover:bg-gray-700 shadow-sm">
              Meet Experts
            </Link>
          </div>
        </div>

        {/* ── RIGHT: Logo ── */}
        <div className="hidden md:flex md:w-2/5 justify-center items-center">
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full blur-3xl opacity-20"
              style={{ background: "radial-gradient(circle,#9100BD,#3C9BF9)" }} />
            <img
              src={PsychoTalkLogo}
              alt="PsychoTalk"
              className="float-logo relative w-72 xl:w-80 select-none pointer-events-none drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;