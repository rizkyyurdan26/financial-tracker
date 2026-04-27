<template>
  <div class="p-5">
     <h1 class="font-bold text-xl text-secondary flex items-end gap-2">Finance Analytics <Icon icon="ic:outline-analytics" width="32" class="text-amber-500"/></h1>
     <p v-if="store.loading" class="text-center text-secondary text-lg font-semibold">Loading Data...</p>
     <p v-if="store.error" class="text-center text-secondary text-lg font-semibold">Failed to Get Data</p>
     <div class="mt-5 space-y-10">
      <BudgetChart/>
        <ComparisonChart/>
        <CategoryChart/>
     </div>

  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import BudgetChart from '../components/chart/BudgetChart.vue';
import CategoryChart from '../components/chart/categoryChart.vue';
import ComparisonChart from '../components/chart/comparisonChart.vue';
import { useTransactionStore } from '../stores/transaction.store';

const store = useTransactionStore()

</script>
