<template>
  <div class="flex flex-col gap-2 text-secondary w-full">
    <label class="">{{ labelText }} <span v-if="required" class="text-red-500">*</span></label>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="model"
      :required="required"
      class="border p-2 rounded-lg border-muted focus:outline-slate-400"
    />
  </div>
</template>

<script setup>
const model = defineModel();

const props = defineProps({
  labelText: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  required:{
    type:Boolean,
    default:false
  },
});
</script>
