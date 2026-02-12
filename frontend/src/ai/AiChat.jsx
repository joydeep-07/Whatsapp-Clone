import {
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
  CheckCheck,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import AiLogo from "./AiLogo";
import { IoSend } from "react-icons/io5";
import {ENDPOINTS} from "../api/endPoint";
import ChatMenu from "./ChatMenu";

const AiChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! I'm Meta AI, ask me anything 😄",
      isOwn: false,
    },
    {
      id: 2,
      text: "Can you help me write a cool React component?",
      isOwn: true,
    },
    {
      id: 3,
      text: "Sure! What kind of component are you looking for? 🚀",
      isOwn: false,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 const sendMessage = async () => {
   if (!inputValue.trim()) return;

   const userMsg = {
     id: Date.now(),
     text: inputValue,
     isOwn: true,
   };

   setMessages((prev) => [...prev, userMsg]);
   setInputValue("");

   try {
     const res = await fetch(ENDPOINTS.CHAT_SEND, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
       body: JSON.stringify({ message: userMsg.text }),
     });

     const data = await res.json();

     if (data.success) {
       const aiReply = {
         id: Date.now() + 1,
         text: data.reply,
         isOwn: false,
       };

       setMessages((prev) => [...prev, aiReply]);
     }
   } catch (error) {
     console.error("AI Error:", error);
   }
 };

 useEffect(() => {
   const fetchHistory = async () => {
     const res = await fetch(ENDPOINTS.CHAT_HISTORY, {
       headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
     });

     const data = await res.json();

     if (data.success) {
       const formatted = data.messages.map((msg, index) => ({
         id: index,
         text: msg.content,
         isOwn: msg.role === "user",
       }));

       setMessages(formatted);
     }
   };

   fetchHistory();
 }, []);



  return (
    <div className="h-screen flex bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden">
      {/* CHAT AREA — full width (no right panel for AI) */}
      <div className="flex flex-col w-full">
        {/* TOP BAR */}
        <div className="shrink-0 bg-[var(--bg-secondary)]/30 px-4 py-3 border-b border-[var(--border-light)]/60">
          <div className="flex items-center justify-between">
            {/* LEFT — Meta AI avatar + name */}
            <div className="flex items-center gap-3">
              {/* Meta AI gradient avatar */}
              <AiLogo />

              <div className="leading-tight">
                <h1 className="text-sm font-medium">Meta AI</h1>
                <p className="text-xs text-[var(--text-muted)]">
                  AI assistant • Powered by Meta
                </p>
              </div>
            </div>

            {/* RIGHT — icons */}
            <div className="flex items-center gap-6 text-[var(--text-secondary)]">
              <ChatMenu onChatDeleted={() => setMessages([])} />
            </div>
          </div>
        </div>

        {/* CHAT BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                  msg.isOwn
                    ? "bg-[#d9fdd3] dark:bg-[#005c4b] rounded-br-none"
                    : "bg-white dark:bg-[#202c33] rounded-bl-none"
                }`}
              >
                {msg.text}
                <div className="flex items-center gap-1 text-xs mt-1 justify-end opacity-70">
                  08:24 PM
                  {msg.isOwn && (
                    <CheckCheck size={14} className="text-blue-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT BAR — same style */}
        <div className="shrink-0 border-t border-[var(--border-light)] bg-[var(--bg-main)] px-4 py-3">
          <div className="flex items-center gap-3 border border-[var(--border-light)] rounded-3xl px-4 py-[10px]">
            <Smile size={18} />
            <Paperclip size={18} />

            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask Meta AI anything..."
              className="flex-1 bg-transparent outline-none"
            />

            {inputValue.trim() ? (
              <IoSend
                onClick={sendMessage}
                className="cursor-pointer text-xl text-[var(--text-secondary)]/70 "
              />
            ) : (
              <Mic />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
