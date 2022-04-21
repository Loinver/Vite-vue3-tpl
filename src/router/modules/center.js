/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-09-02 08:58:06
 * @LastEditors: Linyer
 * @LastEditTime: 2022-02-11 16:07:33
 */
const routes = [
  {
    path: '/sku',
    name: 'CenterIndex',
    component: () => import(/* webpackChunkName: "CenterIndex" */ '@/views/sku/Index.vue'),
    meta: {
      auth: true,
      title: '我的',
      keepAlive: false
    }
  }
]
export default routes
