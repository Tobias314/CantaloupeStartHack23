import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
