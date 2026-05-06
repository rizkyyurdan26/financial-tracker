<template>
  <div :class="['flex items-center text-slate-600 gap-3 border-t border-slate-300 p-8.5', isCollapse ? 'justify-center p-10.5' : 'justify-between']">
    
    <Icon v-if="!isCollapse" :icon="profileIcon" width="24" class="shrink-0" />
    
    <div class="flex-1 min-w-0" v-if="!isCollapse">
      <h1 class="text-sm font-semibold truncate">{{ text }}</h1>
      <p class="text-xs truncate ">{{ email }}</p>
    </div>
    
    <button @click.prevent="$emit('logout')" class="shrink-0 cursor-pointer hover:text-red-500 duration-300">
      <Icon :icon="logOutIcon" width="20" />
    </button>

  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  text: String,
  email: String,
  profileIcon: String,
  logOutIcon: String,
  isCollapse: Boolean,
});

defineEmits(['logout']);
</script>