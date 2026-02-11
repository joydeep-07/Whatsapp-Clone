import {
  CheckCheck,
  CirclePlus,
  EllipsisVertical,
  Search,
  User,
} from "lucide-react";
import React, { useState } from "react";
import users from "../assets/users"; // ← assuming this is your static array
import MyContacts from "./MyContacts";
import AiLogo from "../ai/AiLogo";

const Chatlist = ({
  onSelectUser,
  onAddContact,
  onOpenAiChat,
  onContactClick,
}) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // ← added

  const handleSelectUser = (user) => {
    setSelectedUserId(user.id);
    onSelectUser(user);
  };

  // Filter users based on name OR email
  const filteredUsers = users.filter((user) => {
    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase().trim();

    const nameMatch = user.name?.toLowerCase().includes(term);
    const emailMatch = user.email?.toLowerCase().includes(term); // works if email exists

    return nameMatch || emailMatch;
  });

  return (
    <div className="h-screen relative flex flex-col bg-[var(--bg-main)] text-[var(--text-main)]">
      {/* Fixed header section – unchanged */}
      <div className="shrink-0 px-4 pt-5 pb-4 space-y-4 border-b border-[var(--border-light)]">
        <div className="flex items-center justify-between">
          <h1 className="font-body text-xl tracking-wider">Chats</h1>

          <div className="flex items-center gap-5 text-[var(--text-secondary)]">
            <button onClick={onAddContact}>
              <CirclePlus className="w-6 h-6 cursor-pointer hover:text-[var(--accent-primary)] transition-colors" />
            </button>
            <EllipsisVertical className="w-6 h-6 cursor-pointer hover:text-[var(--accent-primary)] transition-colors" />
          </div>
        </div>

        {/* Search – now controlled + real filtering */}
        <div className="flex items-center border border-[var(--border-light)] pl-4 gap-3 h-10 rounded-full bg-[var(--bg-tertiary)]/40 overflow-hidden">
          <Search className="text-[var(--text-muted)]" size={18} />
          <input
            type="text"
            placeholder="Search name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 h-full bg-transparent outline-none text-[var(--text-secondary)] placeholder-[var(--text-muted)] text-sm"
          />
        </div>

        {/* Filter badges – unchanged */}
        <div className="flex gap-2 flex-wrap">
          <button className="py-1 px-4 rounded-full text-xs font-medium bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
            All
          </button>
          <button className="py-1 px-4 rounded-full text-xs font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-light)]">
            Unread
          </button>
          <button className="py-1 px-4 rounded-full text-xs font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-light)]">
            Group
          </button>
        </div>
      </div>

      {/* Users list – now shows filteredUsers */}
      <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-[var(--scroll-thumb)] scrollbar-track-transparent">
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[var(--text-muted)] text-sm">
            No matching contacts
          </div>
        ) : (
          filteredUsers.map((user) => {
            const isSelected = selectedUserId === user.id;

            return (
              <div
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className={`
                  flex items-center gap-4 py-3 px-3 -mx-3 cursor-pointer transition-colors
                  ${
                    isSelected
                      ? "bg-[var(--bg-tertiary)]/50"
                      : "hover:bg-[var(--bg-tertiary)]/30"
                  }
                `}
              >
                {/* Avatar – unchanged */}
                <div className="relative">
                  {user.profile ? (
                    <img
                      src={user.profile}
                      alt={user.name}
                      className="h-12 w-12 rounded-full object-cover border border-[var(--border-light)]"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center border border-[var(--border-light)]">
                      <User />
                    </div>
                  )}

                  {user.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-[var(--success)] rounded-full border-2 border-[var(--bg-main)]" />
                  )}
                </div>

                {/* Name + message – unchanged */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold truncate">{user.name}</h2>
                  <p className="text-sm text-[var(--text-secondary)] truncate flex items-center gap-1">
                    {!user.isUnread && (
                      <CheckCheck
                        size={16}
                        className={
                          user.isSeen
                            ? "text-[var(--accent-blue)]"
                            : "text-[var(--text-secondary)]"
                        }
                      />
                    )}
                    {user.message}
                  </p>
                </div>

                {/* Unread badge – unchanged */}
                {user.isUnread && (
                  <span className="ml-auto min-w-[20px] h-[20px] flex items-center justify-center text-[11px] font-bold bg-[var(--success)] text-[var(--bg-main)] rounded-full">
                    2
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Floating buttons – unchanged */}
      <div className="absolute bottom-10 right-6 flex flex-col items-center justify-center gap-4">
        <div onClick={onOpenAiChat} className="cursor-pointer">
          <AiLogo />
        </div>
        <div onClick={onContactClick}>
          <MyContacts />
        </div>
      </div>
    </div>
  );
};

export default Chatlist;
