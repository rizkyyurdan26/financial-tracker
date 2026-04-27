<template>
  <div class="bg-white p-4 rounded-2xl shadow">
  
  <!-- Filter -->
  <h2 class="text-sm font-semibold text-secondary mb-5">
      Times Report
    </h2>
  <div class="flex gap-2 items-center mb-2">
    <select v-model="mode" class="border border-muted focus:outline-muted focus:ring-muted focus:border-muted px-2 py-1 rounded-lg text-xs">
      <option value="day">Daily</option>
      <option value="week">Weekly</option>
      <option value="month">Monthly</option>
      <option value="year">Yearly</option>
    </select>
  </div>

  <!-- Chart wrapper -->
  <div class="relative h-60">
    <Line v-if="chartData" :data="chartData" :options="options" />
  </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import { useTransactionStore } from '../../stores/transaction.store'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

const store = useTransactionStore()

const mode = ref('month')

// 🔥 helper month label (biar selalu ada Jan-Dec)
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

// 🔥 main pivot logic
const chartData = computed(() => {
  if (!store.transactions.length) return null

  const map = {}

  // PRE-FILL untuk MONTH biar selalu 12 bulan
  if (mode.value === 'month') {
    months.forEach((m, i) => {
      map[i] = { income: 0, expense: 0 }
    })
  }

  store.transactions.forEach(t => {
    const d = new Date(t.date)

    let key

    if (mode.value === 'day') {
      key = d.toISOString().split('T')[0]
    }

    if (mode.value === 'week') {
      const first = new Date(d.setDate(d.getDate() - d.getDay()))
      key = first.toISOString().split('T')[0]
    }

    if (mode.value === 'month') {
      key = d.getMonth() // 0 - 11
    }

    if (mode.value === 'year') {
      key = d.getFullYear()
    }

    if (!map[key]) {
      map[key] = { income: 0, expense: 0 }
    }

    map[key][t.type] += +t.amount
  })

  let labels = Object.keys(map)

  //  handling label khusus
  if (mode.value === 'month') {
    labels = months
  } else {
    labels = labels.sort()
  }

  return {
    labels,
    datasets: [
      {
        label: 'Income',
        data: labels.map((l, i) => {
          if (mode.value === 'month') return map[i]?.income || 0
          return map[l]?.income || 0
        }),
        backgroundColor: '#0891b2',
        borderColor: '#0891b2',
        tension: 0.4
      },
      {
        label: 'Expense',
        data: labels.map((l, i) => {
          if (mode.value === 'month') return map[i]?.expense || 0
          return map[l]?.expense || 0
        }),
        backgroundColor: '#ef4444',
        borderColor: '#ef4444',
        tension: 0.4
      }
    ]
  }
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: v => 'Rp ' + v.toLocaleString()
      }
    }
  }
}

onMounted(() => {
  if (!store.transactions.length) {
    store.fetchTransactions()
  }
})
</script>