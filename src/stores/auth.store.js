import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../services/api";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref(null);
  const token = ref(localStorage.getItem("access_token") || null);
  const loading = ref(false);
  const error = ref(null);
  const errorCode = ref(null);

  // Register
  async function register(email, password, username) {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.post(
        "/signup",
        {
          email,
          password,
          data: { username: username },
        },
        {
          baseURL: `${BASE_URL}/auth/v1`,
        },
      );
      return res.data;
    } catch (err) {
      error.value =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Register Gagal";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Login
  async function login(email, password) {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.post(
        "/token?grant_type=password",
        {
          email,
          password,
        },
        {
          baseURL: `${BASE_URL}/auth/v1`,
        },
      );

      // Simpan token ke state dan localStorage
      token.value = res.data.access_token;
      user.value = res.data.user;
      localStorage.setItem("access_token", res.data.access_token);

      return res.data;
    } catch (err) {
      error.value = err.response?.data?.error_description || "Login Gagal";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchCurrentUser() {
    if (!token.value) return;

    try {
      const res = await api.get("/user", {
        baseURL: `${BASE_URL}/auth/v1`,
      });

      user.value = res.data;
    } catch (err) {
      console.error("Sesi tidak valid", err);
      logout();
    }
  }

  // Logout
  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("access_token");
  }

  // Recovery Password
  async function sendResetPasswordEmail(email) {
    loading.value = true;
    error.value = null;
    try {
      await api.post(
        "/recover",
        { email },
        {
          baseURL: `${BASE_URL}/auth/v1`,
        },
      );
    } catch (err) {
      error.value = err.response?.data?.msg || "Failed to send recovery link";
      throw err;
    } finally {
      loading.value = false;
    }
  }

async function updatePassword(newPassword, recoveryToken) {
  loading.value = true;
  error.value = null;
  errorCode.value = null

  try {
    await axios.put(
      `${BASE_URL}/auth/v1/user`,
      { password: newPassword },
      {
        headers: {
          'Authorization': `Bearer ${recoveryToken}`,
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (err) {
    const supabaseError = err.response?.data?.msg || err.response?.data?.message;
    

    if (supabaseError?.includes("new password") && supabaseError?.includes("different")) {
      error.value = "Please use different password from old password";
      errorCode.value = "SAME_PASSWORD";
    } else {
      error.value = supabaseError || "Failed to update password";
      errorCode.value = null;
    }
    
    console.dir(err.response?.data);
    throw err;
  } finally {
    loading.value = false;
  }
}


  return {
    user,
    token,
    loading,
    error,
    errorCode,
    register,
    login,
    logout,
    fetchCurrentUser,
    sendResetPasswordEmail,
    updatePassword,
  };
});
