import EventFinder from '../modules/event-finder'

module.exports = app => {
  app.get('/api/event', async (req, res) => {
    await EventFinder.perform()
    res.send('done')
  })
}
