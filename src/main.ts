// import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(ElementPlus)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')

// const { app, BrowserWindow } = require('electron')

// const createWindow = () => {
//     const win = new BrowserWindow({
//       width: 800,
//       height: 600
//     })
  
//     win.loadFile('index.html')
//   }

//   app.whenReady().then(() => {
//     createWindow()
//   })