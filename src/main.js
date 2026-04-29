import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.scss'


createApp(App).mount('#app')

import router from './router'

createApp(App).use(router).mount('#app')

