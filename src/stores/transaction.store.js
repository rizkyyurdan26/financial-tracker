import { defineStore } from "pinia";
import { ref } from "vue";
import { transactionService } from "../services/transaction.services";
import { dummyData } from "./dummyData";

export const useTransactionStore = defineStore("transaction", () => {
  const transactions = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const loadingCreate = ref(false);
  const successCreate = ref(false);

  const loadingDelete = ref(false);
  const successDelete = ref(false);

  const loadingEdit = ref(false);
  const successEdit = ref(false);

  async function fetchTransactions() {
    loading.value = true;
    error.value = null;

    const token = localStorage.getItem("access_token");

    if (!token) {
      transactions.value = dummyData;
      loading.value = false;
      return;
    }

    try {
      const data = await transactionService.getAll();
      transactions.value = data;
    } catch (err) {
      console.error("API Fetch Error, falling back to dummy:", err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("access_token"); 
        transactions.value = dummyData;
        error.value = null; 
      } else {
        error.value =
          err.response?.data?.message || err.message || "Failed get data";
      }
    } finally {
      loading.value = false;
    }
  }

  async function createTransaction(payload) {
    loadingCreate.value = true;
    successCreate.value = false;
    error.value = null;

    try {
      const data = await transactionService.create(payload);
      transactions.value.unshift(data);
      successCreate.value = true;
      return data;
    } catch (err) {
      successCreate.value = false;
      // console.log(err.response.data);
      error.value =
        err.response?.data?.message || err.message || "Failed to create";
    } finally {
      loadingCreate.value = false;
    }
  }

  async function deleteTransaction(id) {
    loadingDelete.value = true;
    successDelete.value = false;
    error.value = null;

    try {
      await transactionService.delete(id);

      transactions.value = transactions.value.filter((p) => p.id !== id);
      successDelete.value = true;
    } catch (err) {
      successDelete.value = false;
      error.value =
        err.response?.data?.message || err.message || "Delete Failed";
      // console.log(err);
    } finally {
      loadingDelete.value = false;
    }
  }

  async function editTransaction(id, payload) {
    loadingEdit.value = true;
    successEdit.value = false;
    error.value = null;

    try {
      const data = await transactionService.edit(id, payload);
      const idx = transactions.value.findIndex((p) => p.id == id);

      if (idx !== -1) {
        transactions.value[idx] = { ...transactions.value[idx], ...payload };
      }
      successEdit.value = true;
      return data;
    } catch (err) {
      error.value = err.response?.data?.message || err.message || "Edit Failed";
    } finally {
      loadingEdit.value = false;
    }
  }

  return {
    transactions,
    loading,
    error,
    loadingCreate,
    successCreate,
    loadingDelete,
    successDelete,
    loadingEdit,
    successEdit,

    fetchTransactions,
    createTransaction,
    deleteTransaction,
    editTransaction,
  };
});
