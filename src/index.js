import express from 'express'
import config from 'config'
import bodyParser from 'body-parser'
import publicApi from './api/public'
import eventApi from './api/event'
import jobApi from './api/job'
import _debug from 'debug'
const debug = _debug('alfred-server')
const app = express()

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(async (req, res, next) => {
//   debug('req.body', req)
//   req.body = JSON.parse(req.body)
//   next()
// })
// API
publicApi(app)
eventApi(app)
jobApi(app)

app.listen(config.port, function () {
  debug('Alfred is active and ready for duty')
})
