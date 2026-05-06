<template>
  <div
    class="flex items-center justify-center h-[100dvh] bg-gradient-to-b from-cyan-700 to-cyan-100 px-5"
  >
    <div
      class="bg-white p-10 rounded-xl space-y-5 md:max-w-sm w-full shadow-xl"
    >
      <h1 class="font-bold text-2xl text-slate-800">Set New Password</h1>
      <p class="text-sm text-slate-500">
        Gunakan icon mata untuk memastikan password sudah benar.
      </p>

      <form @submit.prevent="handleUpdatePassword" class="space-y-4">
        <!-- Input Password Baru -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-slate-700"
            >New Password</label
          >
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="newPassword"
              placeholder="********"
              required
              class="border border-slate-400 rounded-lg p-2 w-full pr-10 focus:outline-cyan-600"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-600 transition"
            >
              <Icon
                :icon="
                  showPassword
                    ? 'ic:baseline-visibility'
                    : 'ic:baseline-visibility-off'
                "
                class="text-xl"
              />
            </button>
          </div>
        </div>

        <!-- Input Konfirmasi Password -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-slate-700"
            >Confirm New Password</label
          >
          <div class="relative">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              placeholder="********"
              required
              class="border border-slate-400 rounded-lg p-2 w-full pr-10 focus:outline-cyan-600"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-600 transition"
            >
              <Icon
                :icon="
                  showConfirmPassword
                    ? 'ic:baseline-visibility'
                    : 'ic:baseline-visibility-off'
                "
                class="text-xl"
              />
            </button>
          </div>
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full bg-cyan-600 text-white p-2 rounded-lg font-semibold hover:bg-cyan-700 hover:scale-[1.02] transform duration-300 disabled:bg-slate-400 disabled:scale-100"
        >
          <span v-if="authStore.loading">Mengupdate...</span>
          <span v-else>Update Password</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth.store";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue"; // Pastikan sudah install @iconify/vue

const newPassword = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const authStore = useAuthStore();
const router = useRouter();

async function handleUpdatePassword() {
  const p1 = newPassword.value.trim();
  const p2 = confirmPassword.value.trim();

  if (p1 !== p2) {
    return alert("Password konfirmasi tidak cocok!");
  }

  // Ambil token dari URL
  const hash = window.location.hash || window.location.search;
  const params = new URLSearchParams(hash.replace("#", "?"));
  const token = params.get("access_token");

  try {
    await authStore.updatePassword(p1, token);
    alert("Berhasil! Password baru sudah aktif.");
    authStore.logout();
    window.location.href = "/login";
  } catch (error) {
    // Tampilkan pesan error yang sudah difilter di store
    alert(authStore.error);

    // Jika memang sesinya yang habis (bukan karena password sama), baru lempar ke forgot
    if (!authStore.error.includes("sama")) {
      router.push({ name: "forgot-password" });
    }
  }
}
</script>
