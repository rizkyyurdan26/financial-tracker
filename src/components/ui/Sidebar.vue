<template>
  <aside
    :class="[
    'z-50 flex flex-col border-r border-slate-300 bg-white transition-all duration-300',

    // Mobile overlay
    'fixed top-0 left-0 h-dvh md:relative md:h-full',

    // MOBILE → pakai translate
    isCollapse ? '-translate-x-full md:translate-x-0' : 'translate-x-0',

    // DESKTOP → pakai width (bukan translate)
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
      <nav class="space-y-2">
        <RouterButton
          :is-collapse="isCollapse"
          icon="ic:round-dashboard"
          text="Dashboard"
          href=""
        />
        <RouterButton
          :is-collapse="isCollapse"
          icon="ic:baseline-call-received"
          text="Income"
          href="/none"
        />
        <RouterButton
          :is-collapse="isCollapse"
          icon="ic:baseline-call-made"
          text="Outcome"
          href="/none"
        />
        <RouterButton
          :is-collapse="isCollapse"
          icon="ic:outline-analytics"
          text="Analytics"
          href="/none"
        />
      </nav>
    </div>

    <!-- Bottom -->
    <div class="flex flex-col mt-auto">
      <!-- Other Menu -->
      <nav class="space-y-2 p-6">
        <RouterButton
          :is-collapse="isCollapse"
          icon="ic:baseline-settings"
          text="Settings"
          href="/none"
        />
        <RouterButton
          :is-collapse="isCollapse"
          icon="ic:baseline-help-outline"
          text="Help"
          href="/none"
        />
      </nav>

      <!-- <hr class="text-gray-300" /> -->
      <!-- Name Cart -->
      <CartUser
        :is-collapse="isCollapse"
        profileIcon="ic:baseline-person"
        logOutIcon="ic:baseline-logout"
        text="Testing Example name"
        email="example@mail.com"
        href="#"
      />
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
import CartUser from "../cart/CartUser.vue";
import { ref, onMounted, onUnmounted } from "vue";

// STATE
const isCollapse = ref(false);

// RESPONSIVE AUTO COLLAPSE
const handleResize = () => {
  isCollapse.value = window.innerWidth < 640;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
