<script setup lang="ts">
import { ref } from 'vue';
import { Violation } from '../ts/Violation';
import AllianceView from './AllianceView.vue';


defineProps<{
    violation: Violation,
}>()


const collapsed = ref(false)

function toggleAlliance(): void {
    collapsed.value = !collapsed.value
}
</script>

<template>
    
<div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-10">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{violation.theViolation}}</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ violation.summary }}</p>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ violation.certainty }}</p>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ violation.happenedIn.name }}</p>
    <button type="button" class="inline-flex gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" @click="toggleAlliance">
      Details
      <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
    <AllianceView v-if="collapsed" :alliance="violation.happenedIn"/>
</div>

</template>
