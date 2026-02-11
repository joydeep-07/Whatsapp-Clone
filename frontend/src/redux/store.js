import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    auth: authSlice,
  },
});
