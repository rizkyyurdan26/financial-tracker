<template>
  <div class="flex h-screen">
    
    <!-- Sidebar -->
    <Sidebar />

    <!-- Right Area -->
    <div class="flex flex-col flex-1 h-screen">

      <!-- Header -->
      <HeaderUi />

      <!-- Content -->
      <main class="overflow-auto p-4">
        <router-view />
      </main>

      <!-- Footer (optional) -->
      <div class="mt-auto">
         <FooterUi/>
      </div>

    </div>
  </div>
</template>


<script setup>
import FooterUi from "../components/ui/FooterUi.vue";
import HeaderUi from "../components/ui/HeaderUi.vue";
import Sidebar from "../components/ui/Sidebar.vue";
</script>
