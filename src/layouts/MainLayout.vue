<template>
  <div class="flex h-screen overflow-hidden"> <Sidebar />

    <div class="flex flex-col flex-1 min-w-0 h-screen"> 
      <HeaderUi />

      <main class="flex-1 overflow-y-auto p-4 bg-slate-50">
        <router-view />
      </main>

      <FooterUi />
    </div>
  </div>
</template>

<script setup>
import FooterUi from "../components/ui/FooterUi.vue";
import HeaderUi from "../components/ui/HeaderUi.vue";
import Sidebar from "../components/ui/Sidebar.vue";
</script>
