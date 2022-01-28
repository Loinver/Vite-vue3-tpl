/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-07-22 15:47:27
 * @LastEditors: Linyer
 * @LastEditTime: 2022-01-27 13:29:57
 */
// 获取当前应用运行变量
const ENV = import.meta.env.VITE_BASE_ENV;
const modulesFiles = import.meta.globEager('./modules/*.js')

const modules = Object.entries(modulesFiles).reduce((modules, [modulePath, value]) => {
    const name = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').split('modules/')[1];
    modules[name] = value.default;
    return modules
}, {})

export default  modules[ENV]
