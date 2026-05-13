import axios from "axios";
import api from "./api";

const BASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const authService = {
  async register(email, password, username) {
    const res = await api.post("/auth/v1/signup", {
      email: email,
      password: password,
      data: {
        username: username,
      },
    });
    return res.data;
  },

  async login(email, password) {
    const res = await api.post("/auth/v1/token?grant_type=password", {
      email: email,
      password: password,
    });
    return res.data;
  },

  async logout() {
    const res = await api.post("/auth/v1/logout");
    return res.data;
  },

  async fetchCurrentUser() {
    const token = localStorage.getItem("access_token");

    if (!token) return null;

    const res = await api.get("/auth/v1/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },

  async sendResetPasswordEmail(email) {
    const res = await api.post("/auth/v1/recover", { email });
    return res.data;
  },

  async updatePassword(newPassword, recoveryToken) {
    const res = await axios.put(
      `${BASE_URL}/auth/v1/user`,
      { password: newPassword },
      {
        headers: {
          Authorization: `Bearer ${recoveryToken}`,
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
        },
      },
    );
    return res.data;
  },
};
