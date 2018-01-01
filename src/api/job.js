import cuid from 'cuid'
import _debug from 'debug'
const debug = _debug('api:jobs')

let jobs = []

module.exports = app => {
  app.post('/api/jobs/create', async (req, res) => {
    debug('here')
    // if (!req.body.type) {
    //   return res.status(400).send('No job type specified!')
    // }
    debug('here2')
    jobs.push({
      id: cuid(),
      groupId: cuid(),
      type: req.body.type,
      params: req.body.params,
      metadata: req.body.metadata,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    debug('added ', jobs)
    return res.send('done')
  })
  
  app.get('/api/jobs/next', async (req, res) => {
    res.send(jobs.shift())
  })
  
  app.get('/api/jobs/list', async (req, res) => {
    res.send(jobs)
  })
  
  app.post('/api/jobs/destroy', async (req, res) => {
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
    res.send('done')
  })
}
