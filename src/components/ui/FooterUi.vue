<template>
  <footer
    class="flex flex-col gap-1 items-center w-full border-t border-slate-300 p-4"
  >
    <h1 class="text-secondary">How to reach me?</h1>
    <h1 class="text-secondary">Need collaboration?</h1>
    <a
      href=""
      @click="handleEmail"
      target="_blank"
      class="flex gap-2 items-center text-sm text-blue-800 hover:text-blue-600"
    >
      <Icon icon="ic:outline-email" /> Send email
    </a>
  </footer>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useMail } from "../../compossable/useMail";

const handleEmail = useMail;
</script>
