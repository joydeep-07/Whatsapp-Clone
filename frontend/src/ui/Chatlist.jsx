import {
  CheckCheck,
  CirclePlus,
  EllipsisVertical,
  Search,
  User,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINTS } from "../api/endPoint";
import MyContacts from "./MyContacts";
import AiLogo from "../ai/AiLogo";
import { BASE_URL } from "../api/endPoint";


const Chatlist = ({ onSelectUser, onAddContact, onOpenAiChat, onContactClick }) => {
  const [users, setUsers] = useState([]); // ← dynamic users
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await axios.get(ENDPOINTS.ALL_USER);

        setUsers(res.data.users); // because backend returns { users: [...] }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUserId(user._id); // use _id from MongoDB
    onSelectUser(user);
  };

  // ✅ Filter users
  const filteredUsers = users.filter((user) => {
    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase().trim();

    const nameMatch = user.name?.toLowerCase().includes(term);
    const emailMatch = user.email?.toLowerCase().includes(term);

    return nameMatch || emailMatch;
  });

  return (
    <div className="h-screen relative flex flex-col bg-[var(--bg-main)] text-[var(--text-main)]">
      {/* Header Section (unchanged) */}
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

        {/* Search */}
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
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {loading ? (
          <div className="text-center text-sm text-[var(--text-muted)]">
            Loading users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[var(--text-muted)] text-sm">
            No matching users
          </div>
        ) : (
          filteredUsers.map((user) => {
            const isSelected = selectedUserId === user._id;

            return (
              <div
                key={user._id}
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
                {/* Avatar */}
                <div className="relative">
                  {user.profilePic ? (
                    <img
                      src={`${BASE_URL}${user.profilePic}`}
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

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold truncate">{user.name}</h2>
                  <p className="text-sm text-[var(--text-secondary)] truncate">
                    {user.about}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Buttons (unchanged) */}
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
};;

export default Chatlist;
