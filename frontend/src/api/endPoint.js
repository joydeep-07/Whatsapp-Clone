// Base URL for backend
export const BASE_URL = "http://localhost:3000";

// All API endpoints in one place
export const ENDPOINTS = {
  //  AUTH
  REGISTER: `${BASE_URL}/api/auth/register`,
  LOGIN: `${BASE_URL}/api/auth/login`,

  // PROFILE
  UPDATE_PROFILE: `${BASE_URL}/api/profile/update`,
  UPLOAD_PROFILE_IMAGE: `${BASE_URL}/api/profile/upload-image`,

  // CHAT BOT
  CHAT_SEND: `${BASE_URL}/api/chatbot/send`,
  CHAT_HISTORY: `${BASE_URL}/api/chatbot/history`,
  CHAT_DELETE: `${BASE_URL}/api/chatbot/delete`,

  // ALL USER
  ALL_USER: `${BASE_URL}/api/users`
};
