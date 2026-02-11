import React from "react";
import { CircleDashed, MessageSquare, Settings, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const SidePanel = ({ setActivePanel }) => {
  return (
    <div className="sidepanel bg-[var(--bg-secondary)] h-screen w-15 flex flex-col justify-between py-10">
      {/* TOP */}
      <div className="flex flex-col items-center gap-5">
        <button onClick={() => setActivePanel("chats")}>
          <MessageSquare />
        </button>

        {/* <button onClick={() => setActivePanel("status")}>
          <CircleDashed />
        </button> */}
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col items-center gap-5">
        <ThemeToggle />

        <button onClick={() => setActivePanel("profile")}>
          <User />
        </button>

        <button onClick={() => setActivePanel("settings")}>
          <Settings />
        </button>
      </div>
    </div>
  );
};

export default SidePanel;
