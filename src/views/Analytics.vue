<template>
  <div class="flex flex-col px-5 gap-5">
    <h1 class="font-bold text-xl text-secondary flex items-end gap-2">
      Finance Analytics
      <Icon icon="ic:outline-analytics" width="32" class="text-amber-500" />
    </h1>
    <p v-if="store.loading" class="text-center text-secondary">
      Loading Data...
    </p>
    <p
      v-if="store.error"
      class="text-center text-red-500 text-lg font-semibold"
    >
      Failed to Get Data
    </p>

    <div v-else-if="store.transactions.length === 0">
      <p class="text-center text-secondary font-semibold">Data is unavailable</p>
    </div>

    <div v-else>
      <!-- Filter -->
      <div class="space-y-1" >
        <h1 class="text-secondary">Filter:</h1>
        <FilterAnalytic
          v-model:start="filterStore.startDate"
          v-model:end="filterStore.endDate"
        />
      </div>

      <!-- Pie Chart -->
      <div class="flex flex-col gap-5 mt-5">
        <BudgetChart />
        <ComparisonChart />
        <CategoryChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watchEffect } from "vue";
import { useTransactionStore } from "../stores/transaction.store";
import { useFilterStore } from "../stores/filter.store";
import { Icon } from "@iconify/vue";
import FilterAnalytic from "../components/filter/FilterAnalytic.vue";
import CategoryChart from "../components/chart/categoryChart.vue";
import ComparisonChart from "../components/chart/comparisonChart.vue";
import BudgetChart from "../components/chart/BudgetChart.vue";

const store = useTransactionStore();
const filterStore = useFilterStore();

onMounted(async () => {
  await store.fetchTransactions();
});

</script>
