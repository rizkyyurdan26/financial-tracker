<template>
    <div class="flex flex-col gap-5 p-5">
        <h1 class="font-bold text-xl text-secondary flex gap-2 items-center"><Icon icon="ic:baseline-help-outline" width="32"/>Help and Information</h1>

        <!-- Help -->
        <div class="flex flex-col px-5">
           <h2 class="text-secondary text-lg font-semibold flex gap-2 items-center"><Icon icon="ic:baseline-help-outline"/>Help</h2>
           <p class="text-secondary text-sm">Do you need help?</p>

           <div class="mt-5 px-5">
               <h3 class="text-secondary font-semibold">🔘Forgot Password?</h3>
               <p class="text-secondary px-6">You can reset your password in Login Page</p>
           </div>
           <div class="mt-5 px-5">
               <h3 class="text-secondary font-semibold">🔘Feedback</h3>
               <p class="text-secondary px-6">You can send feedback for collaboration or optimization to: <a href="" @click="handleEmail" class="underline text-blue-600 text-sm">Send Mail</a></p>
           </div>
           
        </div>

        <!-- Information -->
         <div class="flex flex-col px-5">
            <h2 class="text-secondary text-lg font-semibold flex gap-2 items-center"><Icon icon="ic:baseline-info"/>Information</h2>
            <p class="text-secondary text-sm">This is information about this Apps</p>

            <div class="mt-5 px-5">
                <h3 class="text-secondary font-semibold">⚪Total Balance</h3>
                <p class="text-secondary px-6">Total balance is all transaction (All Income - All Expense) started on your first use this Apps</p>
            </div>
            <div class="mt-5 px-5">
                <h3 class="text-secondary font-semibold">⚪Total Income</h3>
                <p class="text-secondary px-6">Total income is all incomes started on your first use this Apps</p>
            </div>
            <div class="mt-5 px-5">
                <h3 class="text-secondary font-semibold">⚪Total Expense</h3>
                <p class="text-secondary px-6">Total expense is all expenses started on your first use this Apps</p>
            </div>
            <div class="mt-5 px-5">
                <h3 class="text-secondary font-semibold">⚪Income</h3>
                <p class="text-secondary px-6">Total income in current month</p>
            </div>
            <div class="mt-5 px-5">
                <h3 class="text-secondary font-semibold">⚪Expense</h3>
                <p class="text-secondary px-6">Total income in current expense</p>
            </div>
            <div class="mt-5 px-5">
                <h3 class="text-secondary font-semibold">⚪Saving</h3>
                <p class="text-secondary px-6">The remaining money you have current month</p>
            </div>
         </div>
        
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { useMail } from '../compossable/useMail';

const handleEmail = useMail

</script>
