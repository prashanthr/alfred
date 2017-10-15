var express = require('express')
var app = express()
import publicApi from './api/public'
import eventApi from './api/event'
import _debug from 'debug'
var debug = _debug('alfred-server')

// API
publicApi(app)
eventApi(app)

app.listen(7777, function () {
  debug('Example app listening on port 7777!')
})
