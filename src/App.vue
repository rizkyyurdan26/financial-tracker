<template>
  <router-view> </router-view>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "./stores/auth.store";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  const hash = window.location.hash;
  
  if (hash && hash.includes("type=recovery")) {
    // Langsung pindah tanpa hapus/simpan apapun
    router.push({ name: 'reset-password', hash: hash }); 
    return;
  }

  await authStore.fetchCurrentUser();
});
</script>
