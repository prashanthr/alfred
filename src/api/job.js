import cuid from 'cuid'
import _debug from 'debug'
const debug = _debug('api:jobs')

let jobs = []

module.exports = app => {
  app.post('/api/jobs/create', async (req, res) => {
    if (!req.body.type) {
      return res.status(400).send('No job type specified!')
    }
    const job = {
      id: cuid(),
      groupId: cuid(),
      type: req.body.type,
      params: req.body.params,
      metadata: req.body.metadata,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    jobs.push(job)
    return res.send(`Job ${job.id} added to queue`)
  })

  app.get('/api/jobs/next', async (req, res) => {
    return res.send(jobs.shift())
  })

  app.get('/api/jobs/list', async (req, res) => {
    return res.send(jobs)
  })

  app.post('/api/jobs/destroy', async (req, res) => {
    const currentJobCount = jobs.length
    const filter = (attribute, value) => jobs.filter(job => job[attribute] === value)
    if (req.body.type) {
      jobs = filter('type', req.body.type)
      res.send('done')
    }
    if (req.body.id) {
      jobs = filter('id', req.body.id)
    }

    if (req.body.groupId) {
      jobs = filter('groupId', req.body.groupId)
    }
    return res.send(`Deleted ${currentJobCount - jobs.length}} job(s) from the queue`)
  })
}
