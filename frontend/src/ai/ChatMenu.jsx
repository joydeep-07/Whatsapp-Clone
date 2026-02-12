import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Download, Trash2 } from "lucide-react";
import gsap from "gsap";
import { ENDPOINTS } from "../api/endPoint";
import DeleteModal from "../components/DeleteModal"; 

const ChatMenu = ({ onChatDeleted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const menuRef = useRef(null);
  const btnRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        btnRef.current &&
        !btnRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // GSAP Animation
  useEffect(() => {
    if (!menuRef.current) return;

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      menuRef.current,
      { opacity: 0, scale: 0.92, y: -8 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.22,
        ease: "power2.out",
      },
    ).fromTo(
      ".menu-item",
      { y: -6, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.24,
        stagger: 0.06,
        ease: "power2.out",
      },
      "-=0.18",
    );

    if (isOpen) {
      tl.play();
    } else {
      tl.reverse();
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  const handleExport = () => {
    console.log("Export chat");
    setIsOpen(false);
  };

  // DELETE FUNCTION 
  const confirmDeleteChat = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(ENDPOINTS.CHAT_DELETE, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      const data = await response.json();

      if (data.success) {
        console.log("Chat deleted successfully");
        onChatDeleted?.();
      } else {
        alert(data.message || "Failed to delete chat");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Server error while deleting chat");
    }

    setShowDeleteModal(false);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative inline-block">
        <button
          ref={btnRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-1.5 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors duration-[var(--transition-base)]"
        >
          <MoreVertical size={20} className="text-[var(--text-muted)]" />
        </button>

        {isOpen && (
          <div
            ref={menuRef}
            className="absolute right-0 top-full mt-1.5 w-52 bg-[var(--bg-main)] border border-[var(--border-light)] rounded-lg overflow-hidden z-50 origin-top-right"
            style={{ opacity: 0 }}
          >
            <div className="py-1">
              <button
                onClick={handleExport}
                className="menu-item group flex w-full items-center gap-3 px-4 py-2.5 text-left text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <Download size={18} />
                <span>Export chat</span>
              </button>

              <div className="h-px bg-[var(--border-light)] mx-2 my-1" />

              <button
                onClick={() => {
                  setShowDeleteModal(true);
                  setIsOpen(false);
                }}
                className="menu-item group flex w-full items-center gap-3 px-4 py-2.5 text-left text-[var(--error)] hover:bg-[var(--error)/0.08] transition-colors"
              >
                <Trash2 size={18} />
                <span>Delete chat</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <DeleteModal
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={confirmDeleteChat}
          />
        </div>
      )}
    </>
  );
};

export default ChatMenu;
