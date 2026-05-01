import { useState, useEffect, useRef } from "react";
import { Send, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import PsycheAI from "../../public/assets/psycheAI.png";

const STORAGE_KEY = "quickchat_messages";

const QuickChat = () => {

  /* ── Helpers ── */
  const saveMessages = (msgs) => {
    const trimmed = msgs.slice(-10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  };

  const loadMessages = () => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return data?.length ? data : null;
    } catch {
      return null;
    }
  };

  /* ── State ── */
  const [messages, setMessages] = useState(() => {
    const saved = loadMessages();
    return saved || [
      {
        id: 0,
        role: "ai",
        text: "Hi 👋 I'm **MindMate AI**. This is a quick, private space to talk. What's on your mind?",
      },
    ];
  });

  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [resetting, setResetting] = useState(false);

  const bottomRef = useRef(null);
  const abortRef = useRef(null);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "User";
  const age = localStorage.getItem("age") || "";

  /* ── Persist messages ── */
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  /* ── Auto scroll ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ── Send Message ── */
  const handleSend = async () => {
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg = { id: Date.now(), role: "user", text };
    const aiId = Date.now() + 1;

    setMessages(prev => [...prev, userMsg, { id: aiId, role: "ai", text: "" }]);
    setInput("");
    setStreaming(true);

    const lastMessages = [...messages, userMsg]
      .slice(-10)
      .map(m => ({
        role: m.role,
        content: m.text,
      }));

    abortRef.current = new AbortController();

    try {
      const res = await fetch("http://localhost:8080/user/quickChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          messages: lastMessages,
        }),
      });

      if (!res.ok) throw new Error("Server error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value, { stream: true });

        setMessages(prev =>
          prev.map(m => (m.id === aiId ? { ...m, text: accumulated } : m))
        );
      }

    } catch (err) {
      if (err.name !== "AbortError") {
        toast.error("Failed to get response");
        setMessages(prev => prev.filter(m => m.id !== aiId));
      }
    } finally {
      setStreaming(false);
    }
  };

  /* ── Reset ── */
  const handleReset = () => {
    if (streaming) {
      abortRef.current?.abort();
      setStreaming(false);
    }

    localStorage.removeItem(STORAGE_KEY);

    setMessages([
      {
        id: Date.now(),
        role: "ai",
        text: "Chat cleared 💜 I'm here for you. What's going on?",
      },
    ]);

    toast.success("Chat reset");
  };

  /* ── Enter key ── */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* ── Render bold ── */
  const renderText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>
    );
  };

  return (
    <div className="h-screen flex flex-col max-w-3xl mx-auto p-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <img src={PsycheAI} className="w-8 h-8 rounded-full" />
          Mind Mate <Sparkles size={14} />
        </h2>

        <button onClick={handleReset} className="text-red-500 text-sm flex gap-1 items-center">
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 border p-3 rounded-xl">
        {messages.map(msg => {
          const isAI = msg.role === "ai";

          return (
            <div key={msg.id} className={`flex ${isAI ? "justify-start" : "justify-end"}`}>
              <div className={`px-3 py-2 rounded-xl max-w-[75%] text-sm ${
                isAI ? "bg-purple-100 text-purple-900" : "bg-blue-500 text-white"
              }`}>
                {isAI && msg.text === "" && streaming
                  ? "..."
                  : renderText(msg.text)}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="mt-3 flex gap-2">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded-xl p-2 text-sm"
          placeholder="Share what's on your mind..."
        />

        <button
          onClick={handleSend}
          disabled={streaming}
          className="bg-purple-600 text-white px-4 rounded-xl"
        >
          <Send size={16} />
        </button>
      </div>

      {/* Footer hint */}
      <p className="text-[11px] text-center mt-2 text-gray-400">
        Quick Chat doesn’t store personal data. For deeper support, connect with a Wellness Agent 💜
      </p>

    </div>
  );
};

export default QuickChat;