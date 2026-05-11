<template>
  <router-view> </router-view>
</template>

<script setup>
import { nextTick, onMounted, watch } from "vue";
import { useAuthStore } from "./stores/auth.store";
import { useRoute, useRouter } from "vue-router";
import sal from "sal.js";
import { useTransactionStore } from "./stores/transaction.store";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute()
const txStore = useTransactionStore()

onMounted(async () => {
  const hash = window.location.hash;
  
  if (hash && hash.includes("type=recovery")) {
    router.push({ name: 'reset-password', hash: hash }); 
    return;
  }

  await authStore.fetchCurrentUser();

  sal({
    threshold: 0.2,
    once:true
  })
});

watch(() => route.path, async () => {
  await nextTick()
  sal(). update()
}, {immediate: true})

watch(() => txStore.transactions, async () => {
  await nextTick()
  sal().update()
}, {deep: true})
</script>
