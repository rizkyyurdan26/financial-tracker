<template>
  <form
    @submit.prevent="handleRegister"
    class="flex h-[100dvh] items-center justify-center mx-auto bg-gradient-to-b from-cyan-700 to-cyan-100"
  >
    <div class="bg-white p-10 rounded-xl space-y-5 m-5 md:max-w-sm w-full">
      <h1 class="font-bold text-2xl mb-5">Register</h1>

      <!-- Alert Error dari Supabase (Baru ditambahkan) -->
      <div v-if="authStore.error" class="bg-red-100 text-red-600 p-3 rounded-lg text-sm text-center font-medium">
        {{ authStore.error }}
      </div>

      <!-- Username -->
      <div class="flex flex-col gap-2">
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          required
          v-model="inputUsername"
          class="border border-slate-400 p-2 rounded-lg w-full"
        />
      </div>

      <!-- Email -->
      <div class="flex flex-col gap-2">
        <label>Email</label>
        <input
          type="email"
          placeholder="example@mail.com"
          required
          v-model="inputEmail"
          class="border border-slate-400 p-2 rounded-lg w-full"
        />
      </div>

      <!-- Password -->
      <div class="flex flex-col gap-2">
        <label>Password</label>
        <div class="flex">
          <input
            :type="isShow ? 'text' : 'password'"
            placeholder="********"
            required
            v-model="inputPassword"
            class="border border-slate-400 pr-10 p-2 rounded-lg w-full"
          />
          <button
            @click.prevent="isShow = !isShow"
            class="cursor-pointer -ml-8"
          >
            <Icon
              :icon="
                isShow ? 'ic:baseline-visibility-off' : 'ic:baseline-visibility'
              "
              class="text-xl text-slate-500"
            />
          </button>
        </div>
      </div>

      <!-- Repeat Password -->
      <div class="flex flex-col gap-2">
        <label>Repeat Password</label>
        <div class="flex">
          <input
            :type="isShow ? 'text' : 'password'"
            placeholder="********"
            required
            v-model="repeatPassword"
            class="border border-slate-400 pr-10 p-2 rounded-lg w-full"
          />
          <button
            @click.prevent="isShow = !isShow"
            class="cursor-pointer -ml-8"
          >
            <Icon
              :icon="
                isShow ? 'ic:baseline-visibility-off' : 'ic:baseline-visibility'
              "
              class="text-xl text-slate-500"
            />
          </button>
        </div>
      </div>

      <!-- Terms & Policy -->
      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="isChecked" class="cursor-pointer" />
        <p class="text-xs text-secondary">Agree with terms and policy</p>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        :disabled="!isChecked || authStore.loading"
        :class="[
          'w-full text-white p-2 rounded-lg font-semibold duration-300 flex justify-center',
          isChecked && !authStore.loading
            ? 'bg-cyan-600 hover:scale-105  cursor-pointer'
            : 'bg-slate-400 cursor-not-allowed',
        ]"
      >
        <span v-if="authStore.loading">Loading...</span>
        <span v-else>Register</span>
      </button>

      <!-- Already Account -->
      <p class="text-center text-secondary">
        Already have an account?
        <!-- Pakai router-link biar gak refresh halaman -->
        <router-link to="/login" class="text-blue-500 underline">Login</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth.store";


// Inisialisasi
const router = useRouter();
const authStore = useAuthStore();

const inputEmail = ref("");
const inputPassword = ref("");
const repeatPassword = ref("");
const inputUsername = ref("");
const isShow = ref(false);
const isChecked = ref(false);

async function handleRegister() {
  // Validasi lokal dulu
  if (inputPassword.value !== repeatPassword.value) {
    return alert("Password dan Repeat Password harus sama!");
  }

  try {
    // Panggil fungsi register dari store, masukkan 3 parameter
    await authStore.register(inputEmail.value, inputPassword.value, inputUsername.value);
    
    alert("Register berhasil! Silakan login.");
    router.push('/login');
  } catch (error) {
    console.error("Gagal register:", error);
  }
}
</script>