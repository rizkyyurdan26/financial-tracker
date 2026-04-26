<template>
  <router-link
    :to="href"
    :title="isCollapse ? `${text}` : ''"
    :class="[
      'flex p-2 text-slate-600 hover:text-white hover:bg-cyan-600 rounded-lg transition duration-300',
      isCollapse ? 'justify-center' : 'gap-2',
    ]"
    exact-active-class="bg-cyan-600 text-white"
  >
    <Icon :icon="icon" width="24" height="24" :class="['', $attrs.class]" />
    <span v-if="!isCollapse">{{ text }}</span>
  </router-link>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  icon: String,
  text: String,
  href: String,
  isCollapse: Boolean,
});
</script>
