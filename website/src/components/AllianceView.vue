<script setup lang="ts">
import { Alliance } from '../ts/Alliance';
import AllianceTable from './AllianceTable.vue';
import ChatLog from './ChatLog.vue';

defineProps<{
    alliance: Alliance,
}>()

</script>

<template>
    
<div class="w-full py-2 bg-white my-5">
    <h3 class="mt-2">{{alliance.name}}</h3>
    <div class="m-10 p-5">
        
        <AllianceTable class=""/>

        
        <ChatLog class="mt-10" :messages="alliance.chatlog"/>
    </div>
</div>

</template>