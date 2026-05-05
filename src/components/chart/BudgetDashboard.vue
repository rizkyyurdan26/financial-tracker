<template>
  <div class="bg-white p-5 rounded-2xl shadow space-y-4  ">
    <!-- Title -->
    <h2 class="text-lg font-semibold  text-secondary">Available Budget (This Month)</h2>

    <!-- Info -->
    <div class="flex justify-between text-sm text-slate-500">
      <span>Income: {{ currency.format(income) }}</span>
      <span>Expense: {{ currency.format(expense) }}</span>
    </div>

    <!-- Progress Bar -->
    <div class="relative w-full h-5 bg-slate-200 rounded-full overflow-hidden">
      <!-- Active bar -->
      <div
        class="h-full transition-all duration-500 flex items-center justify-center"
        :style="{
          width: remainingPercent + '%',
          background: barGradient,
        }"
      >
        <!-- % inside -->
        <span class="text-sm font-semibold text-white drop-shadow">
          {{ remainingPercent.toFixed(0) }}%
        </span>
      </div>
    </div>

    <!-- Remaining money -->
    <p class="text-md text-center text-secondary">
      Remaining: {{ currency.format(remainingMoney) }}
    </p>

    <!-- Remining Color -->
    <div class="flex justify-end items-center gap-3 text-sm">
      <div class="flex items-center gap-1">
        <div class="w-2 h-2 rounded-full bg-green-500"></div>
        <span class="text-slate-400"> > 50%</span>
      </div>

      <div class="flex items-center gap-1">
        <div class="w-2 h-2 rounded-full bg-yellow-400"></div>
        <span class="text-slate-400">25–50%</span>
      </div>

      <div class="flex items-center gap-1">
        <div class="w-2 h-2 rounded-full bg-red-500"></div>
        <span class="text-slate-400"> < 25%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTransactionStore } from "../../stores/transaction.store"; 
import { useCurrencyStore } from "../../stores/currency.stores";

const currency = useCurrencyStore()
const store = useTransactionStore();

const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();

const thisMonthData = computed(() => {
  return store.transactions.filter((t) => {
    if (!t.date) return false; 
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });
});

const income = computed(() => {
  return thisMonthData.value
    .filter((t) => t.type?.toLowerCase() === "income")
    .reduce((a, b) => a + Number(b.amount || 0), 0);
});

const expense = computed(() => {
  return thisMonthData.value
    .filter((t) => t.type?.toLowerCase() === "expense")
    .reduce((a, b) => a + Number(b.amount || 0), 0);
});

const remainingPercent = computed(() => {
  if (!income.value) return 0;
  return Math.max(0, ((income.value - expense.value) / income.value) * 100);
});

const remainingMoney = computed(() => {
  return income.value - expense.value;
});

const barGradient = computed(() => {
  if (remainingPercent.value > 50)
    return "linear-gradient(to right, #22c55e, #16a34a)"; 

  if (remainingPercent.value > 25)
    return "linear-gradient(to right, #facc15, #eab308)"; 

  return "linear-gradient(to right, #f87171, #ef4444)"; 
});
</script>