import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useTransactionStore } from "./transaction.store";

export const useFilterStore = defineStore("filter", () => {
  const txStore = useTransactionStore();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const startDate = ref(formatDate(firstDayOfMonth));
  const endDate = ref(formatDate(lastDayOfMonth));

  const filtered = computed(() => {
    if (!startDate.value || !endDate.value) return [];

    const start = new Date(startDate.value);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate.value);
    end.setHours(23, 59, 59, 999);

    return txStore.transactions.filter((t) => {
      const txDate = new Date(t.date);
      return txDate >= start && txDate <= end;
    });
  });

  return { startDate, endDate, filtered };
});