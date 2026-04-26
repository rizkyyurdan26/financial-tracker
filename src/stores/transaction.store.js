import { defineStore } from "pinia";
import { ref } from "vue";
import { transactionService } from "../services/transaction.services";

export const useTransactionStore = defineStore("transaction", () => {
  const transactions = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const loadingCreate = ref(false);
  const successCreate = ref("");

  async function fetchTransactions() {
    loading.value = true;
    error.value = null;
    try {
      const data = await transactionService.getAll();
      transactions.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  async function createTransaction(payload) {
    loadingCreate.value = true;
    error.value = null;

    try {
      const data = await transactionService.create(payload);
      transactions.value.unshift(data);
      successCreate.value = "Created successfully ✅";
      return data;
    } catch (err) {
      console.log(err.response.data);
      error.value =
        err.response?.data?.error_description ||
        err.response?.data?.message ||
        "Failed to create";
    } finally {
      loadingCreate.value = false;
    }
  }

  return {
    transactions,
    loading,
    error,
    loadingCreate,
    successCreate,
    fetchTransactions,
    createTransaction,
  };
});
