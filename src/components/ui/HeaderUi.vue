<template>
  <header
    class="sticky gap-2 flex flex-col md:flex-row justify-between items-center border-b p-2 md:p-10 h-27 md:h-24 border-slate-300 w-full"
  >
    <!-- Left -->
    <div
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
    </div>

    <!-- Right -->
    <div>
      <router-link to="/create">
        <button
          class="bg-cyan-600 text-white font-semibold text-sm py-1 px-5 rounded hover:cursor-pointer hover:scale-105 transform duration-300"
        >
          <span class="text-xs md:text-xl">+</span> Add Transaction
        </button>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import RouterButton from "../common/RouterButton.vue";

const searchInput = ref("");
</script>
