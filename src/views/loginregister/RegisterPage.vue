<template>
  <form
    @submit.prevent="handleRegister"
    class="flex h-[100dvh] items-center justify-center mx-auto bg-gradient-to-b from-cyan-700 to-cyan-100"
  >
    <div class="bg-white p-10 rounded-xl space-y-5 m-5 md:max-w-sm w-full">
      <h1 class="font-bold text-2xl mb-5">Register</h1>

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
        :disabled="!isChecked"
        :class="[
          'w-full text-white p-2 rounded-lg font-semibold duration-300',
          isChecked
            ? 'bg-cyan-600 hover:scale-105  cursor-pointer'
            : 'bg-slate-400 cursor-not-allowed',
        ]"
      >
        Register
      </button>

      <!-- Already Account -->
      <p class="text-center text-secondary">
        Already have an account?
        <span class="text-blue-500 underline"><a href="login">Login</a></span>
      </p>
    </div>
  </form>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const inputEmail = ref("");
const inputPassword = ref("");
const repeatPassword = ref("");
const isShow = ref(false);
const isChecked = ref(false);

function handleRegister() {
  const payload = {
    email: inputEmail.value,
    password: inputPassword.value,
  };

  if (inputPassword.value !== repeatPassword.value)
    return alert("Please repeat your same password");
}
</script>
