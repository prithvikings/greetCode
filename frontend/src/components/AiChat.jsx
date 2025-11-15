import React, { useState, useRef, useEffect } from "react";
import axiosClient from "../utils/axiosClient";

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
    <div className="flex flex-col h-[500px] rounded-xl border bg-base-100 shadow-md overflow-hidden">

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-2 space-y-6">

        {messages.length === 0 && (
          <div className="text-center text-base text-gray-500 mt-10">
            Ask anything about this problem…
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat ${
              msg.role === "user" ? "chat-end" : "chat-start"
            }`}
          >
            {/* Avatar */}
            <div className="chat-image avatar">
              <div className="w-10 rounded-full shadow">
                <img
                  src={
                    msg.role === "user"
                      ? "https://img.daisyui.com/images/profile/demo/gupta@192.webp"
                      : "https://img.daisyui.com/images/profile/demo/robot@192.webp"
                  }
                />
              </div>
            </div>

            {/* Header */}
            <div className="chat-header font-medium">
              {msg.role === "user" ? "You" : "AI Tutor"}
            </div>

            {/* Bubble */}
            <div
              className={`chat-bubble max-w-[80%] leading-relaxed text-[15px] ${
                msg.role === "user"
                  ? "chat-bubble-primary text-white"
                  : "chat-bubble-accent"
              }`}
            >
              {msg.text || (
                <span className="loading loading-dots loading-md"></span>
              )}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Bar (Fixed bottom, like ChatGPT) */}
      <div className="p-3 border-t bg-base-200 flex items-center gap-2">
        <input
          className="input input-bordered w-full"
          placeholder="Message AI…"
          value={input}
          disabled={isStreaming}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="btn btn-primary px-5"
          disabled={isStreaming}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AiChat;
