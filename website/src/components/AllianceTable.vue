<script setup lang="ts">

const users = [{id: '3695a4fe1546b3a9879c14ddbfb509ad714dc6e9f3735516944519ac22329aac', level: 33, paidToday: 0.0, paidTotal: 300, timePlayedToday: 0.34, timePlayedTotal: 120.22, existingFor: 203, meanRiskToday: 2.6},
{id: '3695a4fe1546b3a9879c14ddbfb509ad714dc6e9f3735516944519ac22329aac', level: 33, paidToday: 0.0, paidTotal: 300, timePlayedToday: 0.34, timePlayedTotal: 120.22, existingFor: 203, meanRiskToday: 2.6},
{id: '3695a4fe1546b3a9879c14ddbfb509ad714dc6e9f3735516944519ac22329aac', level: 33, paidToday: 0.0, paidTotal: 300, timePlayedToday: 0.34, timePlayedTotal: 120.22, existingFor: 203, meanRiskToday: 2.6}]

</script>
<template>
    <div class="mb-5"> 
        <h3>Users</h3>
        <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
            <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b font-medium dark:border-slate-500 bg-slate-100">
                <tr>
                    <th scope="col" class="px-3 py-4">ID</th>
                    <th scope="col" class="px-3 py-4">Level</th>
                    <th scope="col" class="px-6 py-4">Days Account Exists</th>
                    <th scope="col" class="px-6 py-4">Paid Today / Total</th>
                    <th scope="col" class="px-6 py-4">Game Time today / Total</th>
                    <th scope="col" class="px-6 py-4">Today's Mean Risk</th>
                    
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="user, index in users" :key="user"
                    class="border-b transition duration-300 ease-in-out hover:bg-slate-50 dark:border-slate-500 dark:hover:bg-slate-600" :class="index % 2 != 0? 'bg-slate-100 dark:bg-slate-700' : 'bg-white dark:bg-slate-600'">
                    <td class="whitespace-nowrap px-3 py-4 font-medium">{{user.id}}</td>
                    <td class="whitespace-nowrap px-3 py-4">{{user.level}}</td>
                    <td class="whitespace-nowrap px-6 py-4">{{user.existingFor}}</td>
                    <td class="whitespace-nowrap px-6 py-4">{{user.paidToday}}$ / {{ user.paidTotal }}$</td>
                    <td class="whitespace-nowrap px-6 py-4">{{user.timePlayedToday}}h / {{ user.timePlayedTotal }}h</td>
                    <td class="whitespace-nowrap px-6 py-4">{{user.meanRiskToday}}</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </div>

    </div>
    
</template>

