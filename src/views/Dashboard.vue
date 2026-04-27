<template>
  <div class="px-5 mb-5">
    <!-- Loading / Error -->
    <div>
      <p v-if="store.loading" class="text-secondary">Loading...</p>
      <p v-if="store.error" class="text-secondary">{{ store.error }}</p>
    </div>

    <!-- Title -->
    <h1 class="text-2xl font-bold text-secondary flex items-end gap-1">Dashboard <span
        ><Icon icon="ic:sharp-bubble-chart" width="32" class="text-primary"
      /></span></h1>
    <p class="text-secondary">
      Welcome back, here is your financial reports
      
    </p>
  </div>

  <!-- Content -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 px-5">
    <CartDashboard
      v-for="item in store.stats"
      :key="item.id"
      :text="item.text"
      :icon="item.icon"
      :icon-class="item.iconClass"
      :amount="item.amount"
      :percent="item.percent"
    />

    <!-- <FinancialChart />
    <SpendingChart /> -->
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import CartDashboard from "../components/card/CartDashboard.vue";
import { onMounted } from "vue";
import { useTransactionStore } from "../stores/transaction.store";
import { useDashboardStore } from "../stores/dashboard.store";

const fetching = useTransactionStore();
const store = useDashboardStore()

onMounted(async () => {
  await fetching.fetchTransactions();
});
</script>
