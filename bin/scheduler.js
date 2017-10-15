// @flow
import config from 'config'
import _debug from 'debug'
const debug = _debug('scheduler')
import axios from 'axios'
import { CronJob } from 'cron'
import allTasks from '../config/tasks.json'
import moment from 'moment'

async function scheduler () {
  let tasks = allTasks.filter(task => task.enabled && task.schedule)
  if (tasks.length === 0) {
    debug(`No tasks set to run or on schedule`)
    return
  }
  tasks.forEach(task => {
    debug(`Configuring ${task.type} to run on ${task.schedule}`)
    try {
      const cronJob = new CronJob({
        cronTime: task.schedule,
        onTick: function () {
          debug(
            `Running ${task.type} at ${moment().format('YYYY-MM-DD hh:mm:ss')}`
          )
          axios
            .post(`${config.apiBaseUri}/`, {
              type: task.type,
              params: task.params
            })
            .then(result => {
              debug(
                `Added a job to the queue for type ${task.type} at ${moment().format('YYYY-MM-DD hh/mm/ss')}. 
                Result: ${result.data}`
              )
            })
            .catch(error => {
              debug(
                `Failed to add a job of type ${task.type} to the queue at ${moment().format('YYYY-MM-DD hh/mm/ss')}: 
                ${error.message}`,
                error
              )
            })
        },
        onComplete: (data) => console.log('onComplete', data),
        context: (data) => { console.log('Context', data)},
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
