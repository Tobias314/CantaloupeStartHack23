import { defineStore } from 'pinia'
import { toRaw } from 'vue'

// Reason: Vite does not support commonJS out of box. In the vite.config, the commonjs plugin
// transpiles the cjs to ts, but the transpilation and mapping happens during run time.
// Thus, the system cannot find a declaration file for the module statically.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tailwindConfig from '../../tailwind.config.cjs'
import resolveConfig from 'tailwindcss/resolveConfig'

const cssConfig = resolveConfig(tailwindConfig)

export const useGlobalStore = defineStore('globalConfig', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {}
})
