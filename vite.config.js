/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2022-01-10 16:44:06
 * @LastEditors: Linyer
 * @LastEditTime: 2022-08-22 18:23:05
 */
import { defineConfig, UserConfigExport, ConfigEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import px2vp from 'postcss-px2vp'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

/**
 * 根据环境变量设置输出目录
 * @param mode 环境变量
 * @returns
 */
function handleOutDirByMode(mode) {
  console.log('环境', mode)
  return 'dist'
}

// https://vitejs.dev/config/
export default ({ mode, command } = ConfigEnv) => {
  const isBuild = command === 'build'
  return defineConfig({
    base: './',
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        },
        {
          find: 'components',
          replacement: path.resolve(__dirname, 'src/components')
        },
        {
          find: 'apis',
          replacement: path.resolve(__dirname, 'src/apis')
        },
        {
          find: 'assets',
          replacement: path.resolve(__dirname, 'src/assets')
        }
      ]
    },
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()]
      })
    ],
    css: {
      postcss: {
        plugins: [
          require('autoprefixer'),
          px2vp({
            //视窗的宽度，对应的是我们设计稿的宽度，一般是750
            viewportWidth(rule) {
              const file = rule.source?.input.file
              // 根据文件名动态配置viewport width
              if (file?.includes('vant')) return 375
              return 750
            },
            viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一
            unitToConvert: 'px', // 要转化的单位
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: [], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            // replace: true, // 是否转换后直接更换属性值
            // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            landscape: false // 是否处理横屏情况
          })
        ]
      }
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        // 字符串简写写法
        '/foo': 'http://localhost:4567',
        // 选项写法
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        // 正则表达式写法
        '^/fallback/.*': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fallback/, '')
        }
      }
    },
    build: {
      sourcemap: true,
      outDir: handleOutDirByMode(mode),
      cssCodeSplit: false, // 禁用 CSS 代码拆分,将整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      brotliSize: false, // 关闭打包计算
      target: 'esnext',
      //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
      assetsInlineLimit: 4096,
      assetsDir: 'static/img/', // 静态资源目录
      // rollup 打包配置
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      },
      // 压缩配置
      terserOptions: {
        compress: {
          drop_console: false, // 生产环境移除console
          drop_debugger: true // 生产环境移除debugger
        }
      }
    }
  })
}
