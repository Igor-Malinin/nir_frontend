import { createApp } from 'vue'
import App from './App.vue'
import componentsUI from '@/components/UI'
import router from './router'
import store from './store'
import vue3GoogleLogin from '@/libs/vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '918711322163-ud06rp13o8a6p9j87c0mfo7t3unrmdb8.apps.googleusercontent.com'
})

componentsUI.forEach(componentUI => {
  app.component(componentUI.name, componentUI)
})

app
  .use(store)
  .use(router)
  .mount('#app')
