<template>
    <footer class="flex flex-col gap-2 items-center w-full border-t border-slate-300 p-4">

            <h1>Need Collaboration?</h1>
            <a href="" @click="handleEmail" target="_blank" class="flex gap-2  items-center text-xs text-blue-800 hover:text-blue-600"> <Icon icon="ic:outline-email"/> Send email </a href="">

      

    </footer>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { useMail } from '../../compossable/useMail';

const handleEmail = useMail

</script>
