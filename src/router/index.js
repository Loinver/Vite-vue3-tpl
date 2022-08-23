/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-03-31 10:27:05
 * @LastEditors: Linyer
 * @LastEditTime: 2022-08-11 09:36:15
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/index.html'
  },
  {
    path: '/index.html',
    name: 'Index',
    component: () => import('../views/Index/index.vue'),
    meta: {
      auth: false,
      title: '首页',
      keepAlive: true
    }
  },
  {
    path: '/c.html',
    name: 'C',
    component: () => import('../views/C/index.vue'),
    meta: {
      auth: false,
      title: 'c',
      keepAlive: true
    }
  },
  {
    path: '/interactScore.html',
    name: 'InteractScore',
    component: () => import('../views/interactScore/index.vue'),
    meta: {
      auth: false,
      title: '回家过年',
      keepAlive: true
    }
  },
  {
    // 匹配所有路径  vue2使用*   vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
    path: '/:pathMatch(.*)*',
    name: '404',
    redirect: '/index.html'
  }
]
const modulesFiles = import.meta.globEager('./modules/*.js')
//自动引入module包
const moduleRoutes = Object.entries(modulesFiles).reduce((moduleRoutes, [modulePath, value]) => {
  return [...moduleRoutes, ...value.default]
}, [])

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...moduleRoutes]
})
export default router
