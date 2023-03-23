<script setup lang="ts">
import { useGlobalStore } from './ts/globalStore'
import Home from './components/Home.vue'

const store = useGlobalStore()
</script>

<template>
    <Home/>
</template>
