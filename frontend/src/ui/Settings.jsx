import {
  Search,
  RefreshCcw,
  Monitor,
  KeyRound,
  Lock,
  MessageSquare,
  Video,
  Bell,
  Keyboard,
  HelpCircle,
  LogOut,
} from "lucide-react";
import Logout from "../components/Logout";

const Settings = () => {
  const user = {
    name: "Paul",
    about: "PotterHead ⚡",
    profile:
      "https://i.pinimg.com/736x/da/59/64/da59647bd31dd524c09991cb89949804.jpg",
  };

  const settingsItems = [
    {
      icon: <RefreshCcw size={20} />,
      title: "Syncing older messages",
      subtitle: "0% complete",
    },
   
   
    {
      icon: <Lock size={20} />,
      title: "Privacy",
      subtitle: "Blocked contacts, disappearing messages",
    },
    {
      icon: <MessageSquare size={20} />,
      title: "Chats",
      subtitle: "Theme, wallpaper, chat settings",
    },
   
    {
      icon: <Bell size={20} />,
      title: "Notifications",
      subtitle: "Message notifications",
    },
    {
      icon: <Keyboard size={20} />,
      title: "Keyboard shortcuts",
      subtitle: "Quick actions",
    },
   
  ];

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <div className="h-full w-full flex flex-col bg-[var(--bg-main)] text-[var(--text-main)]">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <h2 className="text-xl font-medium font-heading mb-6">Settings</h2>

        {/* Search */}
        <div className="relative mb-6">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="text"
            placeholder="Search settings"
            className="w-full pl-10 pr-4 py-3 rounded-full 
                       bg-[var(--bg-tertiary)] 
                       text-[var(--text-main)] 
                       placeholder:text-[var(--text-muted)]
                       focus:outline-none"
          />
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.profile}
            alt="profile"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-[var(--text-muted)]">{user.about}</p>
          </div>
        </div>

        <div className="border-b border-[var(--border-light)] mb-4"></div>

        {/* Settings List */}
        <div className="space-y-1">
          {settingsItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-3 rounded-lg cursor-pointer
                         hover:bg-[var(--bg-tertiary)]
                         transition-[var(--transition-fast)]"
            >
              <div className="text-[var(--text-secondary)] mt-1">
                {item.icon}
              </div>

              <div>
                <p className="text-sm">{item.title}</p>
                <p className="text-xs text-[var(--text-muted)]">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Section (Sticky Bottom) */}
      <div className="p-6 ">
       <Logout/>
      </div>
    </div>
  );
};

export default Settings;
