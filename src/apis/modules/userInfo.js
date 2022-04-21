/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-09-27 09:40:12
 * @LastEditors: Linyer
 * @LastEditTime: 2022-04-21 17:35:35
 */
const api = {
  getUserInfo: {
    method: 'get',
    url: 'https://tspmicrouag.shupian.cn/crisps-qdb-pc-node-v2/yk/production/channel/v1/order_and_channel_list.do',
    config: { retry: 5, retryDelay: 2000 }
  },
  postUserInfo: {
    method: 'post',
    url: 'https://tspmicrouag.shupian.cn/crisps-qdb-pc-node-v2/yk/production/cost_change/v1/pcn_assume_max_money.do',
    config: {
      retry: 4,
      retryDelay: 1500
    }
  }
}
export default api
