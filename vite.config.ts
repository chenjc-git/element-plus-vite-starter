import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject'
import { visualizer } from 'rollup-plugin-visualizer'
import { mock } from './packages/plugin-vite-mock'
import { createHtmlPlugin } from 'vite-plugin-html'
import fs from 'fs'
import Components from 'unplugin-vue-components/vite'
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import wasm from 'vite-plugin-wasm';

import vueJsx from "@vitejs/plugin-vue-jsx";
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __DEV__: true,
    __TEST__: true,
    __BROWSER__: true,
    __USE_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__:true
  },
  resolve: {
    alias: {
      '~/': `${__dirname}/src/`,
      pinia: `${__dirname}/packages/pinia/src/index.ts`,
      '@mapbox/mapbox-gl-draw':`${__dirname}/packages/mapbox-gl-draw`,
      marchingsquares:`${__dirname}/packages/marchingsquares.js/src/main.js`,
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    wasm(),
    vue(),
    createHtmlPlugin({
      minify:true,
      entry: '/src/main.ts',
      template: 'index.html',
      inject:{
        data:{
          project:'光恒'
        }
      }
    }),
    mock(),
    vueJsx(),
    vueSetupExtend({}),
    inject({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
      transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
      ]
    }),
    process.env.npm_lifecycle_event === 'report'? visualizer({ open: true, brotliSize: true, filename: 'report.html' }): null
  ],
  preview:{
    port:5173
  },
  server:{
    host:true,
    https:{
      cert: fs.readFileSync('dev.tanglei.top.pem'),
      key: fs.readFileSync('dev.tanglei.top.key')
    },
    open:'https://dev.tanglei.top',
    port:5173,
    strictPort:true,
    proxy:{
      // '/guangheng':{
      //   target:'http://tanglei.top:8000',//替换的服务端地址
      //   changeOrigin:true,//开启代理，允许跨域
      //   rewrite:path=>path.replace(/^\/guangheng/,''), // 设置重写的路径
      // },
      '/api':{
        target:'https://main.emgo-tech.com',//替换的服务端地址
        // target:'http://192.168.101.93:8000',//替换的服务端地址
        changeOrigin:true,//开启代理，允许跨域
      },
      '/backend':{
        // target:'http://websocket.tanglei.top',//替换的服务端地址
        target:'http://127.0.0.1:9988',//替换的服务端地址
        changeOrigin:true,//开启代理，允许跨域
        // rewrite:path=>path.replace(/^\/backend/,''), // 设置重写的路径
        ws:true,
      },
      '/tanglei':{
        target:'http://tanglei.top',//替换的服务端地址
        changeOrigin:true,//开启代理，允许跨域
        rewrite:path=>path.replace(/^\/tanglei/,'') // 设置重写的路径
      },
      '/qqAuth':{
        target:'https://graph.qq.com',//替换的服务端地址
        changeOrigin:true,//开启代理，允许跨域
        rewrite:path=>path.replace(/^\/qqAuth/,'') // 设置重写的路径
      },
      '/ArcGIS':{
        target:'https://map.geoq.cn',//替换的服务端地址
        changeOrigin:true,//开启代理，允许跨域
      }
    }
  }
})
