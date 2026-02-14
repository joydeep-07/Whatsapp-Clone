import { MoreVertical, Smile, Paperclip, Mic, CheckCheck } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AiLogo from "./AiLogo";
import { IoSend } from "react-icons/io5";
import { ENDPOINTS } from "../api/endPoint";
import ChatMenu from "./ChatMenu";
import { MdVerified } from "react-icons/md";

const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  /* ===============================
     Auto Scroll
  =============================== */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ===============================
     Format Markdown Message
  =============================== */
  const renderFormattedMessage = (text) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, children, ...props }) {
            const [copied, setCopied] = React.useState(false);
            const codeText = String(children).replace(/\n$/, "");

            const handleCopy = async () => {
              try {
                await navigator.clipboard.writeText(codeText);
                setCopied(true);

                setTimeout(() => {
                  setCopied(false);
                }, 2000); 
              } catch (err) {
                console.error("Copy failed:", err);
              }
            };

            return !inline ? (
              <div className="relative my-3 group">
                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 text-xs px-2 py-1 rounded-sm
                   bg-[var(--code-bg)] border border-[var(--border-light)] 
                   transition text-[var(--text-secondary)]"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>

                <pre className="bg-[var(--code-bg)]/50 text-[var(--code-text)] p-4 pt-8 rounded-lg overflow-x-auto text-xs">
                  <code {...props}>{codeText}</code>
                </pre>
              </div>
            ) : (
              <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-xs">
                {children}
              </code>
            );
          },

          ul: ({ children }) => (
            <ul className="list-disc ml-5 space-y-1 my-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-5 space-y-1 my-2">{children}</ol>
          ),
          p: ({ children }) => (
            <p className="mb-2 leading-relaxed">{children}</p>
          ),
          h1: ({ children }) => (
            <h1 className="text-lg font-semibold my-2">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-semibold my-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold my-2">{children}</h3>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    );
  };

  /* ===============================
     Send Message
  =============================== */
  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: inputValue,
      isOwn: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
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
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, aiReply]);
      }
    } catch (error) {
      console.error("AI Error:", error);
    }
  };

  /* ===============================
     Fetch Chat History
  =============================== */
  useEffect(() => {
    const fetchHistory = async () => {
      try {
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
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }));

          setMessages(formatted);
        }
      } catch (err) {
        console.error("History Error:", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="h-screen flex bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden">
      <div className="flex flex-col w-full">
        {/* ===============================
           TOP BAR
        =============================== */}
        <div className="shrink-0 px-4 py-3 border-b border-[var(--border-light)]/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AiLogo />
              <div className="leading-tight">
                <h1 className="text-sm font-medium flex justify-start gap-2 items-center">
                  Meta AI <MdVerified className=" text-[var(--accent-blue)] " />
                </h1>
                <p className="text-xs text-[var(--text-muted)]">
                  AI assistant • Powered by Meta
                </p>
              </div>
            </div>
            <ChatMenu onChatDeleted={() => setMessages([])} />
          </div>
        </div>

        {/* ===============================
           CHAT BODY
        =============================== */}
        <div className="flex-1 overflow-y-auto  bg-[var(--bg-secondary)]/30 px-6 py-6 space-y-4">
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
                {msg.isOwn ? (
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                ) : (
                  renderFormattedMessage(msg.text)
                )}

                <div className="flex items-center gap-1 text-xs mt-2 justify-end opacity-70">
                  {msg.time}
                  {msg.isOwn && (
                    <CheckCheck size={14} className="text-blue-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* ===============================
           INPUT BAR
        =============================== */}
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
                className="cursor-pointer text-xl text-[var(--text-secondary)]/70"
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
