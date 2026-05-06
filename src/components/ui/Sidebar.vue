<template>
  <aside
    :class="[
      'z-50 flex flex-col border-r border-slate-300 bg-white transition-all duration-300',

      // Mobile overlay
      'fixed top-0 left-0 h-dvh md:relative md:h-full',

      // MOBILE
      isCollapse ? '-translate-x-full md:translate-x-0' : 'translate-x-0',

      // DESKTOP
      isCollapse ? 'md:w-24' : 'md:w-64',
    ]"
  >
    <!-- Top -->
    <div :class="[' border-b border-slate-300 p-6.5']">
      <!-- Logo -->
      <div class="flex gap-5 items-center">
        <img src="/logo.png" alt="" class="w-10" />
        <div v-if="!isCollapse">
          <h1 class="font-semibold text-lg truncate">Finance Tracker</h1>
          <p class="text-xs font-light text-cyan-600">By: RYS</p>
        </div>
      </div>
    </div>
    <!-- <hr class="text-slate-300" /> -->

    <!-- toggle button -->
    <button
      @click="() => (isCollapse = !isCollapse)"
      class="absolute top-20 -right-10 md:-right-4 bg-cyan-400 text-white rounded-full p-1"
    >
      <Icon
        :icon="
          isCollapse
            ? 'ic:baseline-align-horizontal-left'
            : 'ic:baseline-align-horizontal-right'
        "
        width="26"
      />
    </button>

    <!-- Middle -->
    <div class="p-6">
      <!-- Main Menu -->
      <nav class="space-y-2" @click="autoCloseMobile">
        <RouterButton
          :is-collapse="isCollapse"
          icon="ic:round-dashboard"
          text="Dashboard"
          href="/"
        />
        <RouterButton
          :is-collapse="isCollapse"
          icon="ic:baseline-call-received"
          text="Income"
          href="/income"
        />
        <RouterButton
          :is-collapse="isCollapse"
          icon="ic:baseline-call-made"
          text="Espenses"
          href="/expense"
        />
        <RouterButton
          :is-collapse="isCollapse"
          icon="ic:sharp-pie-chart"
          text="Analytics"
          href="/analytics"
        />
      </nav>
    </div>

    <!-- Bottom -->
    <div class="flex flex-col mt-auto">
      <!-- Other Menu -->
      <nav class="space-y-2 p-6" @click="autoCloseMobile">
        <RouterButton
          :is-collapse="isCollapse"
          icon="ic:baseline-settings"
          text="Settings"
          href="/setting"
        />
        <RouterButton
          :is-collapse="isCollapse"
          icon="ic:baseline-help-outline"
          text="Help"
          href="/help"
        />
      </nav>

      <!-- <hr class="text-gray-300" /> -->
      <!-- Name Cart -->
      <div class="md:hidden">
        <CartUser
          v-if="authStore.token"
          :is-collapse="isCollapse"
          profileIcon="ic:baseline-person"
          logOutIcon="ic:baseline-logout"
          :text="authStore.user?.user_metadata?.username || 'User'"
          :email="authStore.user?.email"
          @logout="handleLogout"
        />
      </div>
    </div>
  </aside>
  <div
    v-if="!isCollapse"
    @click="isCollapse = true"
    class="fixed inset-0 bg-black/30 z-40 md:hidden"
  ></div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import RouterButton from "../common/RouterButton.vue";
import CartUser from "../card/CartUser.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "../../stores/auth.store";
import { useTransactionStore } from "../../stores/transaction.store";
import { useRouter } from "vue-router";

// STATE
const isCollapse = ref(false);
const authStore = useAuthStore();
const router = useRouter();

// Handle Logout
function handleLogout() {
  if (confirm("Are your sure logout?")) {
    authStore.logout();
    const store = useTransactionStore();
    store.fetchTransactions();
    router.push({ name: "dashboard" });
    autoCloseMobile();
  } else {
    return;
  }
}

// RESPONSIVE
const handleResize = () => {
  isCollapse.value = window.innerWidth < 768;
};

const autoCloseMobile = () => {
  if (window.innerWidth < 768) {
    isCollapse.value = true;
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
