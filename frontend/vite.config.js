import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'

const { parsed: config = {} } = dotenv.config()

export default defineConfig({
  plugins: [vue()],
  publicDir: true,
  root: process.cwd() + '/',
  resolve: {
    alias: [
      {
        find: /^@\/(.*)$/,
        replacement: process.cwd() + '/src/$1'
      }
      // {
      //   find: /^shared\/(.*)$/,
      //   replacement: process.cwd() + '/app/shared/$1'
      // }
    ]
  },
  // server: {
  //   port: config.PORT_DEV_FE,
  //   proxy: {
  //     '^/(api|images|webfonts|favicon)': {
  //       target: `http://localhost:${config.PORT}`,
  //       changeOrigin: true
  //     }
  //   }
  // }
})
