import { Pencil, Mail, User, Camera } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { ENDPOINTS } from "../api/endPoint";
import { updateUser } from "../redux/slices/authSlice";
import Logout from "../components/Logout";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [editName, setEditName] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [about, setAbout] = useState(user?.about || "");
  const [profileImage, setProfileImage] = useState(user?.profilePic || "");
  const [selectedFile, setSelectedFile] = useState(null);

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center text-[var(--text-muted)]">
        No user data found
      </div>
    );
  }

  // ✅ Handle Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setSelectedFile(file);
      setImageChanged(true);
    }
  };

  // ✅ Save Profile
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      // 1️⃣ Update name & about
      const profileRes = await axios.put(
        ENDPOINTS.UPDATE_PROFILE,
        { name, about },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      let updatedUser = profileRes.data.user;

      // 2️⃣ Upload image if changed
      if (imageChanged && selectedFile) {
        const formData = new FormData();
        formData.append("profile", selectedFile);

        const imageRes = await axios.put(
          ENDPOINTS.UPLOAD_PROFILE_IMAGE,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );

        updatedUser = {
          ...updatedUser,
          profilePic: imageRes.data.profilePic,
        };
      }

      // ✅ Update Redux + localStorage
      dispatch(updateUser(updatedUser));

      // Reset edit states
      setEditName(false);
      setEditAbout(false);
      setImageChanged(false);
      setSelectedFile(null);

      console.log("Profile Updated Successfully");
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  // ✅ Format Image URL Properly
  const getImageSrc = () => {
    if (!profileImage) return null;

    if (profileImage.startsWith("http") || profileImage.startsWith("blob:")) {
      return profileImage;
    }

    return `http://localhost:3000${profileImage}`;
  };

  return (
    <div className="h-full relative w-full bg-[var(--bg-main)] text-[var(--text-main)] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium font-heading">Profile</h2>

        {(editName || editAbout || imageChanged) && (
          <button
            onClick={handleSave}
            className="text-md font-medium text-[var(--accent-primary)]"
          >
            Save
          </button>
        )}
      </div>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-8 relative">
        <div className="relative">
          {!profileImage ? (
            <div className="rounded-full w-36 h-36 flex bg-[var(--bg-secondary)] justify-center items-center">
              <User size={80} className="text-[var(--text-secondary)]/70" />
            </div>
          ) : (
            <img
              src={getImageSrc()}
              alt="profile"
              className="w-36 h-36 rounded-full object-cover shadow-[var(--shadow-md)]"
            />
          )}

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
