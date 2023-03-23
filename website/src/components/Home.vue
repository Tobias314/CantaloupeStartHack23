<script setup lang="ts">
import AllianceCard from './AllianceCard.vue';


const alliances = [{title: 'Hello, World', description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.' },
{title: 'Hello, World', description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.' },
{title: 'Hello, World', description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.' },
{title: 'Hello, World', description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.' }]

</script>


<template>
    <div class="m-10">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white mb-10"> Clash Royale Alliances Observer </h1>
        <template v-for="alliance in alliances" :key="alliance">
            <AllianceCard :title="alliance.title" :description="alliance.description"/>
        </template>
    </div>
    
</template>
