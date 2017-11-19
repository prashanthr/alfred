import cuid from 'cuid'

let jobs = []

module.exports = app => {
  app.post('/api/jobs/create', async (req, res) => {
    if (!req.body.type) {
      res.status(400).send('No job type specified!')
    }
    jobs.push({
      id: cuid(),
      groupId: cuid(),
      type: req.body.type,
      params: req.body.params,
      metadata: req.body.metadata,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    res.send('done')
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
