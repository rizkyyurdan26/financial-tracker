<template>
  <header
    class="sticky gap-2 flex flex-col md:flex-row justify-between items-center border-b p-2 md:p-10 md:h-24 border-slate-300 w-full"
  >
    <!-- Search -->
    <!-- <div
      class="flex gap-2 items-center border border-slate-300 w-full md:max-w-[50%] rounded"
    >
    
      <input
        type="text"
        placeholder="Search"
        class="w-full text-slate-600 focus:outline-none ml-4"
        v-model="searchInput"
      />

      <button class="p-2 bg-cyan-600 hover:cursor-pointer">
        <Icon icon="ic:outline-search" width="24" class="text-white" />
      </button>
    </div> -->

    <!-- Left -->

    <div class="flex gap-5 items-center">
      <router-link to="/create">
        <button
          class="bg-cyan-600 text-white font-semibold text-sm py-1 px-5 rounded hover:cursor-pointer hover:scale-105 transform duration-300"
        >
          <span class="text-xs md:text-xl">+</span> Add Transaction
        </button>
      </router-link>
    </div>

    <!-- Center -->
    <div class="text-center space-y-1">
      <h1 class="text-secondary text-sm font-bold">Currency</h1>
      <ToggleButton />
    </div>

    <!-- Right -->
    <div>
      <!-- Name Cart -->
      <CartUser
        v-if="authStore.token"
        :is-collapse="isCollapse"
        profileIcon="ic:baseline-person"
        logOutIcon="ic:baseline-logout"
        :text="authStore.user?.user_metadata?.username || 'User'"
        :email="authStore.user?.email"
        @logout="handleLogout"
      />

      <!-- Login | Register -->
      <div v-else class="flex gap-2 items-center">
        <router-link to="/login">
          <button
            class="text-cyan-600 font-semibold px-5 py-1 border border-cyan-600 rounded-lg hover:bg-cyan-50 duration-300 cursor-pointer"
          >
            Login
          </button>
        </router-link>

        <router-link to="/register">
          <button
            class="bg-cyan-600 border text-white font-semibold px-5 py-1 rounded-lg hover:bg-cyan-700 duration-300 cursor-pointer"
          >
            Register
          </button>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";
import RouterButton from "../common/RouterButton.vue";
import { useTheme } from "../../compossable/useTheme";
import { useCurrencyStore } from "../../stores/currency.stores";
import ToggleButton from "../common/ToggleButton.vue";
import CartUser from "../card/CartUser.vue";
import { useAuthStore } from "../../stores/auth.store";
import { useRouter } from "vue-router";
import { useTransactionStore } from "../../stores/transaction.store";

// const searchInput = ref("");
const authStore = useAuthStore();
const isCollapse = ref(false);
const currency = useCurrencyStore();
const router = useRouter();

function handleLogout() {
  if (confirm("Are your sure logout?")) {
    authStore.logout();
    const store = useTransactionStore();
    store.fetchTransactions();
    router.push({ name: "dashboard" });
  } else {
    return;
  }
}
</script>
