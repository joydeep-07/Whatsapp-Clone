// Base URL for backend
export const BASE_URL = "http://localhost:3000";

// All API endpoints in one place
export const ENDPOINTS = {
  // 🔐 Auth
  REGISTER: `${BASE_URL}/api/auth/register`,
  LOGIN: `${BASE_URL}/api/auth/login`,

  // 👤 Profile
  UPDATE_PROFILE: `${BASE_URL}/api/profile/update`,
  UPLOAD_PROFILE_IMAGE: `${BASE_URL}/api/profile/upload-image`,
};
