import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import App from './App.vue'

createApp(App).use(PrimeVue).mount('#app')
