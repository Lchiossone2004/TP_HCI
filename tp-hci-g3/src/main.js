/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './assets/main.css'
import Chart from 'chart.js/auto';
import '@mdi/font/css/materialdesignicons.css'

createApp(App).use(router).use(vuetify).mount('#app')