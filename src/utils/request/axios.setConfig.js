/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-09-02 08:58:06
 * @LastEditors: Linyer
 * @LastEditTime: 2022-04-22 10:02:48
 */
import baseConfig from '@/config'
/**
 * @param {axios} axios实例
 * @param {config} 自定义配置对象，可覆盖掉默认的自定义配置
 */
export default (axios, config = {}) => {
  const defaultConfig = {
    baseURL: baseConfig.baseUrl,
    timeout: 500,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'custom-defined-header-key': 'custom-defined-header-value',
      // 自定义请求头：对所有请求方法生效
      common: {
        'common-defined-key-b': 'custom value: for all methods'
      },
      // 自定义请求头：只对post方法生效
      post: {
        'post-custom-key': 'custom value: only for post method'
      },
      // 自定义请求头：只对get方法生效
      get: {
        'get-custom-key': 'custom value: only for get method'
      }
    },
    retry: 3, // 接口请求错误时重试次数
    retryDelay: 1000 // 接口请求错误时，重试间隔
  }

  Object.assign(axios.defaults, defaultConfig, config)
  return axios
}
