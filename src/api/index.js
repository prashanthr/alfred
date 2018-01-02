import publicApi from './public'
import eventApi from './event'
import jobApi from './job'

module.exports = app => {
  publicApi(app)
  eventApi(app)
  jobApi(app)
}
