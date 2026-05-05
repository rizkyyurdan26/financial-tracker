<template>
  <div class="bg-white p-4 rounded-2xl shadow">
    <h2 class="text-sm font-semibold text-secondary mb-5">Times Report</h2>

    <div class="relative h-60">
      <Line
        v-if="chartData"
        :key="chartKey"
        :data="chartData"
        :options="options"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { Line } from "vue-chartjs";
import { useTransactionStore } from "../../stores/transaction.store";
import { useFilterStore } from "../../stores/filter.store";
import { useCurrencyStore } from "../../stores/currency.stores";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const store = useTransactionStore();
const filterStore = useFilterStore();
const currency = useCurrencyStore();

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// 🔥 Key integer — increment = Vue paksa destroy & recreate
const chartKey = ref(0);

watch(
  () => currency.currency,
  () => { chartKey.value++; }
);

const chartData = computed(() => {
  if (!filterStore.filtered.length) return null;

  const map = {};
  months.forEach((_, i) => {
    map[i] = { income: 0, expense: 0 };
  });

  filterStore.filtered.forEach((t) => {
    const d = new Date(t.date);
    const key = d.getMonth();
    const type = t.type?.toLowerCase();
    if (type === "income" || type === "expense") {
      map[key][type] += +t.amount;
    }
  });

  return {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: months.map((_, i) => map[i]?.income || 0),
        borderColor: "#0891b2",
        backgroundColor: "#0891b2",
        tension: 0.4,
      },
      {
        label: "Expense",
        data: months.map((_, i) => map[i]?.expense || 0),
        borderColor: "#ef4444",
        backgroundColor: "#ef4444",
        tension: 0.4,
      },
    ],
  };
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
    tooltip: {
      callbacks: {
        label: (context) => {
          let label = context.dataset.label || "";
          if (label) label += ": ";
          if (context.parsed.y !== null) {
            label += currency.format(context.parsed.y);
          }
          return label;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        // 🔥 Closure ini capture currency store langsung
        callback: (value) => currency.format(Number(value)),
      },
    },
  },
};

onMounted(() => {
  if (!store.transactions.length) {
    store.fetchTransactions();
  }
});
</script>