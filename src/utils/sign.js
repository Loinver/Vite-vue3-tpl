import md5 from 'md5'
const _key = '123' //对称加密这里的key和后端一起约定

export default class signUtils {
  /**
   * json参数升序
   * @param jsonObj 发送参数
   */

  static sortAsc(jsonObj) {
    let arr = new Array()
    let num = 0
    for (let i in jsonObj) {
      arr[num] = i
      num++
    }
    let sortArr = arr.sort()
    let sortObj = {}
    for (let i in sortArr) {
      sortObj[sortArr[i]] = jsonObj[sortArr[i]]
    }
    return sortObj
  }

  /**
   * @param url 请求的url,应该包含请求参数(url的?后面的参数)
   * @param requestParams 请求参数(POST的JSON参数)
   * @returns {string} 获取签名
   */
  static getSign(url, requestParams) {
    let urlParams = this.parseQueryString(url)
    let jsonObj = this.mergeObject(urlParams, requestParams)
    let requestBody = this.sortAsc(jsonObj)
    return md5(JSON.stringify(requestBody) + _key).toUpperCase()  //这里根据后端加密规则来，有的转成base64 再转大小写  反正就那么几种
  }

  /**
   * @param url 请求的url
   * @returns {{}} 将url中请求参数组装成json对象(url的?后面的参数)
   */
  static parseQueryString(url) {
    let urlReg = /^\?([\w\W]+)$/,
      // let urlReg = /^[^\?]+\?([\w\W]+)$/, //这里提示正则可以优化 弃用
      paramReg = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
      urlArray = urlReg.exec(url),
      result = {}

    // 获取URL上最后带逗号的参数变量
    let lastpathVariable = url?.substring(url.lastIndexOf('/') + 1)
    if (lastpathVariable?.includes(',')) {
      if (lastpathVariable?.includes('?')) {
        lastpathVariable = lastpathVariable?.substring(0, lastpathVariable?.indexOf('?'))
      }
      //解决Sign 签名校验失败
      result['x-path-variable'] = decodeURIComponent(lastpathVariable)
    }
    if (urlArray && urlArray[1]) {
      let paramString = urlArray[1],
        paramResult
      while ((paramResult = paramReg.exec(paramString)) != null) {
        //数字值转为string类型，前后端加密规则保持一致
        if (this.myIsNaN(paramResult[2])) {
          paramResult[2] = paramResult[2].toString()
        }
        result[paramResult[1]] = paramResult[2]
      }
    }
    return result
  }

  /**
   * @returns {*} 将两个对象合并成一个
   */
  static mergeObject(objectOne, objectTwo) {
    if (objectTwo && Object.keys(objectTwo).length > 0) {
      for (let key in objectTwo) {
        if (Object.prototype.hasOwnProperty.call(objectTwo, `${key}`)) {
          //数字值转为string类型，前后端加密规则保持一致
          if (this.myIsNaN(objectTwo[key])) {
            objectTwo[key] = objectTwo[key].toString()
          }
          objectOne[key] = objectTwo[key]
        }
      }
    }
    return objectOne
  }

  static urlEncode(param, key, encode) {
    if (param == null) return ''
    let paramStr = ''
    let t = typeof param
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += '&' + key + '=' + (encode == null || encode ? encodeURIComponent(param) : param)
    } else {
      for (let i in param) {
        let k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
        paramStr += this.urlEncode(param[i], k, encode)
      }
    }
    return paramStr
  }

  /**
   * 接口签名用 生成时间戳
   * @returns {number}
   */
  static getTimestamp() {
    return new Date().getTime()
  }

  // true:数值型的，false：非数值型
  static myIsNaN(value) {
    return typeof value === 'number' && !isNaN(value)
  }
}
