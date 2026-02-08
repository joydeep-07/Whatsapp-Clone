import React, { useState } from "react";
import SidePanel from "./SidePanel";
import Chatlist from "../ui/Chatlist";
import Profile from "../ui/Profile";
import Settings from "../ui/Settings";
import Status from "../ui/Status";
import Chat from "./Chat";

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState("chats");

  const renderPanel = () => {
    switch (activePanel) {
      case "chats":
        return <Chatlist />;
      case "status":
        return <Status />;
      case "settings":
        return <Settings />;
      case "profile":
        return <Profile />;
      default:
        return <Chatlist />;
    }
  };

  return (
    <div className="flex">
      <SidePanel setActivePanel={setActivePanel} />

      <div className="left bg-[var(--bg-main)] h-screen w-1/4">
        {renderPanel()}
      </div>

      <div className="right h-screen w-3/4 bg-[var(--bg-main)]">
        <Chat />
      </div>
    </div>
  );
};

export default Dashboard;
