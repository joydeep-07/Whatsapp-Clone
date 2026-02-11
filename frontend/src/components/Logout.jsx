import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { LogOut } from "lucide-react";
// import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    // Optional: redirect after logout
    // navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="
            w-full flex items-center justify-center gap-2
            py-3 rounded-full
           text-white
            border border-[var(--border-light)]
            bg-[var(--error)]
            transition-[var(--transition-fast)]
          "
    >
      <LogOut size={18} />
      Log out
    </button>
  );
};

export default Logout;
