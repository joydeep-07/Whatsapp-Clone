import { Pencil, Phone, Mail, LogOut } from "lucide-react";
import Logout from "../components/Logout";

const Profile = () => {
  const user = {
    name: "Joydeep Paul",
    profile:
      "https://i.pinimg.com/736x/da/59/64/da59647bd31dd524c09991cb89949804.jpg",
    email: "joydeep@gmail.com",
    phone: "+91 9064547381",
    about: "Mern Stack developer",
  };

  const handleLogout = () => {
    // later you can clear token / context here
    console.log("Logged out");
  };

  return (
    <div className="h-full relative w-full bg-[var(--bg-main)] text-[var(--text-main)] p-6">
      {/* Header */}
      <h2 className="text-lg font-medium mb-6">Profile</h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-8">
        <img
          src={user.profile}
          alt="profile"
          className="w-36 h-36 rounded-full object-cover shadow-[var(--shadow-md)]"
        />
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
          <p className="text-base">{user.about}</p>
          <Pencil
            size={16}
            className="text-[var(--accent-primary)] cursor-pointer"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="mb-6">
        <p className="text-sm text-[var(--text-muted)] mb-1">Phone</p>
        <div className="flex items-center gap-3 border-b border-[var(--border-light)] pb-2">
          <Phone size={16} className="text-[var(--accent-primary)]" />
          <p className="text-base">{user.phone}</p>
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
       <Logout/>
      </div>
    </div>
  );
};

export default Profile;
