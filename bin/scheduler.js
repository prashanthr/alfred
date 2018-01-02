// @flow
import config from 'config'
import _debug from 'debug'
const debug = _debug('scheduler')
import axios from 'axios'
import { CronJob } from 'cron'
import allTasks from '../config/tasks.json'
import moment from 'moment'
import { values } from 'lodash'

const dateFormat = 'YYYY-MM-DD hh:mm:ss'

async function scheduler () {
  let tasks = values(allTasks).filter(task => !task.disabled && task.schedule)
  if (tasks.length === 0) {
    debug(`No tasks set to run or on schedule`)
    return
  }
  tasks.forEach(task => {
    debug(`Configuring ${task.type} to run on ${task.schedule}`)
    try {
      const cronJob = new CronJob({
        cronTime: task.schedule,
        onTick: async () => {
          debug(
            `Running ${task.type} at ${moment().format(dateFormat)}`
          )
          axios
            .post(`${config.apiBaseUri}/jobs/create`, {
              type: task.type,
              params: task.params,
              metadata: {
                triggeredBy: 'scheduler',
                timestamp: new Date()
              }
            })
            .then(result => {
              debug(
                `Added a job to the queue for type ${task.type} at ${moment().format(dateFormat)}.\nResult: ${result.data}`
              )
            })
            .catch(error => {
              debug(
                `Failed to add a job of type ${task.type} to the queue at ${moment().format(dateFormat)}: 
                ${error.message}`,
                error
              )
            })
        },
        onComplete: (data) => console.log('onComplete', data),
        context: (data) => console.log('Context', data),
        start: true,
        runOnInit: !!task.runOnInit,
        timeZone: 'America/Los_Angeles'
      })
    } catch (err) {
      throw new Error(
        `Error occurred while configuring ${task}: ${err.message}: ${err}`
      )
    }
  })
}

scheduler().catch(err => {
  debug(`Error in scheduler process`, err)
})
