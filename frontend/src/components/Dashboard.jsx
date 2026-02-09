import React, { useState } from "react";
import SidePanel from "./SidePanel";
import Chatlist from "../ui/Chatlist";
import Profile from "../ui/Profile";
import Settings from "../ui/Settings";
import Status from "../ui/Status";
import Chat from "../ui/Chat";
import SelectChat from "./SelectChat";
import AddContact from "../ui/AddContact";

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState("chats"); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [rightView, setRightView] = useState("empty"); 

  const renderLeftPanel = () => {
    switch (activePanel) {
      case "chats":
        return (
          <Chatlist
            onSelectUser={(user) => {
              setSelectedUser(user);
              setRightView("chat");
            }}
            onAddContact={() => {
              setSelectedUser(null);
              setRightView("addContact");
            }}
          />
        );
      case "status":
        return <Status />;
      case "settings":
        return <Settings />;
      case "profile":
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <SidePanel setActivePanel={setActivePanel} />

      {/* LEFT */}
      <div className="w-1/4 h-screen bg-[var(--bg-main)]">
        {renderLeftPanel()}
      </div>

      {/* RIGHT */}
      <div className="w-3/4 h-screen bg-[var(--bg-main)]">
        {rightView === "chat" && selectedUser && <Chat user={selectedUser} />}

        {rightView === "addContact" && <AddContact />}

        {rightView === "empty" && <SelectChat />}
      </div>
    </div>
  );
};

export default Dashboard;
