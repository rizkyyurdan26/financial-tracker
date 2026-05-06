<template>
  <div class="flex h-[100dvh] overflow-hidden">
    <Sidebar />

    <div class="flex flex-col flex-1 min-w-0 h-screen">
      <HeaderUi />

      <main class="flex flex-col flex-1 overflow-y-auto py-4 bg-slate-50">
        <router-view class="flex-1" />
      </main>

      <FooterUi />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import FooterUi from "../components/ui/FooterUi.vue";
import HeaderUi from "../components/ui/HeaderUi.vue";
import Sidebar from "../components/ui/Sidebar.vue";
import { useTransactionStore } from "../stores/transaction.store";

const store = useTransactionStore()

onMounted(async () => {
  await store.fetchTransactions()
})
</script>
