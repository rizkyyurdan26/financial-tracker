<template>
  <div class="flex flex-col gap-2 text-secondary">
    <label class="">{{ label }} <span v-if="required" class="text-red-500">*</span></label>
    <select v-model="model" class="border border-muted rounded-lg p-2 focus:outline-muted text-sm" :required="required">
      <option value="" disabled>{{ placeholder }}</option>

      <option v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
const model = defineModel();

const props = defineProps({
  label: String,
  placeholder: {
    type: String,
    default: "Choose",
  },

  options: {
    type: Array,
    default: () => [],
  },

  required:{
    type:Boolean,
    default:false
  }
});
</script>
