/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-03-31 10:22:38
 * @LastEditors: Linyer
 * @LastEditTime: 2023-01-17 15:05:56
 */
import { createApp } from 'vue'
import 'normalize.css'
import 'assets/styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './apis'

import { Toast, Dialog, Button, List, Cell, Search, NavBar, Calendar } from 'vant'

import 'vant/lib/index.css'

const app = createApp(App)
// 挂载组件
app.use(Toast).use(Dialog).use(Button).use(List).use(Cell).use(Search).use(NavBar).use(Calendar)

app.config.globalProperties.$api = api // api绑定到this上
app.config.globalProperties.$toast = Toast

// 挂载路由及状态存储
app.use(router).use(store).mount('#app')
