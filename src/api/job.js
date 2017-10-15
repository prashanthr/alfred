module.exports = app => {
  app.get('/api/job', async (req, res) => {
    console.log('Req', req)
    res.send('done')
  })
}
