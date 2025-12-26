import React, { useState, useRef, useEffect } from "react";
import axiosClient from "../utils/axiosClient";
import { Send, Sparkles, User, Bot, Loader2 } from "lucide-react";

const AiChat = ({ problem }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(scrollToBottom, [messages, isStreaming]);

  // ⛔ streaming simulator (acts like ChatGPT typing)
  const streamAIResponse = async (fullText) => {
    setIsStreaming(true);

    let current = "";
    const chunks = fullText.split(" "); // simple chunking by words

    for (let i = 0; i < chunks.length; i++) {
      current += chunks[i] + " ";
      await new Promise((res) => setTimeout(res, 40)); // typing speed
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text = current;
        return updated;
      });
    }

    setIsStreaming(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    scrollToBottom();

    const userInput = input;
    setInput("");

    // create placeholder AI bubble
    setMessages((prev) => [...prev, { role: "ai", text: "" }]);

    try {
      const res = await axiosClient.post("/api/auth/ai/help", {
        message: userInput,
        title: problem.title,
        description: problem.description,
        testCases: problem.visibleTestCases,
        startCode: problem.startCode,
      });

      const aiFullText = res.data.message;
      streamAIResponse(aiFullText);
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text =
          err.response?.data?.message || "AI Failed";
        return updated;
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 text-gray-800 dark:text-zinc-300 font-sans transition-colors duration-200">
      
      {/* Chat History Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 custom-scrollbar">
        
        {/* Empty State */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-zinc-900 flex items-center justify-center border border-gray-200 dark:border-zinc-800">
              <Sparkles size={32} className="text-sky-600 dark:text-sky-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-200">AI Assistant</h3>
              <p className="text-sm text-gray-500 dark:text-zinc-500 max-w-xs mt-1">
                Ask for hints, complexity analysis, or help debugging your code.
              </p>
            </div>
          </div>
        )}

        {/* Message List */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex w-full gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            } animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            {/* Avatar */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border
                ${msg.role === "user" 
                  ? "bg-sky-600 border-sky-500 text-white" 
                  : "bg-gray-100 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-emerald-600 dark:text-emerald-400"
                }`}
            >
              {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>

            {/* Bubble */}
            <div
              className={`relative max-w-[85%] px-4 py-3 text-sm leading-relaxed shadow-sm
                ${msg.role === "user"
                  ? "bg-sky-600 text-white rounded-2xl rounded-tr-none"
                  : "bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 rounded-2xl rounded-tl-none"
                }`}
            >
              <div className="whitespace-pre-wrap font-sans">
                {msg.text || (
                  <div className="flex items-center gap-2 text-gray-400 dark:text-zinc-500">
                    <Loader2 size={14} className="animate-spin" />
                    <span>Thinking...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
        <div className="relative flex items-center">
          <input
            className="w-full bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-zinc-200 text-sm rounded-full pl-5 pr-12 py-3.5 border border-gray-200 dark:border-zinc-800 focus:border-sky-500 dark:focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 outline-none transition-all placeholder:text-gray-500 dark:placeholder:text-zinc-600"
            placeholder="Ask a question about this problem..."
            value={input}
            disabled={isStreaming}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className={`absolute right-2 p-2 rounded-full transition-all duration-200
              ${input.trim() 
                ? "bg-sky-600 text-white hover:bg-sky-500 shadow-lg shadow-sky-500/20" 
                : "bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 cursor-not-allowed"
              }`}
            disabled={!input.trim() || isStreaming}
            onClick={sendMessage}
          >
            <Send size={16} className={input.trim() ? "ml-0.5" : ""} />
          </button>
        </div>
        <div className="text-center mt-2">
           <p className="text-[10px] text-gray-400 dark:text-zinc-600">
             AI can make mistakes. Verify code before submitting.
           </p>
        </div>
      </div>
    </div>
  );
};

export default AiChat;