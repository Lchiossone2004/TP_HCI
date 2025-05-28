import { registerPlugins } from '@/plugins'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './assets/main.css'
import Chart from 'chart.js/auto';
import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).use(router).use(vuetify).use(pinia).mount('#app')