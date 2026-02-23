import './assets/styles/global.css'
import './assets/styles/tables.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router/index.js'

import english from './languages/english'
import portuguese from './languages/portuguese'
import spanish from './languages/spanish'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import 'ag-grid-enterprise'

import { ModuleRegistry } from 'ag-grid-community'
import { AllEnterpriseModule } from 'ag-grid-enterprise'
import { MasterDetailModule } from 'ag-grid-enterprise'

ModuleRegistry.registerModules([AllEnterpriseModule, MasterDetailModule])

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages: {
    'pt-BR': portuguese.messages,
    'en-UK': english.messages,
    'es-ES': spanish.messages
  }
})

createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app')
