<template>
  <div class="flex items-center gap-2">
    <input
      type="date"
      v-model="start"
      class="border border-muted rounded-lg px-3 py-1.5 text-sm text-secondary outline-none focus:ring-2 focus:ring-primary"
    />

    <span class="text-secondary text-sm">to</span>

    <!-- Input Tanggal Akhir -->
    <input
      type="date"
      v-model="end"
      class="border border-muted rounded-lg px-3 py-1.5 text-sm text-secondary outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
</template>

<script setup>
const start = defineModel("start");
const end = defineModel("end");
</script>
