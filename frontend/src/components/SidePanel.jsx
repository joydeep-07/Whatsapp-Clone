import React from "react";
import { CircleDashed, MessageSquare, Phone, Settings, User } from "lucide-react";

const SidePanel = () => {
  return (
    <div className="sidepanel absolute bg-[var(--bg-secondary)] h-screen w-15 flex flex-col justify-between py-10">
      {/* TOP SET */}
      <div className="flex flex-col items-center gap-5">
        <button>
          <MessageSquare />
        </button>
        <button>
          <Phone />
        </button>
        <button>
          <CircleDashed />
        </button>
      </div>

      {/* BOTTOM SET */}
      <div className="flex flex-col items-center gap-5">
      
        <button>
          <Settings />
        </button>
        <button>
          <User />
        </button>
      </div>
    </div>
  );
};

export default SidePanel;
