<script setup lang="ts">
import { onBeforeMount, ref, toRaw } from 'vue';
import ViolationCard from './ViolationCard.vue';
import { Alliance, Alliances } from '../ts/Alliance';
import { Violation } from '../ts/Violation';


const alliances = ref<Alliances>({})
const violations = ref<Violation[]>([])

async function loadJSON(): Promise<JSON> {
    const dataFetch = await fetch('src/assets/data.json')
    const data = await dataFetch.json()
    return data
}

function allianceToViolation(object: [string, Alliance]): Violation {
    return {
        theViolations: object[1].found_patterns,
        summary: '',
        alliance_id: object[0],
        happenedIn: object[1]
    }

}

onBeforeMount( async () => {
    alliances.value = await loadJSON() as any as Alliances
    violations.value = Object.entries(alliances.value).map(allianceToViolation)
})



</script>


<template>
    <div class="m-10">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white mb-10"> Alliance Behavioral Pattern Recognition </h1>
            <template v-for="violation in violations" :key="violation">
                <ViolationCard :violation="toRaw(violation)"/>
            </template>
    </div>
    
</template>
