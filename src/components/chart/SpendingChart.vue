<template>
  <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
    <h3 class="font-bold">Spending by Category</h3>
    
    <div v-for="item in categories" :key="item.name" class="space-y-1">
      <div class="flex justify-between text-sm">
        <span class="text-slate-500">{{ item.name }}</span>
        <span class="font-semibold">${{ item.val }}</span>
      </div>
      <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div 
          class="h-full rounded-full" 
          :class="item.color"
          :style="{ width: item.percent + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const categories = [
  { name: 'Housing', val: '1,200', percent: 70, color: 'bg-emerald-500' },
  { name: 'Food', val: '650', percent: 40, color: 'bg-amber-500' },
  { name: 'Transport', val: '450', percent: 25, color: 'bg-cyan-500' },
]
</script>