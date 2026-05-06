<template>
  <div class="flex items-center justify-center h-[100dvh] bg-gradient-to-b from-cyan-700 to-cyan-100">
    <div class="bg-white p-10 rounded-xl space-y-5 m-5 md:max-w-sm w-full">
      <h1 class="font-bold text-2xl">Forgot Password</h1>
      <p class="text-sm text-slate-500">Masukkan email kamu, kami akan kirimkan link untuk reset password.</p>

      <form @submit.prevent="handleRequestReset" class="space-y-4">
        <div class="flex flex-col gap-2">
          <label>Email</label>
          <input 
            type="email" 
            v-model="email" 
            placeholder="example@mail.com" 
            required 
            class="border border-slate-400 rounded-lg p-2 w-full"
          />
        </div>

        <button 
          type="submit" 
          :disabled="authStore.loading"
          class="w-full bg-cyan-600 text-white p-2 rounded-lg font-semibold hover:scale-105 duration-300 disabled:bg-slate-400"
        >
          {{ authStore.loading ? 'Mengirim...' : 'Kirim Link Reset' }}
        </button>
      </form>

      <p class="text-center text-sm">
        <router-link to="/login" class="text-blue-500 underline">Kembali ke Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth.store';

const email = ref("");
const authStore = useAuthStore();

async function handleRequestReset() {
  try {
    await authStore.sendResetPasswordEmail(email.value);
    alert("Email pemulihan telah dikirim! Silakan cek inbox/spam email kamu.");
  } catch (error) {
    console.error(error);
  }
}
</script>