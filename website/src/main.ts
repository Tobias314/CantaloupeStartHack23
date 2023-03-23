import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import Home from './components/Home.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{ path: '/', component: Home }]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
