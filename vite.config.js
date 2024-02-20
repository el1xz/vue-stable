import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'

import express from 'express'


// https://vitejs.dev/config/
export default () => {
  const app = express()
  dotenv.config()

  app.post('*', (req, res, next) => {
    res.sendFile(__dirname + '/dist/index.html');
  })

  return defineConfig({
    server: {
      port: 8800
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: {
      'process.env': process.env, // передача всех переменных окружения в приложение
    },
  })
}
