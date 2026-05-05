<template>
  <div
    :class="[
      'flex justify-between p-10 rounded-xl shadow-xl border border-slate-200/70',
      $attrs.class,
    ]"
  >
    <div class="space-y-2">
      <h1 class="text-secondary">{{ text }} <span class="text-xs">{{ span }}</span></h1>
      <p class="text-xl font-bold">{{ currency.format(amount) }}</p>
      <p v-if="percent != null"
        :class="[
          'text-xs font-medium',
          percent >= 0 ? 'text-green-600' : 'text-red-600',
        ]"
      >
        {{ percent >= 0 ? "+" : "" }}{{ percent }}% from last month
      </p>
    </div>

    <div>
      <div :class="['p-2 rounded-full', iconClass]">
        <Icon :icon="icon" width="32" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useCurrencyStore } from "../../stores/currency.stores";

const currency = useCurrencyStore()

const props = defineProps({
  iconClass: String,
  icon: String,
  text: String,
  span: String,
  amount: Number,
  percent: {
    type: Number,
    default: null
  },
});
</script>
