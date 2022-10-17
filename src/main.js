import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import "./router/permission"
import store from './store'
import http from './utils/request'
import vantJS from "./vant/index"
// 全局样式引入
import 'vant/lib/index.css';
import "./style/globalStyle.scss"

var app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
// 挂载vant组件----单独引入方式
vantJS(app)

// 原型挂载
app.config.globalProperties.$http = http