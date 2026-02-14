import React, { useState } from "react";
import SidePanel from "./SidePanel";
import Chatlist from "../ui/Chatlist";
import Profile from "../ui/Profile";
import Settings from "../ui/Settings";
import Status from "../ui/Status";
import Chat from "../ui/Chat";
import SelectChat from "./SelectChat";
import AddContact from "../ui/AddContact";
import AiChat from "../ai/AiChat";
import AllContacts from "../ui/AllContacts";

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
            onOpenAiChat={() => {
              setSelectedUser(null);
              setRightView("ai");
            }}
            onContactClick={() => setActivePanel("contacts")} 
          />
        );
      case "status":
        return <Status />;
      case "settings":
        return <Settings />;
      case "profile":
        return <Profile />;
      case "contacts":
        return <AllContacts />;
      default:
        return null;
    }
  };


  return (
    <div className="flex h-screen overflow-hidden">
      {/* SidePanel - Hidden on small screens */}
      <div className="hidden md:block">
        <SidePanel setActivePanel={setActivePanel} />
      </div>

      {/* LEFT PANEL */}
      <div
        className={`
        bg-[var(--bg-main)] h-full
        w-full md:w-1/3 lg:w-1/4
        ${rightView === "chat" ? "hidden md:block" : "block"}
      `}
      >
        {renderLeftPanel()}
      </div>

      {/* RIGHT PANEL */}
      <div
        className={`
        bg-[var(--bg-main)] h-full
        w-full md:w-2/3 lg:w-3/4
        ${rightView === "chat" ? "block" : "hidden md:block"}
      `}
      >
        {rightView === "chat" && selectedUser && (
          <Chat
            user={selectedUser}
            onBack={() => {
              setRightView("empty");
              setSelectedUser(null);
            }}
          />
        )}

        {rightView === "addContact" && <AddContact />}
        {rightView === "ai" && <AiChat />}
        {rightView === "empty" && <SelectChat />}
      </div>
    </div>
  );

};

export default Dashboard;
