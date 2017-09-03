var express = require('express')
var app = express()
import _debug from 'debug'
var debug = _debug('alfred-server')
import EventFinder from './modules/event-finder'

app.get('/', (req, res) => {
  res.send('Hello Alfred!')
})

app.get('/event', async (req, res) => {
  await EventFinder.perform()
  res.send('done')
})

app.listen(7777, function () {
  console.log('Example app listening on port 7777!')
})
