<script setup lang="ts">
import resolveConfig from 'tailwindcss/resolveConfig';
// Reason: Vite does not support commonJS out of box. In the vite.config, the commonjs plugin
// transpiles the cjs to ts, but the transpilation and mapping happens during run time.
// Thus, the system cannot find a declaration file for the module statically.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tailwindConfig from '../../tailwind.config.cjs'
import { Message } from '../ts/Message';

const props = defineProps<{
    messages: Message[],
}>()


const cssConfig = resolveConfig(tailwindConfig)
const colors = Object.values((cssConfig as any).theme.colors.SET_3) as string[]
const users = [...new Set(props.messages.map(message => message.authorId))]
console.log(colors)

</script>

<template>
    <div class="flex-1 overflow-auto bg-slate-200 rounded m-10 p-5">
        <div class="py-2 px-3">

            <template v-for="message in messages" :key="message">
                <div v-if="message.isAction" class="flex justify-center mb-4">
                    <div class="rounded py-2 px-4" style="background-color: #FCF4CB">
                        <p class="text-xs">
                            {{ message.content }}
                        </p>
                    </div>
                </div>

                <div v-else class="flex mb-2">
                    <div class="rounded py-2 px-3 " style="background-color: #F2F2F2">
                        <p class="text-sm font-bold" :style="`color: ${colors[users.indexOf(message.authorId) % colors.length]}`" >
                            {{message.authorId}}
                        </p>
                        <p class="text-sm mt-1">
                            {{message.content}}
                        </p>
                    </div>
                </div>

            
            </template>

        </div>
    </div>
</template>