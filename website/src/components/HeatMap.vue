<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { HeatMap } from '../ts/HeatMapViz';
import { Users } from '../ts/User';
import { TooltipModel } from '../ts/TooltipModel';
import Tooltip from './Tooltip.vue';

const props = defineProps<{
    users: Users,
    containerName: string, 
}>()

const tooltipModel = reactive(new TooltipModel())

onMounted(() => {
    new HeatMap('#'+ props.containerName, props.users, tooltipModel)
})
</script>

<template>
        <Tooltip :data-model="tooltipModel"/>
        <div :id="containerName" ref="container" class="pl-16 h-[60px] w-[100px]"></div>
</template>