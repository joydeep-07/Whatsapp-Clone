import { Pencil, Mail, User, Camera } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Logout from "../components/Logout";
// import { updateUser } from "../redux/authSlice"; // if you have update action

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [editName, setEditName] = useState(false);
  const [editAbout, setEditAbout] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [about, setAbout] = useState(user?.about || "");
  const [profileImage, setProfileImage] = useState(user?.profile || "");

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center text-[var(--text-muted)]">
        No user data found
      </div>
    );
  }

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Save Handler
  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      about,
      profile: profileImage,
    };

    // dispatch(updateUser(updatedUser));  // Use this if redux action exists
    console.log("Updated User:", updatedUser);

    setEditName(false);
    setEditAbout(false);
  };

  return (
    <div className="h-full relative w-full bg-[var(--bg-main)] text-[var(--text-main)] p-6">
      <div className="flex justify-between items-center mb-6">
        {" "}
        <h2 className="text-lg font-medium">Profile</h2>
        {/* Save Button (only show if editing) */}
        {(editName || editAbout) && (
          <button
            onClick={handleSave}
            className="text-md font-medium text-[var(--accent-primary)] "
          >
            Save
          </button>
        )}
      </div>
      {/* Profile Image */}
      <div className="flex flex-col items-center mb-8 relative">
        <div className=" relative">
          {!profileImage ? (
            <div className="rounded-full w-36 h-36 flex bg-[var(--bg-secondary)] justify-center items-center">
              <User size={80} className="text-[var(--text-secondary)]/70" />
            </div>
          ) : (
            <img
              src={profileImage}
              alt="profile"
              className="w-36 h-36 rounded-full object-cover shadow-[var(--shadow-md)]"
            />
          )}

          {/* Upload Button */}
          <label className="absolute bottom-1 right-2 bg-[var(--accent-primary)] p-2 rounded-full cursor-pointer">
            <Camera size={16} className="text-white" />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      {/* Name */}
      <div className="mb-6">
        <p className="text-sm text-[var(--text-muted)] mb-1">Name</p>
        <div className="border-b border-[var(--border-light)] pb-2">
          {editName ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-base">{name}</p>
              <Pencil
                size={16}
                className="text-[var(--accent-primary)] cursor-pointer"
                onClick={() => setEditName(true)}
              />
            </div>
          )}
        </div>
      </div>

      {/* About */}
      <div className="mb-6">
        <p className="text-sm text-[var(--text-muted)] mb-1">About</p>
        <div className="border-b border-[var(--border-light)] pb-2">
          {editAbout ? (
            <input
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-base">
                {about || "Hey there! I am using WhatsApp."}
              </p>
              <Pencil
                size={16}
                className="text-[var(--accent-primary)] cursor-pointer"
                onClick={() => setEditAbout(true)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="mt-8">
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
