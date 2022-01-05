import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import '@/assets/css/global.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElIconModules from '@element-plus/icons'
import * as echarts from 'echarts';
import Websocket from './utils/websocket.js'





const app = createApp(App);

app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$Websocket = Websocket
// 引入icon
for(let iconName in ElIconModules){
    app.component(iconName,ElIconModules[iconName])
}

app
    .use(router)
    .use(ElementPlus,{locale: zhCn,size:'small'})
    .mount('#app')