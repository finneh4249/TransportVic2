global.startTime = +new Date()
import utils from './utils.mjs'
if (!process.env.NODE_ENV) await utils.setEnv()

import _loggers from './init-loggers.mjs'
import config from './config.json' with { type: 'json' }
import MainServer from './server/MainServer.mjs'

/**
 * Main application entry point for TransportVic2.
 * Initializes the environment, logging, connects to MongoDB,
 * configures the Express server routing, and starts listening for HTTP requests.
 */

let mainServer = new MainServer()
await mainServer.connectToDatabase()

mainServer.configMiddleware()
await mainServer.configRoutes()

mainServer.app.listen(config.httpPort)

global.loggers.general.info('Server Started')

process.on('uncaughtException', err => {
  global.loggers.error.err(err)
})

console.err = console.error