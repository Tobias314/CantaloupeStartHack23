<script setup lang="ts">
import { ref } from 'vue';
import { Violation } from '../ts/Violation';
import AllianceView from './AllianceView.vue';


defineProps<{
    violation: Violation,
}>()


const collapsed = ref(false)
const text = ref('Read more')

function toggleAlliance(): void {
    collapsed.value = !collapsed.value
    if(!collapsed.value) {
        text.value = 'Read more'
    } else {
        text.value = 'Hide'
    }
}
</script>

<template>
    
<div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-10">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{violation.theViolation}}<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">in clan {{ violation.happenedIn.name }}</small></h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ violation.summary }}</p>
    <a class="inline-flex items-center text-lg text-blue-600 dark:text-blue-500 hover:underline cursor-pointer" @click="toggleAlliance">
    {{text}}
        <svg class="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
    </a>
    <AllianceView v-if="collapsed" :alliance="violation.happenedIn" class="animate-flash"/>
</div>

</template>
