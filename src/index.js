import express from 'express'
import config from 'config'
import publicApi from './api/public'
import eventApi from './api/event'
import _debug from 'debug'
const debug = _debug('alfred-server')
const app = express()

// API
publicApi(app)
eventApi(app)

app.listen(config.port, function () {
  debug('Alfred is active and ready for duty')
})
