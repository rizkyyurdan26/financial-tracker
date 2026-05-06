<template>
  <div class="flex flex-col gap-5 p-5">
    <h1 class="font-bold text-xl text-secondary flex items-end gap-2">
      Income<Icon icon="mdi:cash-multiple" width="32" class="text-green-500" />
    </h1>
    <p v-if="stores.loading" class="text-secondary text-center">
      Loading Data...
    </p>
    <p v-if="stores.error" class="text-red-500 text-center">
      Failed to Get Data
    </p>

    <div v-if="!stores.error && !stores.loading" class="space-y-5">
      <div class="space-y-1" v-if="authStore.token">
        <p class="text-secondary">Filter:</p>
        <FilterAnalytic
          v-model:start="filterStore.startDate"
          v-model:end="filterStore.endDate"
        />
        <InOutTable
          :items="dataIncome"
          @delete="handleDelete"
          @edit="handleEdit"
        />
      </div>

      <div v-else>
        <p class="text-center text-secondary text-xl">Please Login</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useTransactionStore } from "../stores/transaction.store";
import InOutTable from "../components/ui/InOutTable.vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import FilterAnalytic from "../components/filter/FilterAnalytic.vue";
import { useFilterStore } from "../stores/filter.store";
import { useAuthStore } from "../stores/auth.store";

const stores = useTransactionStore();
const router = useRouter();
const filterStore = useFilterStore();
const authStore = useAuthStore();

const dataIncome = computed(() =>
  filterStore.filtered
    .filter((p) => p.type?.toLowerCase() === "income")
    .sort((a, b) => new Date(b.date) - new Date(a.date)),
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
