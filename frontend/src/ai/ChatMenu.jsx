import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Download, Trash2 } from "lucide-react";
import gsap from "gsap";

const ChatMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

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

  // GSAP animation
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

    // Cleanup
    return () => {
      tl.kill();
    };
  }, [isOpen]);

  const handleExport = () => {
    console.log("Export chat");
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm("Delete this chat? This action cannot be undone.")) {
      console.log("Delete chat confirmed");
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Trigger button */}
      <button
        ref={btnRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-1.5 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors duration-[var(--transition-base)]"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <MoreVertical size={20} className="text-[var(--text-muted)]" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={menuRef}
          className={`
            absolute right-0 top-full mt-1.5 w-52
            bg-[var(--bg-main)] 
            border border-[var(--border-light)]
            rounded-lg
            overflow-hidden z-50
            origin-top-right
          `}
          style={{ opacity: 0 }}
        >
          <div className="py-1">
            <button
              onClick={handleExport}
              className="menu-item group flex w-full items-center gap-3 px-4 py-2.5 text-left text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <Download
                size={18}
                className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)]"
              />
              <span>Export chat</span>
            </button>

            <div className="h-px bg-[var(--border-light)] mx-2 my-1" />

            <button
              onClick={handleDelete}
              className="menu-item group flex w-full items-center gap-3 px-4 py-2.5 text-left text-[var(--error)] hover:bg-[var(--error)/0.08] transition-colors"
            >
              <Trash2 size={18} className="text-[var(--error)]" />
              <span>Delete chat</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMenu;
