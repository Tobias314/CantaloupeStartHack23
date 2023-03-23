<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Violation } from '../ts/Violation';
import ViolationCard from './ViolationCard.vue';

const violations = ref<Violation[]>([])

async function loadJSON(): Promise<JSON> {
    const response = await fetch('src/assets/example.json');
    const json = await response.json();
    return json
}

onBeforeMount( async () => {
    violations.value = await loadJSON() as any as Violation[]
})


</script>


<template>
    <div class="m-10">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white mb-10"> Clash Royale Alliances Observer </h1>
        <template v-for="violation in violations" :key="violation">
            <ViolationCard :violation="violation"/>
        </template>
    </div>
    
</template>
