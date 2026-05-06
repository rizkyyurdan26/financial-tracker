<template>
  <form
    @submit.prevent="handleLogin"
    class="flex items-center justify-center h-[100dvh] bg-gradient-to-b from-cyan-700 to-cyan-100"
  >
    <div class="bg-white p-10 rounded-xl space-y-5 m-5 md:max-w-sm w-full">
      <h1 class="font-bold text-2xl mb-5">Login</h1>

      <!-- Email -->
      <div class="flex flex-col gap-2 text-secondary">
        <label>Email</label>
        <input
          type="email"
          placeholder="example@mail.com"
          required
          v-model="inputEmail"
          class="border border-slate-400 rounded-lg p-2 w-full"
        />
      </div>

      <!-- Password -->
      <div class="flex flex-col gap-2 text-secondary">
        <label>Password</label>
        <div class="flex">
          <input
            :type="isShow ? 'text' : 'password'"
            placeholder="************"
            required
            v-model="inputPassword"
            class="border border-slate-400 rounded-lg p-2 pr-10 w-full"
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

      <!-- Terms & Polcy -->
      <div class="flex gap-2 items-center">
        <input
          type="checkbox"
          v-model="isChecked"
          class="cursor-pointer"
        />
        <p class="text-xs text-secondary">Agree with terms and policy</p>
      </div>

      <!-- Button -->
      <button
        type="submit"
        :disabled="!isChecked"
        :class="[
          'w-full text-white p-2 rounded-lg font-semibold duration-300',
          isChecked
            ? 'bg-cyan-600 hover:scale-105  cursor-pointer'
            : 'bg-slate-400 cursor-not-allowed',
        ]"
      >
        Login
      </button>

      <!-- To Register -->
       <p class="text-center text-secondary">Don't have account? <span class="text-blue-500 underline"><a href="/register">Register</a></span></p>

    </div>
  </form>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const inputEmail = ref("");
const inputPassword = ref("");
const isChecked = ref(false);
const isShow = ref(false);

function handleLogin() {
    const payload = {
        email: inputEmail.value,
        password: inputPassword.value
    }
}
</script>
