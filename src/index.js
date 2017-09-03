var express = require('express')
var app = express()
import _debug from 'debug'
var debug = _debug('alfred-server')

app.get('/', (req, res) => {
  res.send('Hello Alfred!')
})

app.listen(7777, function () {
  console.log('Example app listening on port 7777!')
})
