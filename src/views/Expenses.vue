<template>
  <p v-if="stores.loading">Loading...</p>
  <p v-if="stores.error">{{ stores.error }}</p>
  <div class="flex flex-col gap-5 p-5">
    <h1 class="text-secondary font-bold text-xl">Expenses</h1>

    <InOutTable :items="dataIncome" />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useTransactionStore } from "../stores/transaction.store";
import { useCurrency } from "../compossable/useCurrency";
import InOutTable from "../components/ui/InOutTable.vue";


const { format } = useCurrency();
const stores = useTransactionStore();
const dataIncome = computed(() =>
  stores.transactions.filter((p) => p.type === "expense"),
);

onMounted(async () => {
  await stores.fetchTransactions();
});
</script>
