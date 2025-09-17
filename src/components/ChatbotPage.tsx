// src/components/ChatbotPage.tsx
import React, { useState } from "react";
import { MessageCircle, Send, User, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I’m here to help with Mathematics from 1st to 10th standard. Ask me anything!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5000/api/chat"; // Flask backend
  const API_KEY = "AIzaSyBV-Y-WGRXzu9UJYc3hX7jLpf767Yyd6GU"; // replace with your real key

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: API_KEY,
          model: "gemini-2.5-flash",
          prompt: input,
        }),
      });

      const data = await res.json();
      const botMessage: Message = {
        role: "assistant",
        content: data.response || data.error || "⚠️ No response from server",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error connecting to server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[600px] bg-slate-900/70 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-lg md:text-xl font-bold">MathMentor AI Tutor</h1>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* For bot messages → icon left, text right */}
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`rounded-2xl px-4 py-3 max-w-[70%] text-sm md:text-base whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    : "bg-white/10 text-slate-200 border border-white/10"
                }`}
              >
                {msg.content}
              </div>

              {/* For user messages → icon right, text left */}
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white/10 border border-white/10 text-slate-300 px-4 py-2 rounded-2xl text-sm animate-pulse">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="p-4 border-t border-white/10 bg-slate-900/80">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your math question..."
              className="flex-1 rounded-xl px-4 py-3 bg-slate-800/80 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 disabled:opacity-50"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
