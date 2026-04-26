<template>
  <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
    <Line :data="data" :options="options" />
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
  datasets: [
    {
      label: 'Income',
      data: [40, 30, 50, 45, 60, 55],
      borderColor: '#10b981', // Emerald
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4 // Biar garisnya melengkung halus
    },
    {
      label: 'Expenses',
      data: [20, 25, 15, 30, 20, 25],
      borderColor: '#ef4444', // Red
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      fill: true,
      tension: 0.4
    }
  ]
}

const options = { responsive: true, plugins: { legend: { display: false } } }
</script>