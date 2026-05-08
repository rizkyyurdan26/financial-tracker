<template>
  <div class="flex flex-col p-6 gap-5 w-full">
    <p v-if="stores.loadingCreate || stores.loadingEdit" class="text-secondary text-center">Loading...</p>
    <p v-if="stores.error" class="text-red-500 text-center">{{ stores.error }}</p>

    <h1 class="text-secondary text-xl font-semibold">{{isEdit ? 'Edit Transaction' : 'Add Transaction'}}</h1>

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
        {{ isEdit ? "Update" : "Create" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import CreateForm from "../components/form/CreateForm.vue";
import CreateSelect from "../components/form/createSelect.vue";
import { optionExpense, optionIncome, optionType } from "../stores/optionData";
import { useTransactionStore } from "../stores/transaction.store";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const inputAmount = ref("");
const inputDescription = ref("");
const inputType = ref("");
const inputCategory = ref("");
const inputDate = ref(new Date().toLocaleDateString("en-CA"));
const stores = useTransactionStore();

const dataType = optionType;
const dataIncome = optionIncome;
const dataExpense = optionExpense;

const router = useRouter();
const route = useRoute()
const authStore = useAuthStore()

const isEdit = ref(false)
const isSaved = ref(false)

const optionCategory = computed(() => {
  if (inputType.value === "income") return dataIncome;
  if (inputType.value === "expense") return dataExpense;
  return [];
});

const handleSubmit = async () => {
  const payload = {
    type: inputType.value,
    category: inputCategory.value,
    amount: Number(inputAmount.value),
    description: inputDescription.value,
    date: inputDate.value,
    user_id: authStore.user.id
  };

  if (isEdit.value) {
    // Edit Mode
    if (confirm("Is Edit Ok?")) {
      const idx = route.params.id;
      await stores.editTransaction(idx, payload);
      if (stores.successEdit) {
        alert("Edit Successfully ✅");
        isSaved.value = true
        router.push(`/${inputType.value}`);
        inputType.value = "";
        inputAmount.value = "";
        inputDescription.value = "";
        inputCategory.value = "";
      }
    } else return
  } else {
    // Create Mode
    if (confirm("Is Data Ok?")) {
      await stores.createTransaction(payload);

      if (stores.successCreate) {
        alert("Created Successfully ✅");
        router.push(`/${inputType.value}`);

        inputType.value = "";
        inputAmount.value = "";
        inputDescription.value = "";
        inputCategory.value = "";
      }

    } else return;
  }
};

const handleBeforeUnload = (e) => {
  if (isEdit.value && !isSaved.value){
    e.preventDefault();
    e.retunValue= "Refresh will not save all changes"
  }
}

onMounted(async () => {
  window.addEventListener('beforeunload', handleBeforeUnload)
  const id = route.params.id

  if (id){
    isEdit.value = true

    if (stores.transactions.length === 0){
      await stores.fetchTransactions()
    }

    const editData = stores.transactions.find(item => item.id == id);
  
    if (editData) {
      inputType.value = editData.type;
      inputCategory.value = editData.category;
      inputAmount.value = editData.amount;
      inputDescription.value = editData.description;
      inputDate.value = editData.date;
    } else {
      alert('Transaction not found')
      router.push('/')
    }
  }
});

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

onBeforeRouteLeave((to, from) => {
  if (isEdit.value && !isSaved.value){
    return confirm(
      "Are you sure leave this page?\nAll changes will not be saved."
    );
  }
})

</script>
