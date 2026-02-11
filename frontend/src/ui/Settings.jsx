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
  User,
} from "lucide-react";
import Logout from "../components/Logout";
import { useSelector, useDispatch } from "react-redux";

const Settings = () => {

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  

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
               <div className="flex mb-5 items-center border border-[var(--border-light)] pl-4 gap-3 h-10 rounded-full bg-[var(--bg-tertiary)]/40 overflow-hidden">
                 <Search className="text-[var(--text-muted)]" size={18} />
                 <input
                   type="text"
                   placeholder="Search"
                   className="flex-1 h-full bg-transparent outline-none text-[var(--text-secondary)] placeholder-[var(--text-muted)] text-sm"
                 />
               </div>

        {/* Profile Section */}
        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-6">
          {!user.profilePic ? (
            <div className="h-14 w-14 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center border border-[var(--border-light)]">
              <User />
            </div>
          ) : (
            <img
              src={
                user?.profilePic
                  ? user.profilePic.startsWith("http") ||
                    user.profilePic.startsWith("blob:")
                    ? user.profilePic
                    : `http://localhost:3000${user.profilePic}`
                  : "https://via.placeholder.com/150"
              }
              alt="profile"
              className="w-14 h-14 rounded-full object-cover"
            />
          )}

          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-[var(--text-muted)]">
              {user.about || "Hey there! I am using WhatsApp."}
            </p>
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
        <Logout />
      </div>
    </div>
  );
};

export default Settings;
