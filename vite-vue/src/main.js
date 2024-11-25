import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons'
import router from './router/routes'
import store from './store'
import './router/index'
import 'element-plus/theme-chalk/index.css'
import './styles/index.scss'
import zh from 'element-plus/es/locale/lang/zh-cn'
import * as echarts from 'echarts'

const app = createApp(App)

// 注册Icons 全局组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
})

app.config.globalProperties.window = window
app.config.globalProperties.$echarts = echarts

app.use(ElementPlus, { locale: zh }).use(router).use(store).mount('#app')
