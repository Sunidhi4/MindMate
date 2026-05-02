import React, { useState, useEffect, useRef } from 'react';

const WellnessAgent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Fetch and sort chat history
  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/user/chat/loadHistory', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load chat history');
      }

      const data = await response.json();
      
      // Process and clean up message contents
      const processedMessages = data.content.map((msg) => {
        let content = msg.content;

        if (typeof content === 'string') {
          if (content.startsWith('{') && content.endsWith('}')) {
            try {
              const parsed = JSON.parse(content);
              content = parsed.message || content;
            } catch (e) {
              // Ignore JSON parse errors
            }
          }
          if (content.startsWith('"') && content.endsWith('"')) {
            content = content.slice(1, -1);
          }
        }
        return {
          ...msg,
          content,
        };
      });

      // Sort messages chronologically by Date & Time
      const sortedMessages = processedMessages.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      setMessages(sortedMessages);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  // Auto-scroll to the bottom of the chat window
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message function
  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const token = localStorage.getItem('token');

    // Create optimistic user message
    const userMsg = {
      id: Date.now(),
      role: 'USER',
      content: inputMessage,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/user/chat/getResponse?message=${encodeURIComponent(inputMessage)}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const responseText = await response.text();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'ASSISTANT',
          content: responseText,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Error calling endpoint:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'ASSISTANT',
          content: 'Sorry, I am having trouble connecting to the MindMate AI service. Please try again later.',
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-slate-50 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Top Header Bar */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">MM</span>
          </div>
          <div>
            <h2 className="text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MindMate AI
            </h2>
            <p className="text-xs text-slate-400">Wellness Expert Agent</p>
          </div>
        </div>
        <div>
          <button
            onClick={fetchChatHistory}
            className="text-xs text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full font-medium transition"
          >
            Refresh Messages
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'USER' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-4 rounded-2xl border text-sm leading-relaxed shadow-sm ${
                msg.role === 'USER'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent rounded-br-none'
                  : 'bg-white text-slate-800 border-slate-100/70 rounded-bl-none shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
              <div
                className={`text-[10px] mt-2 text-right ${
                  msg.role === 'USER' ? 'text-blue-100' : 'text-slate-400'
                }`}
              >
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && !loading && (
          <div className="text-center text-slate-400 text-sm mt-10">
            No conversation history available. Say hello to get started.
          </div>
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 rounded-bl-none flex gap-2 items-center">
              <span className="animate-bounce w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span className="animate-bounce w-2 h-2 bg-indigo-500 rounded-full delay-100"></span>
              <span className="animate-bounce w-2 h-2 bg-purple-600 rounded-full delay-200"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input Bar */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 p-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm bg-slate-50/50 text-slate-700 placeholder-slate-400 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="p-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-md hover:opacity-90 active:scale-98 transition flex items-center justify-center min-w-[48px]"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default WellnessAgent;