<script setup lang="ts">
import { Alliance } from '../ts/Alliance';
import ChatLog from './ChatLog.vue';

defineProps<{
    alliance: Alliance,
}>()

</script>

<template>
    
<div class="w-full py-2 bg-white my-5">
    <h5 class="mby-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{alliance.name}}</h5>
    <ChatLog :messages="alliance.chatlog"/>
</div>

</template>