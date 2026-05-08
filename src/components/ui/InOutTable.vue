<template>
  <div class="overflow-x-auto">
    <table
      class="min-w-full border border-slate-200 rounded-lg overflow-hidden"
    >
      <!-- HEADER -->
      <thead class="bg-primary text-white text-sm">
        <tr class="text-center">
          <th class="p-3">Type</th>
          <th class="p-3">Category</th>
          <th class="p-3">Amount</th>
          <th class="p-3">Description</th>
          <th class="p-3">Date</th>
          <th class="p-3">Action</th>
        </tr>
      </thead>

      <!-- BODY -->
      <tbody class="text-secondary text-sm">
        <tr v-if="items.length === 0">
          <td colspan="6" class="p-5 text-center text-secondary">
            Data is Unavailable
          </td>
        </tr>

        <tr
          v-for="item in items"
          :key="item.id"
          class="border-t border-muted hover:bg-slate-50 transition text-center"
        >
          <td class="p-3 capitalize">{{ item.type }}</td>
          <td class="p-3 capitalize">{{ item.category }}</td>
          <td
            :class="[
              'p-3 font-semibold',
              item.type === 'income' ? 'text-green-600' : 'text-red-600',
            ]"
          >
            {{ currency.format(Number(item.amount)) }}
          </td>
          <td class="p-3">{{ item.description }}</td>
          <td class="p-3">{{ item.date }}</td>

          <td class="p-3 flex justify-center gap-2">
            <button
              class="bg-orange-400 text-white px-3 py-1 rounded-md text-xs hover:scale-105 transition"
              @click="$emit('edit', item)"
            >
              Edit
            </button>

            <button
              class="bg-red-600 text-white px-3 py-1 rounded-md text-xs hover:scale-105 transition"
              @click="$emit('delete', item)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useCurrencyStore } from "../../stores/currency.stores";

const currency = useCurrencyStore()

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["edit", "delete"]);
</script>
