import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

const pathResolve = (dir) => {
  return resolve(__dirname, '.', dir)
}

const alias = {
  '@': pathResolve('src')
}

export default ({ command }) => {
  return {
    base: './',
    resolve: {
      alias
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {}
        }
      }
    },
    plugins: [vue()],
    server: {
      proxy: {
        '/api': {
          // 后台地址

          target: 'https://www.aikeyunkang.top:443/',
          // target: '',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
}
