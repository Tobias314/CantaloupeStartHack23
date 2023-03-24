<script setup lang="ts">
import resolveConfig from 'tailwindcss/resolveConfig';
// Reason: Vite does not support commonJS out of box. In the vite.config, the commonjs plugin
// transpiles the cjs to ts, but the transpilation and mapping happens during run time.
// Thus, the system cannot find a declaration file for the module statically.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tailwindConfig from '../../tailwind.config.cjs'
import { Messages, Message } from '../ts/Message';
import { toRaw } from 'vue';

const props = defineProps<{
    messages: Messages,
}>()

function formatTimestamp(stamp: number): string {
    return new Date(stamp).toLocaleTimeString()
}

const cssConfig = resolveConfig(tailwindConfig)
const colors = Object.values((cssConfig as any).theme.colors.SET_3) as string[]
const messages = toRaw(
Object.entries(props.messages).map((entry:[string, Message]) => entry[1])
.sort((messageA, messageB) => messageA.timestamp - messageB.timestamp))
const users = [...new Set(messages.map(message => message.author))]
const threshold = 2

</script>

<template>
    <h3>Chatlog</h3>
    <div class="flex-1 overflow-auto bg-slate-200 rounded my-5">
        <div class="py-2 px-3">

            <template v-for="message in messages" :key="message">
                <div v-if="message.isAction" class="flex justify-center mb-4">
                    <div class="rounded py-2 px-4 bg-yellow-100">
                        <p class="text-xs">
                            <span :style="`color: ${colors[users.indexOf(message.author) % colors.length]}`">{{ message.author }}</span> {{ message.content.includes("kick")?  message.content :  message.content + 's' }}
                        </p>
                    </div>
                </div>

                <div v-else class="flex mb-2">
                    <div class="rounded py-2 px-3 bg-stone-50 border-double border-rose-200" :style="message.risk >= threshold? `border-width: ${message.risk * 2}px` : `border-width: 0px;`">
                        <p class="text-sm font-bold" :style="`color: ${colors[users.indexOf(message.author) % colors.length]}`" >
                            {{message.author}}
                        </p>
                        <p class="text-sm mt-1">
                            {{message.content}}
                        </p>
                        <p class="text-right text-xs text-grey-dark mt-1">
                            {{formatTimestamp(message.timestamp)}}
                        </p>
                    </div>
                </div>

            
            </template>

        </div>
    </div>
</template>