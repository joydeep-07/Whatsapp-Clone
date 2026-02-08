import {
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
  Send,
  Check,
  CheckCheck,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const Chat = () => {
  const user = {
    id: 1,
    name: "John Doe",
    profile:
      "https://i.pinimg.com/736x/19/1c/c9/191cc99599578fb10a08289d42471cad.jpg",
    isOnline: true,
  };

  // Messages state
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! Are you building the WhatsApp clone today?",
      isOwn: false,
    },
    {
      id: 2,
      text: "Yep 😄 almost done!",
      isOwn: true,
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  // Ref for auto scroll
  const messagesEndRef = useRef(null);

  // Auto scroll when new message comes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: inputValue,
        isOwn: true,
      },
    ]);

    setInputValue("");
  };

  return (
    <div className="h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)]">
      {/* TOP BAR */}
      <div className="shrink-0 bg-[var(--bg-secondary)]/30 px-4 py-3 border-b border-[var(--border-light)]/60">
        <div className="flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <img
              src={user.profile}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover border border-[var(--border-light)]"
            />
            <div className="leading-tight">
              <h1 className="text-sm font-medium">{user.name}</h1>
              <p className="text-xs text-[var(--text-muted)] font-medium">
                {user.isOnline ? "online" : "last seen recently"}
              </p>
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-6 text-[var(--text-secondary)]">
            <Video className="cursor-pointer hover:text-[var(--accent-primary)] transition-colors" />
            <Phone className="cursor-pointer hover:text-[var(--accent-primary)] transition-colors" />
            <MoreVertical className="cursor-pointer hover:text-[var(--accent-primary)] transition-colors" />
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
              className={`max-w-[70%] px-4 py-2.5 flex gap-1 items-end rounded-2xl text-sm shadow-sm ${
                msg.isOwn
                  ? "bg-[#d9fdd3] dark:bg-[#005c4b] rounded-br-none text-black dark:text-white"
                  : "bg-white dark:bg-[#202c33] rounded-bl-none text-black dark:text-white"
              }`}
            >
              {msg.text}{" "}
              {msg.isOwn && (
                <CheckCheck size={15} className="text-[var(--accent-blue)] " />
              )}
            </div>
          </div>
        ))}

        {/* Auto scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* BOTTOM INPUT BAR */}
      <div className="shrink-0 border-t border-[var(--border-light)] bg-[var(--bg-main)] px-4 py-3">
        <div className="flex items-center gap-3 bg-[var(--bg-secondary)] rounded-3xl px-4 py-[10px]">
          <button className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]">
            <Smile size={18} />
          </button>

          <button className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]">
            <Paperclip size={18} />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-[15px] text-[var(--text-main)] placeholder-[var(--text-muted)]"
          />

          {inputValue.trim() ? (
            <button
              onClick={sendMessage}
              className="text-[var(--accent-primary)] hover:scale-110 transition-transform"
            >
              <Send size={18} fill="currentColor" />
            </button>
          ) : (
            <button className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]">
              <Mic size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
