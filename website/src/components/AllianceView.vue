<script setup lang="ts">
import { Alliance } from '../ts/Alliance';

defineProps<{
    alliance: Alliance,
}>()

</script>

<template>
    
<div class="w-full p-2 bg-white my-5">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{alliance.name}}</h5>
</div>

</template>