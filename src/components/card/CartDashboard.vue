<template>
  <div
    :class="[
      'flex justify-between p-10 rounded-xl shadow-xl border border-slate-200/70',
      $attrs.class,
    ]"
  >
    <div class="space-y-2">
      <h1 class="text-secondary">{{ text }}</h1>
      <p class="text-xl font-bold">{{ format(amount) }}</p>
      <p
        :class="[
          'text-xs font-medium',
          percent >= 0 ? 'text-green-600' : 'text-red-600',
        ]"
      >
        {{ percent >= 0 ? '+' : '' }}{{ percent }}% from last month
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
import { useCurrency } from "../../compossable/useCurrency";

const {format} = useCurrency()

const props = defineProps({
  iconClass: String,
  icon: String,
  text: String,
  amount: Number,
  percent: Number,
});
</script>
