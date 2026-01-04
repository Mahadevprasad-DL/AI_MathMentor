// src/components/ChatbotPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { Send, Mic, MicOff } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm your Math Tutor AI. Ask me any question from class 1 to 10!",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef<any>(null);

  const API_URL = "http://localhost:5000/api/chat";
  const API_KEY = "AIzaSyBV-Y-WGRXzu9UJYc3hX7jLpf767Yyd6GU";

  // ----------------------------------
  // CLEAN RESPONSE
  // ----------------------------------
  const cleanResponse = (text: string) => {
    return text
      .replace(/\*/g, "")
      .replace(/#/g, "")
      .replace(/\$/g, "")
      .replace(/`/g, "")
      .trim();
  };

  // ----------------------------------
  // SPEECH TO TEXT SETUP
  // ----------------------------------
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? prev + " " + transcript : transcript));
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // ----------------------------------
  // SEND MESSAGE
  // ----------------------------------
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

      const cleanedText = cleanResponse(
        data.response || data.error || "⚠️ No response from server"
      );

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: cleanedText },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error connecting to server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------
  // ENTER KEY
  // ----------------------------------
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  // ----------------------------------
  // UI
  // ----------------------------------
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[700px] bg-gray-800 shadow-xl rounded-xl flex flex-col">

        {/* Header */}
        <header className="p-4 border-b border-gray-700 text-xl font-bold text-center bg-gray-850">
          MathMentor AI 📘
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-xl max-w-[75%] text-base leading-relaxed ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-400 animate-pulse">Typing...</div>
          )}
        </div>

        {/* Input */}
        <footer className="p-4 border-t border-gray-700 flex space-x-2 bg-gray-850">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a math question (or use mic)..."
            className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* MIC BUTTON */}
          <button
            onClick={handleMicClick}
            className={`px-4 py-3 rounded-lg flex items-center justify-center ${
              listening ? "bg-red-600" : "bg-gray-600 hover:bg-gray-500"
            }`}
            title="Speak"
          >
            {listening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          {/* SEND BUTTON */}
          <button
            onClick={handleSend}
            disabled={loading}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 rounded-lg flex items-center justify-center"
          >
            <Send size={20} />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ChatbotPage;
