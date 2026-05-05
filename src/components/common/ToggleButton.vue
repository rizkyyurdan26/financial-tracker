<template>
  <div class="flex items-center bg-slate-100 p-1 rounded-lg w-fit">
    
    <label 
      v-for="c in currencies" 
      :key="c" 
      class="relative cursor-pointer select-none"
    >
      <input
        type="radio"
        name="currency"
        :value="c"
        v-model="currencyStore.currency"
        class="sr-only"
      />
      
      <div
        class="px-3 py-1 text-[11px] font-bold rounded-md transition-all duration-300"
        :class="
          currencyStore.currency === c 
            ? 'bg-white text-emerald-600 shadow-sm' 
            : 'text-slate-400 hover:text-slate-600'
        "
      >
        {{ c }}
      </div>
    </label>

  </div>
</template>

<script setup>
import { useCurrencyStore } from '../../stores/currency.stores';



const currencyStore = useCurrencyStore();

const currencies = ["IDR", "USD", "EUR", "MYR", 'JPY'];
</script>