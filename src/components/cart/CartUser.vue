<template>
  <div :class="['flex items-center text-slate-600 gap-3 border-t border-slate-300 p-8.5', isCollapse ? 'justify-center p-10.5' : 'justify-between']">
    
    <Icon v-if="!isCollapse" :icon="profileIcon" width="24" class="shrink-0" />
    
    <div class="flex-1 min-w-0" v-if="!isCollapse">
      <h1 class="text-sm font-semibold truncate">{{ text }}</h1>
      <p class="text-xs truncate ">{{ email }}</p>
    </div>
    
    <a :href="href" class="shrink-0">
      <Icon :icon="logOutIcon" width="20" />
    </a>

  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  text: String,
  href: String,
  email: String,
  profileIcon: String,
  logOutIcon: String,
  isCollapse: Boolean,
});
</script>
