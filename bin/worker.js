// @flow
import config from 'config'
import axios from 'axios'
import _debug from 'debug'
import getTaskWorker from '../src/job/get-task-worker'

const debug = _debug('worker')

const listen = (callback) => {
  var listener = async () => {
    var message = await axios.get(`${config.apiBaseUrl}/jobs/next`)
    if (message.data) {
      callback(message.data, listener)
    } else {
      setTimeout(listener, 20000)
    }
  }
  return {
    on: () => null,
    start: () => setTimeout(listener, 0)
  }
}

async function work () {
  debug(`Processing job...`)
  const processingFunction = async (message, next) => {
    try {
      const worker = getTaskWorker(message.type)
      await worker.start()
      next()
    } catch (err) {
      debug('Error while performing job', err)
      next()
    }
  }
  const workman = listen(processingFunction)
  workman.start()
}

work().catch(err => {
  debug(`Error in worker process`, err)
})
