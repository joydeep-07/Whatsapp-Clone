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
import { BASE_URL } from "../api/endPoint";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const Chat = ({ user }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isContactOpen, setIsContactOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const chatAreaRef = useRef(null);
  const firstRender = useRef(true);

  /* =========================
     SCROLL TO BOTTOM
  ========================= */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* =========================
     ANIMATION (UNCHANGED)
  ========================= */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (chatAreaRef.current) {
      gsap.to(chatAreaRef.current, {
        width: isContactOpen ? "70%" : "100%",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [isContactOpen]);

  /* =========================
     SOCKET JOIN
  ========================= */
  useEffect(() => {
    if (loggedInUser?._id) {
      socket.emit("join", loggedInUser._id);
    }
  }, []);

  /* =========================
     RECEIVE MESSAGE
  ========================= */
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: message.text,
          isOwn: message.sender === loggedInUser._id,
        },
      ]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  /* =========================
     CREATE OR LOAD CHAT
  ========================= */
  useEffect(() => {
    if (!user || !loggedInUser) return;

    const createChat = async () => {
      const res = await fetch(`${BASE_URL}/api/chat/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user._id }),
      });

      const data = await res.json();
      setChatId(data.chat._id);

      // Load messages
      const msgRes = await fetch(`${BASE_URL}/api/chat/${data.chat._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const msgData = await msgRes.json();

      const formatted = msgData.messages.map((msg) => ({
        id: msg._id,
        text: msg.text,
        isOwn: msg.sender._id === loggedInUser._id,
      }));

      setMessages(formatted);
    };

    createChat();
  }, [user]);

  /* =========================
     SEND MESSAGE
  ========================= */
  const sendMessage = async () => {
    if (!inputValue.trim() || !chatId) return;

    const messageText = inputValue;

    // Save to DB
    await fetch(`${BASE_URL}/api/chat/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        chatId,
        text: messageText,
      }),
    });

    // Emit realtime
    socket.emit("sendMessage", {
      senderId: loggedInUser._id,
      receiverId: user._id,
      text: messageText,
    });

    // Update UI instantly
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: messageText,
        isOwn: true,
      },
    ]);

    setInputValue("");
  };

  /* =========================
     NO USER SELECTED
  ========================= */
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-[var(--text-muted)]">
        Select a chat to start messaging
      </div>
    );
  }

  /* =========================
     UI (UNCHANGED)
  ========================= */
  return (
    <div className="h-screen flex bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden">
      <div
        ref={chatAreaRef}
        className="flex flex-col bg-[var(--bg-secondary)]/50 w-full"
      >
        {/* TOP BAR */}
        <div className="shrink-0 bg-[var(--bg-main)] px-4 py-3 border-b border-[var(--border-light)]/60">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setIsContactOpen((p) => !p)}
            >
              {user.profilePic ? (
                <img
                  src={`${BASE_URL}${user.profilePic}`}
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

      <ContactInfo
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        user={user}
      />
    </div>
  );
};

export default Chat;
