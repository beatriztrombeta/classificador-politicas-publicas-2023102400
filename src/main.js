import './assets/styles/global.css'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import english from './languages/english'
import portuguese from './languages/portuguese'
import router from './router/index.js'
import spanish from './languages/spanish'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages: {
    'pt-BR': portuguese.messages,
    'en-UK': english.messages,
    'es-ES': spanish.messages
  },
});

createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app')
