<template>
  <div class="px-5 lg:mt-5">
    <!-- Title -->
    <h1 class="text-2xl font-bold text-secondary flex items-end gap-1" data-sal="slide-up" data-sal-duration="2000">
      Dashboard
      <span
        ><Icon icon="ic:sharp-bubble-chart" width="32" class="text-primary"
      /></span>
    </h1>
    <p class="text-secondary"  data-sal="slide-up" data-sal-duration="2000">Welcome back, here is your financial reports</p>

    <!-- Loading / Error -->
    <div>
      <p v-if="store.loading" class="text-secondary text-center">Loading...</p>
      <p v-if="store.error" class="text-red-500 text-center">Sorry, something error</p>
    </div>

    <!-- Content -->

    <div v-if="!store.loading && !store.error">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <CartDashboard
          v-for="item in dashStore.allData"
          :key="item.id"
          :text="item.text"
          :span="item.span"
          :icon="item.icon"
          :icon-class="item.iconClass"
          :amount="item.amount"
          :percent="item.percent"
          data-sal="zoom-in"
          data-sal-duration="1000"
        />
      </div>

      <div class="mt-5">
        <BudgetDashboard data-sal="zoom-in" data-sal-duration="2000"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import CartDashboard from "../components/card/CartDashboard.vue";
import { onMounted } from "vue";
import { useTransactionStore } from "../stores/transaction.store";
import { useDashboardStore } from "../stores/dashboard.store";
import ComparisonChart from "../components/chart/comparisonChart.vue";
import BudgetDashboard from "../components/chart/BudgetDashboard.vue";

const store = useTransactionStore();
const dashStore = useDashboardStore();

onMounted(async () => {
  await store.fetchTransactions();
  // console.log(dashStore.totalBalance)
});
</script>
