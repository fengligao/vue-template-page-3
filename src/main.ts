
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import MiJiTable from './components/mijiTable'
import TemplatePage from './components/TemplatePage.vue'

const app = createApp(App)

app.component(MiJiTable.name, MiJiTable)
app.component(TemplatePage.name, TemplatePage)

app.use(router).use(ElementPlus).mount('#app')
