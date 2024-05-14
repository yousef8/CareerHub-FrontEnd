import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toasity, { type ToastContainerOptions, toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(Vue3Toasity, {
  autoClose: 5000,
  position: toast.POSITION.TOP_RIGHT
} as ToastContainerOptions)
app.use(createPinia()) // Must be last one otherwise will not appear in Vue devtools
app.mount('#app')
