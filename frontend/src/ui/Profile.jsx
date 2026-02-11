import { Pencil, Phone, Mail, User } from "lucide-react";
import { useSelector } from "react-redux";
import Logout from "../components/Logout";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center text-[var(--text-muted)]">
        No user data found
      </div>
    );
  }

  return (
    <div className="h-full relative w-full bg-[var(--bg-main)] text-[var(--text-main)] p-6">
      {/* Header */}
      <h2 className="text-lg font-medium mb-6">Profile</h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-8">
        {!user.profile ? (
          <div className="rounded-full w-36 h-36 flex bg-[var(--bg-secondary)] justify-center items-center">
            <User size={80}  className="text-[var(--text-secondary)]/70 " />
          </div>
        ) : (
          <img
            src={user.profile}
            alt="profile"
            className="w-36 h-36 rounded-full object-cover shadow-[var(--shadow-md)]"
          />
        )}
      </div>

      {/* Name */}
      <div className="mb-6">
        <p className="text-sm text-[var(--text-muted)] mb-1">Name</p>
        <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-2">
          <p className="text-base">{user.name}</p>
          <Pencil
            size={16}
            className="text-[var(--accent-primary)] cursor-pointer"
          />
        </div>
      </div>

      {/* About */}
      <div className="mb-6">
        <p className="text-sm text-[var(--text-muted)] mb-1">About</p>
        <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-2">
          <p className="text-base">
            {user.about || "Hey there! I am using WhatsApp."}
          </p>
          <Pencil
            size={16}
            className="text-[var(--accent-primary)] cursor-pointer"
          />
        </div>
      </div>
    

      {/* Email */}
      <div>
        <p className="text-sm text-[var(--text-muted)] mb-1">Email</p>
        <div className="flex items-center gap-3">
          <Mail size={16} className="text-[var(--accent-primary)]" />
          <p className="text-base">{user.email}</p>
        </div>
      </div>

      {/* Logout */}
      <div className="absolute bottom-6 left-0 w-full px-6">
        <Logout />
      </div>
    </div>
  );
};

export default Profile;
