<template>
  <div class="flex flex-col gap-5 p-5">
    <h1 class="font-bold text-xl text-secondary flex items-end gap-2">Income<Icon icon="mdi:cash-multiple" width="32" class="text-green-500 "/></h1>
    <p v-if="stores.loading" class="text-secondary text-center">Loading Data...</p>
    <p v-if="stores.error">{{ stores.error }}</p>

    <InOutTable :items="dataIncome" @delete="handleDelete" @edit="handleEdit" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useTransactionStore } from "../stores/transaction.store";
import { useCurrency } from "../compossable/useCurrency";
import InOutTable from "../components/ui/InOutTable.vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

const { format } = useCurrency();
const stores = useTransactionStore();
const router = useRouter();

const dataIncome = computed(() =>
  stores.transactions.filter((p) => p.type === "income"),
);

const handleDelete = async (id) => {
  if (confirm("Delete this data?")) {
    await stores.deleteTransaction(id);
    if (stores.successDelete) {
      alert("Deleted successfully ✅");
    }
  }
};

const handleEdit = (item) => {
  if (confirm("Edit this data?")) {
    stores.dataEdit = item;
    router.push("/edit");
  }
};

onMounted(async () => {
  await stores.fetchTransactions();
});
</script>
