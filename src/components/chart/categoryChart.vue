<template>
  <div>
    <h2 class="text-xl font-semibold text-secondary mb-5 text-center mt-5">Transaction Reports</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Income -->
      <div class="bg-white p-4 rounded-2xl shadow">
        <h2 class="text-sm font-semibold mb-3 text-green-600">Income</h2>

        <div style="height: 220px">
          <Pie
            v-if="income.chart"
            :data="income.chart"
            :options="options"
            :plugins="[labelPlugin]"
          />
          
          <p v-else class="text-center text-slate-400 mt-20 text-sm">Data not found</p>
        </div>

        <div v-if="income.legend.length" class="mt-3 max-h-64 overflow-y-auto text-sm space-y-2">
          <div v-for="item in income.legend" :key="item.label">
            <div class="flex justify-between mb-1">
              <span>{{ item.label }}</span>
              <span>{{ item.percent }}%</span>
            </div>

            <div class="w-full bg-gray-200 rounded h-2">
              <div
                class="h-2 rounded"
                :style="{
                  width: item.percent + '%',
                  backgroundColor: item.color,
                }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Expense -->
      <div class="bg-white p-4 rounded-2xl shadow">
        <h2 class="text-sm font-semibold mb-3 text-red-500">Expense</h2>

        <div style="height: 220px">
          <Pie
            v-if="expense.chart"
            :data="expense.chart"
            :options="options"
            :plugins="[labelPlugin]"
          />
          
          <p v-else class="text-center text-slate-400 mt-20 text-sm">Data not found</p>
        </div>

        <div v-if="expense.legend.length" class="mt-3 max-h-64 overflow-y-auto text-sm space-y-2">
          <div v-for="item in expense.legend" :key="item.label">
            <div class="flex justify-between mb-1">
              <span>{{ item.label }}</span>
              <span>{{ item.percent }}%</span>
            </div>

            <div class="w-full bg-gray-200 rounded h-2">
              <div
                class="h-2 rounded"
                :style="{
                  width: item.percent + '%',
                  backgroundColor: item.color,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { Pie } from "vue-chartjs";
import { useTransactionStore } from "../../stores/transaction.store";
import { useFilterStore } from "../../stores/filter.store"; // 1. Import Store Filter

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const store = useTransactionStore();
const filterStore = useFilterStore(); // 2. Inisialisasi

// FLEXIBLE COLOR GENERATOR
const generateColors = (count, baseHue) => {
  return Array.from({ length: count }, (_, i) => {
    const hue = (baseHue + i * 35) % 360;
    return `hsl(${hue}, 70%, 55%)`;
  });
};

// 🔥 plugin label %
const labelPlugin = {
  id: "labelPlugin",
  afterDraw(chart) {
    const { ctx } = chart;
    const data = chart.data.datasets[0].data;
    const total = data.reduce((a, b) => a + b, 0);

    chart.getDatasetMeta(0).data.forEach((arc, i) => {
      const val = data[i];
      if (!val) return;

      const percent = ((val / total) * 100).toFixed(0);
      const { x, y } = arc.tooltipPosition();

      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(percent + "%", x, y);
    });
  },
};

// 🔥 generator utama (FIX: Pakai data dari filterStore)
const generate = (type) => {
  const map = {};

  // 3. Ubah bagian ini jadi filterStore.filtered
  filterStore.filtered.forEach((t) => {
    // Pakai toLowerCase() buat jaga-jaga kalau tulisan di database beda huruf besar/kecil
    if (t.type?.toLowerCase() !== type.toLowerCase()) return;
    map[t.category] = (map[t.category] || 0) + Number(t.amount);
  });

  const entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return { chart: null, legend: [] };

  const total = entries.reduce((a, b) => a + b[1], 0);

  const labels = entries.map((e) => e[0]);
  const values = entries.map((e) => e[1]);

  //  warna beda base
  const colors = generateColors(
    entries.length,
    type === "income" ? 130 : 5 // hijau vs orange
  );

  const legend = entries.map(([label, val], i) => ({
    label,
    percent: ((val / total) * 100).toFixed(1),
    color: colors[i],
  }));

  return {
    chart: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    },
    legend,
  };
};

const income = computed(() => generate("income"));
const expense = computed(() => generate("expense"));

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
};

onMounted(() => {
  if (!store.transactions.length) {
    store.fetchTransactions();
  }
});
</script>