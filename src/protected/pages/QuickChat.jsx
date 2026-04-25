import { useState, useEffect, useRef } from "react";
import { Send, RotateCcw, Sparkles, User } from "lucide-react";
import { toast } from "react-toastify";
import PsycheAI from "../../public/assets/psycheAI.png";

const QuickChat = () => {
  const [messages, setMessages]   = useState([
    {
      id: 0,
      role: "ai",
      text: "Hi there 👋 I'm **PsycheAI**, your mental wellness companion. I'm here to listen, support, and guide you. Feel free to share anything on your mind — this is a safe, judgment-free space. 💜",
    },
  ]);
  const [input, setInput]         = useState("");
  const [streaming, setStreaming] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [isDark, setIsDark]       = useState(
    () => document.documentElement.classList.contains("dark")
  );

  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);
  const abortRef   = useRef(null);
  const token      = localStorage.getItem("token");

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { observer.disconnect(); abortRef.current?.abort(); };
  }, []);

  /* Auto-scroll to bottom on new content */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ── Send message ── */
  const handleSend = async () => {
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg = { id: Date.now(), role: "user", text };
    const aiId    = Date.now() + 1;
    const aiMsg   = { id: aiId, role: "ai", text: "" };

    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInput("");
    setStreaming(true);

    abortRef.current = new AbortController();

    try {
      const res = await fetch("http://localhost:8080/user/quickChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error("Server error");

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        setMessages(prev =>
          prev.map(m => m.id === aiId ? { ...m, text: accumulated } : m)
        );
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        toast.error("Failed to get response. Please try again.");
        setMessages(prev => prev.filter(m => m.id !== aiId));
      }
    } finally {
      setStreaming(false);
    }
  };

  /* ── Reset chat ── */
  const handleReset = async () => {
    if (streaming) { abortRef.current?.abort(); setStreaming(false); }
    try {
      setResetting(true);
      const res = await fetch("http://localhost:8080/user/quickChat/reset", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessages([{
          id: Date.now(),
          role: "ai",
          text: "Chat history cleared. Let's start fresh! 💜 How are you feeling today?",
        }]);
        toast.success("Chat reset successfully.");
      } else {
        toast.error("Failed to reset chat.");
      }
    } catch {
      toast.error("Failed to reset chat.");
    } finally {
      setResetting(false);
    }
  };

  /* ── Enter key ── */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  /* ── Render markdown-lite (bold only) ── */
  const renderText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "white";
  const border  = isDark ? "rgba(255,255,255,0.08)" : "#ede9fe";

  return (
    <div
      className="min-h-full w-full flex flex-col transition-colors duration-300"
      style={{ background: isDark ? "#111827" : "linear-gradient(160deg,#f5f3ff 0%,#eff6ff 50%,#fdf4ff 100%)" }}
    >
      <style>{`
        .chat-bubble { animation: fadeUp 0.3s ease both; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .typing-dot { animation: blink 1.2s ease infinite; }
        .typing-dot:nth-child(2) { animation-delay:0.2s; }
        .typing-dot:nth-child(3) { animation-delay:0.4s; }
        @keyframes blink {
          0%,80%,100% { opacity:0.2; transform:scale(0.8); }
          40%          { opacity:1;   transform:scale(1); }
        }
        .chat-input:focus { outline:none; }
      `}</style>

      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col flex-1" style={{ height: "calc(100vh - 80px)" }}>

        {/* ── Header ── */}
        <div
          className="rounded-2xl overflow-hidden shadow-sm mb-4 shrink-0"
          style={{ background: cardBg, border: `1px solid ${border}` }}
        >
          <div className="h-1" style={{ background: "linear-gradient(90deg,#6366f1,#9100BD,#ec4899)" }} />
          <div className="px-5 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-0.5 rounded-full shrink-0"
                style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)" }}>
                <img src={PsycheAI} alt="PsycheAI"
                  className="w-10 h-10 rounded-full object-cover block"
                  style={{ border: "2px solid white" }} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-sm" style={{ color: isDark ? "#f9fafb" : "#111827" }}>
                    PsycheAI
                  </p>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ background: "#f5f3ff", color: "#6d28d9", border: "1px solid #ddd6fe" }}>
                    <Sparkles size={8} /> AI
                  </span>
                  {/* Online dot */}
                  <span className="flex items-center gap-1 text-[10px] font-medium"
                    style={{ color: "#10b981" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Online
                  </span>
                </div>
                <p className="text-[11px]" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                  Your mental wellness companion · Always here to listen
                </p>
              </div>
            </div>

            {/* Reset button */}
            <button
              onClick={handleReset}
              disabled={resetting}
              title="Reset chat history"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all
                         hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: isDark ? "rgba(239,68,68,0.12)" : "#fff1f2",
                color: "#ef4444",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              <RotateCcw size={13} className={resetting ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* ── Messages ── */}
        <div
          className="flex-1 overflow-y-auto rounded-2xl p-4 sm:p-5 space-y-4 mb-4"
          style={{ background: cardBg, border: `1px solid ${border}` }}
        >
          {messages.map((msg) => {
            const isAI = msg.role === "ai";
            return (
              <div key={msg.id}
                className={`chat-bubble flex items-end gap-2.5 ${isAI ? "justify-start" : "justify-end"}`}>

                {/* AI avatar */}
                {isAI && (
                  <div className="p-0.5 rounded-full shrink-0 self-end"
                    style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)" }}>
                    <img src={PsycheAI} alt="PsycheAI"
                      className="w-7 h-7 rounded-full object-cover block"
                      style={{ border: "2px solid white" }} />
                  </div>
                )}

                {/* Bubble */}
                <div
                  className="max-w-[80%] sm:max-w-[72%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                  style={isAI ? {
                    background: isDark
                      ? "linear-gradient(135deg,rgba(99,102,241,0.18),rgba(168,85,247,0.10))"
                      : "linear-gradient(135deg,#f5f3ff,#ede9fe)",
                    color: isDark ? "#e9d5ff" : "#3b0764",
                    border: `1px solid ${isDark ? "rgba(99,102,241,0.25)" : "#ddd6fe"}`,
                    borderBottomLeftRadius: 4,
                  } : {
                    background: "linear-gradient(135deg,#3C9BF9,#9100BD)",
                    color: "white",
                    borderBottomRightRadius: 4,
                  }}
                >
                  {/* Streaming typing indicator */}
                  {isAI && msg.text === "" && streaming ? (
                    <div className="flex items-center gap-1 py-1">
                      {[0,1,2].map(i => (
                        <span key={i} className="typing-dot w-2 h-2 rounded-full"
                          style={{ background: "#9100BD", display: "inline-block" }} />
                      ))}
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{renderText(msg.text)}</p>
                  )}
                </div>

                {/* User avatar */}
                {!isAI && (
                  <div className="p-0.5 rounded-full shrink-0 self-end"
                    style={{ background: "linear-gradient(135deg,#3C9BF9,#9100BD)" }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: isDark ? "#1f2937" : "#f3e8ff", color: "#9100BD", border: "2px solid white" }}>
                      {(localStorage.getItem("username") || "U").charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>

        {/* ── Input bar ── */}
        <div
          className="rounded-2xl overflow-hidden shrink-0 shadow-sm"
          style={{ background: cardBg, border: `1px solid ${border}` }}
        >
          <div className="h-0.5" style={{ background: "linear-gradient(90deg,#6366f1,#9100BD,#ec4899)" }} />
          <div className="flex items-end gap-3 p-3 sm:p-4">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share how you're feeling… (Enter to send)"
              rows={1}
              className="chat-input flex-1 resize-none text-sm rounded-xl px-4 py-3 transition-all"
              style={{
                background: isDark ? "rgba(255,255,255,0.06)" : "#f8f7ff",
                border: `1px solid ${isDark ? "rgba(145,0,189,0.2)" : "#ddd6fe"}`,
                color: isDark ? "#f3f4f6" : "#111827",
                maxHeight: 120,
              }}
              onInput={e => {
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
            />

            <button
              onClick={handleSend}
              disabled={streaming || !input.trim()}
              className="p-3 rounded-xl text-white transition-all shrink-0
                         hover:opacity-90 hover:-translate-y-0.5
                         disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{ background: "linear-gradient(135deg,#6366f1,#9100BD)" }}
            >
              <Send size={18} />
            </button>
          </div>

          <p className="text-[10px] text-center pb-2 transition-colors"
            style={{ color: isDark ? "#4b5563" : "#d1d5db" }}>
            PsycheAI may make mistakes. Always consult a qualified professional for medical advice.
          </p>
        </div>

      </div>
    </div>
  );
};

export default QuickChat;