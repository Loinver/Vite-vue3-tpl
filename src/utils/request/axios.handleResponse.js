/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-09-02 08:58:06
 * @LastEditors: Linyer
 * @LastEditTime: 2022-04-22 09:58:51
 */

import { request } from './index'
import { againRequest } from './axios.againRequest.js'

const errorCode = {
  300: '异常状态'
}

// 处理响应错误码
export default (response) => {
  const status = response.status
  // 如果http响应状态码response.status正常，则直接返回数据
  if ((status >= 200 && status <= 300) || status === 304) {
    // 正常来讲，很多时候会将异常状态放在data里面，所以要判断data
    const realStatus = response.data.code
    if (realStatus === 200) {
      return response.data.data
    } else {
      againRequest(response, request)
      return errorCode[response.data.code]
    }
  }
  // status不正常的话，根据与后端约定好的code，做出对应的提示与处理
  // 返回一个带有code和message属性的对象
  else {
    const code = parseInt(response.data && response.data.code)
    // msg为服务端返回的错误信息，字段名自定义，此处以msg为例
    let message = (response.data || {}).msg

    switch (code) {
      case 4001:
        if (process.server) return
        message = message || '登录设备数量超出限制'
        break
      default:
    }
    return {
      code,
      message
    }
  }
}
