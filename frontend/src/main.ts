import './assets/css/main.css'
import 'picnic/picnic.min.css';
import '@/assets/css/fontello.css';
import '@vuepic/vue-datepicker/dist/main.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
