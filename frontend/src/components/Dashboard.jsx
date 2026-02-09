import React, { useState } from "react";
import SidePanel from "./SidePanel";
import Chatlist from "../ui/Chatlist";
import Profile from "../ui/Profile";
import Settings from "../ui/Settings";
import Status from "../ui/Status";
import Chat from "../ui/Chat";
import SelectChat from "./SelectChat";

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState("chats");
  const [selectedUser, setSelectedUser] = useState(null);

  const renderPanel = () => {
    switch (activePanel) {
      case "chats":
        return <Chatlist onSelectUser={setSelectedUser} />;
      case "status":
        return <Status />;
      case "settings":
        return <Settings />;
      case "profile":
        return <Profile />;
      default:
        return <Chatlist onSelectUser={setSelectedUser} />;
    }
  };


  return (
    <div className="flex">
      <SidePanel setActivePanel={setActivePanel} />

      <div className="left bg-[var(--bg-main)] h-screen w-1/4">
        {renderPanel()}
      </div>

      <div className="right h-screen w-3/4 bg-[var(--bg-main)]">
        {selectedUser ? (
          <Chat user={selectedUser} />
        ) : (
         <>
         <SelectChat/>
         </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
