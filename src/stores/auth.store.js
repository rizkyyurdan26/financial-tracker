import { defineStore } from "pinia";
import { ref } from "vue";
import { authService } from "../services/auth.service";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const errorCode = ref(null);
  const token = ref(localStorage.getItem("access_token") || null);

  async function register(email, password, username) {
    loading.value = true;
    error.value = null;

    try {
      const data = await authService.register(email, password, username);
      return data;
    } catch (err) {
      error.value =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        err.message ||
        "Register Failed";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function login(email, password) {
    loading.value = true;
    error.value = null;

    try {
      const data = await authService.login(email, password);

      user.value = data.user;
      token.value = data.access_token;
      localStorage.setItem("access_token", data.access_token);

      return data;
    } catch (err) {
      error.value =
        err.response?.data?.error_description ||
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Login Failed";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchCurrentUser() {
    if (!token.value) return null;

    loading.value = true;
    error.value = null;

    try {
      const data = await authService.fetchCurrentUser();
      user.value = data;
    } catch (err) {
      console.error("Session is not valid", err);
      error.value = "Session is not valid";

      logout();
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    loading.value = true;
    error.value = null;

    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout API failed", err);
      error.value = "Logout API failed";
    } finally {
      token.value = null;
      user.value = null;
      localStorage.removeItem("access_token");
      loading.value = false;
    }
  }

  async function sendResetPasswordEmail(email) {
    loading.value = true;
    error.value = null;

    try {
      await authService.sendResetPasswordEmail(email);
    } catch (err) {
      error.value =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        err.message ||
        "Failed to send email";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updatePassword(newPassword, recoveryToken) {
    loading.value = true;
    error.value = null;
    errorCode.value = null;

    try {
      await authService.updatePassword(newPassword, recoveryToken);
    } catch (err) {
      const supabaseError =
        err.response?.data?.msg || err.response?.data?.message;

      if (
        supabaseError?.includes("new password") &&
        supabaseError?.includes("different")
      ) {
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
