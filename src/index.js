import express from 'express'
import config from 'config'
import bodyParser from 'body-parser'
import _debug from 'debug'
import api from './api'

const debug = _debug('alfred-server')
const app = express()

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// API
api(app)

app.listen(config.port, function () {
  debug('Alfred is active and ready for duty')
})
