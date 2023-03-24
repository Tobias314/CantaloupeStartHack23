<script setup lang="ts">
import { Alliance } from '../ts/Alliance';
import AllianceTable from './AllianceTable.vue';
import ChatLog from './ChatLog.vue';

defineProps<{
    alliance: Alliance,
    allianceId: string
}>()

</script>

<template>
    
<div class="w-full py-2 my-5 ">
    <div class="my-10 py-5">
        <AllianceTable :alliance="alliance" :users="alliance.alliance_account_summaries" class=""/>
        <ChatLog class="mt-10" :messages="alliance.protocol"/>
    </div>
</div>

</template>