import { CheckCheck, CirclePlus, EllipsisVertical, Search, User } from "lucide-react";
import React from "react";
import users from "../assets/users";

const Chatlist = ({ onSelectUser }) => {
  return (
    <div className="h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)]">
      {/* Fixed header section */}
      <div className="shrink-0 px-4 pt-5 pb-4 space-y-4 border-b border-[var(--border-light)]">
        {/* Title + actions */}
        <div className="flex items-center justify-between">
          <h1 className="font-body text-xl tracking-wider">Chats</h1>
          <div className="flex items-center gap-5 text-[var(--text-secondary)]">
            <CirclePlus className="w-6 h-6 cursor-pointer hover:text-[var(--accent-primary)] transition-colors" />
            <EllipsisVertical className="w-6 h-6 cursor-pointer hover:text-[var(--accent-primary)] transition-colors" />
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center border border-[var(--border-light)] pl-4 gap-3 h-10 rounded-full bg-[var(--bg-tertiary)]/40 overflow-hidden">
          <Search className="text-[var(--text-muted)]" size={18} />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 h-full bg-transparent outline-none text-[var(--text-secondary)] placeholder-[var(--text-muted)] text-sm"
          />
        </div>

        {/* Filter badges */}
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

      {/* Scrollable users list */}
      <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-[var(--scroll-thumb)] scrollbar-track-transparent">
        <div className="flex flex-col gap-1">
          {users.map((user) => (
            <div
              onClick={() => onSelectUser(user)}
              key={user.id}
              className="flex items-center gap-3 py-3 px-3 -mx-3 hover:bg-[var(--bg-tertiary)]/30 cursor-pointer transition-colors duration-[var(--transition-fast)]"
            >
              <div className="flex-shrink-0 relative">
                {user.profile === "" ? (
                  <>
                    <div className="h-12 w-12 bg-[var(--bg-secondary)] rounded-full flex justify-center items-center border border-[var(--border-light)]">
                      <User className="text-[var(--text-secondary)]/70 " />
                    </div>
                  </>
                ) : (
                  <img
                    className="h-12 w-12 rounded-full object-cover border border-[var(--border-light)]"
                    src={user.profile}
                    alt={user.name}
                  />
                )}

                {user.isOnline && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-[var(--success)] rounded-full border-2 border-[var(--bg-main)]"></span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-[var(--text-main)] truncate">
                  {user.name}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1.5 truncate">
                  <CheckCheck
                    size={16}
                    className="text-[var(--accent-blue)] flex-shrink-0"
                  />
                  {user.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatlist;
