import {
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
  Send,
  CheckCheck,
  User,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import ContactInfo from "./ContactInfo";
import { gsap } from "gsap";

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! Are you building the WhatsApp clone today?",
      isOwn: false,
    },
    { id: 2, text: "Yep 😄 almost done!", isOwn: true },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const chatAreaRef = useRef(null);

  // Skip animation on first render
  const firstRender = useRef(true);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Animate chat width when ContactInfo opens/closes, skip first render
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return; // Do nothing on first render
    }

    if (chatAreaRef.current) {
      gsap.to(chatAreaRef.current, {
        width: isContactOpen ? "70%" : "100%",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [isContactOpen]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: inputValue, isOwn: true },
    ]);
    setInputValue("");
  };

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-[var(--text-muted)]">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden">
      {/* CHAT AREA */}
      <div
        ref={chatAreaRef}
        className={`flex flex-col bg-[var(--bg-secondary)]/50 w-full`}
      >
        {/* TOP BAR */}
        <div className="shrink-0 bg-[var(--bg-main)] px-4 py-3 border-b border-[var(--border-light)]/60">
          <div className="flex items-center justify-between">
            {/* LEFT */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setIsContactOpen((p) => !p)}
            >
              {user.profile ? (
                <img
                  src={user.profile}
                  alt={user.name}
                  className="h-12 w-12 rounded-full object-cover border border-[var(--border-light)]"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                  <User />
                </div>
              )}
              <div className="leading-tight">
                <h1 className="text-sm font-medium">{user.name}</h1>
                <p className="text-xs text-[var(--text-muted)]">
                  {user.isOnline ? "online" : "last seen recently"}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-6 text-[var(--text-secondary)]">
              <Video className="cursor-pointer" />
              <Phone className="cursor-pointer" />
              <MoreVertical className="cursor-pointer" />
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
                className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm text-[var(--text-secondary)] shadow-sm ${
                  msg.isOwn
                    ? "bg-[var(--bg-chat)] rounded-br-none"
                    : "bg-[var(--bg-other-chat)] rounded-bl-none"
                }`}
              >
                {msg.text}
                <div className="flex items-center gap-1 text-xs mt-1 justify-end">
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

        {/* INPUT */}
        <div className="shrink-0 border-t border-[var(--border-light)] bg-[var(--bg-main)] px-4 py-3">
          <div className="flex items-center gap-3 border border-[var(--border-light)] rounded-3xl px-4 py-[10px]">
            <Smile size={18} />
            <Paperclip size={18} />
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none"
            />
            {inputValue.trim() ? (
              <Send
                onClick={sendMessage}
                className="cursor-pointer text-[var(--accent-primary)]"
              />
            ) : (
              <Mic />
            )}
          </div>
        </div>
      </div>

      {/* CONTACT INFO */}
      <ContactInfo
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        user={user}
      />
    </div>
  );
};

export default Chat;
