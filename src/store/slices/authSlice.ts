import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../types";

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") as "admin" | "merchant" | "member" | null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{
        token: string;
        role: "admin" | "merchant" | "member";
      }>,
    ) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.error = null;

      // Store in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions;
export default authSlice.reducer;
