<script setup lang="ts">
import { Users, User } from '../ts/User';
import { Alliance } from '../ts/Alliance';


const props = defineProps<{
    alliance: Alliance,
    users: Users,
}>()

// eslint-disable-next-line camelcase
const id_user: any = Object.entries(props.users)

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
                    v-for="user_and_id, index in id_user" :key="user_and_id"
                    class="border-b transition duration-300 ease-in-out hover:bg-slate-50 " :class="index % 2 != 0? 'bg-slate-100 dark:bg-slate-700' : 'bg-white dark:bg-slate-600'">
                    <td class="whitespace-nowrap px-3 py-4 font-medium">{{user_and_id[0]}}</td>
                    <td class="whitespace-nowrap px-3 py-4">{{user_and_id[1].level}}</td>
                    <td class="whitespace-nowrap px-6 py-4">{{ (user_and_id[1].time_existent / 1000 / 60 / 60/ 24).toFixed(2) }} Days</td>
                    <td class="whitespace-nowrap px-6 py-4">{{user_and_id[1].revenue_today}}$ / {{ user_and_id[1].revenue }}$</td>
                    <td class="whitespace-nowrap px-6 py-4">{{(user_and_id[1].session_duration_today)?.toFixed(2)}}h / {{ (user_and_id[1].session_duration)?.toFixed(2) }}h</td>
                    <td class="whitespace-nowrap px-6 py-4">{{user_and_id[1].risk?.toFixed(2)}}</td>
                </tr>

                <tr
                    class="border-b transition duration-300 ease-in-out  bg-slate-200"></tr>
                <tr
                    class="border-b transition duration-300 ease-in-out bg-slate-200">
                    <td class="whitespace-nowrap px-3 py-4 font-medium"></td>
                    <td class="whitespace-nowrap px-3 py-4"></td>
                    <td class="whitespace-nowrap px-6 py-4"></td>
                    <td class="whitespace-nowrap px-6 py-4"></td>
                    <td class="whitespace-nowrap px-6 py-4"></td>
                    <td class="whitespace-nowrap px-6 py-4">{{ alliance.risk.toFixed(2) }}</td>
                </tr>

                </tbody>
            </table>
            </div>
        </div>
        </div>
    </div>

    </div>
    
</template>

