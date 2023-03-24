<script setup lang="ts">
import { ref } from 'vue';
import { Violation } from '../ts/Violation';
import AllianceView from './AllianceView.vue';
import QuickActions from './QuickActions.vue'
import { Patterns, Pattern } from '../ts/Pattern';


const props = defineProps<{
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

function violationNames(pattern: Patterns): string[] {
    return Object.entries(pattern).map((entry: [string, Pattern]) => Object.entries(Object.entries(entry[1])[0])[0][1] as unknown as string)
}

const names = ['join_hate_leave', 'offended_leave', 'join_kick_join_kick']
const textColors = ['text-red-400', 'text-yellow-400', 'text-blue-400']
const mainColors = ['bg-red-100', 'bg-yellow-100', 'bg-blue-100']
const borderColors= ['border-red-800', 'border-yellow-800','border-blue-800']

function nameToColors(name: string) {
    const index = names.indexOf(name)% names.length
    return textColors[index ] + ' ' + mainColors[index ] + ' ' + borderColors[index ]
}
</script>

<template>
    
<div :id="violation.alliance_id" class="grid grid-cols-8 my-10 ">
    <div class="p-6 border border-b-4 border-blue-200 rounded-lg shadow col-span-7 overflow-x-auto flex flex-col">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{Object.entries(violation.theViolations).length}} Violations <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">in clan {{ violation.alliance_id }}</small></h5>
        <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">{{ violation.summary }}</p>

        <div class="flex flex-row mb-2">   
            <div 
        v-for="name in violationNames(violation.theViolations)" :key="name"
        class="flex w-60 shrink-0 p-2 m-2 text-sm border rounded-lg" :class="nameToColors(name)" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <div>
                <span class="font-medium">Recognized: </span> {{ name }}.
            </div>
            
            </div>
            
        </div>
        

        <a class="inline-flex items-center text-lg text-blue-600 dark:text-blue-500 hover:underline cursor-pointer" @click="toggleAlliance">
        {{text}}
            <svg class="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        </a>
        <AllianceView v-if="collapsed" :alliance-id="violation.alliance_id" :alliance="violation.happenedIn" class="animate-flash"/>
    </div>
    <QuickActions :violation="violation"/>
</div>


</template>
