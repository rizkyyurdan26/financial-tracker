<template>
  <div class="flex flex-col p-6 gap-5">
    <p v-if="stores.loadingCreate">Loading...</p>
    <p v-if="stores.error">{{ stores.error }}</p>

    <h1 class="text-secondary text-xl font-semibold">Add Transaction</h1>

    <form @submit.prevent="handleSubmit" class="md:max-w-[50%] space-y-5">
      <CreateSelect
        label="Type"
        v-model="inputType"
        :options="dataType"
        required
      />
      <CreateSelect
        label="Category"
        v-model="inputCategory"
        :options="optionCategory"
        required
      />
      <CreateForm
        labelText="Amount (Rp)"
        placeholder="ex: 200000"
        type="number"
        v-model="inputAmount"
        required
      />
      <CreateForm
        labelText="Transaction Date"
        placeholder="ex: 200000"
        type="date"
        v-model="inputDate"
        required
      />
      <CreateForm
        labelText="Description"
        placeholder="ex: beli pizza"
        v-model="inputDescription"
      />
      <button
        type="submit"
        class="bg-primary text-white font-semibold py-1 px-4 rounded hover:cursor-pointer hover:scale-105 transform duration-300"
      >
        Create
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import CreateForm from "../components/form/CreateForm.vue";
import CreateSelect from "../components/form/createSelect.vue";
import { optionExpense, optionIncome, optionType } from "../stores/optionData";
import { useTransactionStore } from "../stores/transaction.store";

const inputAmount = ref("");
const inputDescription = ref("");
const inputType = ref("");
const inputCategory = ref("");
const inputDate = ref(new Date().toLocaleDateString("en-CA"));
const stores = useTransactionStore();

const dataType = optionType;
const dataIncome = optionIncome;
const dataExpense = optionExpense;

const optionCategory = computed(() => {
  if (inputType.value === "income") return dataIncome;
  if (inputType.value === "expense") return dataExpense;
  return [];
});

watch(
  () => stores.successCreate,
  (val) => {
    if (val) {
      alert(val);
      stores.successCreate = "";
    }
  }
);

const handleSubmit = () => {
  const payload = {
    type: inputType.value,
    category: inputCategory.value,
    amount: Number(inputAmount.value),
    description: inputDescription.value,
    date: inputDate.value,
  };

  if (confirm("Is Data Ok?")) {
    stores.createTransaction(payload);
  } else return;

  inputType.value = "";
  inputAmount.value = "";
  inputDescription.value = "";
  inputCategory.value = "";
};
</script>
