import { createSlice } from "@reduxjs/toolkit";

// auth initial state
// token aur role localStorage se read kar rahe hain

const initialState = {
  token: localStorage.getItem("access_token") || null,
  role: localStorage.getItem("role") || null,
  isAuthenticated: !!localStorage.getItem("access_token"),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isAuthenticated = true;

      localStorage.setItem("access_token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
    },

    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;

      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;