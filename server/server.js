import express from 'express'
import consola from 'consola'
import { Nuxt } from 'nuxt'
import config from '../nuxt.config.js'
const app = express()

function start() {
  config.dev = false
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(config.server.port, config.server.port)
  consola.ready({
    message: `Server listening on http://${config.server.host}:${config.server.port}`,
    badge: true
  })
}
start()
