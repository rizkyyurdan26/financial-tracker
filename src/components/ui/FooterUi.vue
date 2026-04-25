<template>
    <footer class="flex justify-around items-center w-full border-t border-slate-300 p-4 shrink-0">
        <!-- Left -->
         <div class="text-slate-600">
            <h1>Need Collaboration?</h1>
            <h1>How to reach me?</h1>
         </div>

        <!-- Right -->
         <div class="space-y-2">
            <h1>Contact</h1>
            <a href="" target="_blank" class="flex gap-2  items-center text-xs hover:text-green-600"> <Icon icon="ic:baseline-whatsapp"/> Send Whatsapp </a href="">
            <a href="" target="_blank" class="flex gap-2  items-center text-xs hover:text-blue-600"> <Icon icon="ic:outline-email"/> Send email </a href="">
         </div>

    </footer>
</template>

<script setup>
import { Icon } from '@iconify/vue';


</script>
