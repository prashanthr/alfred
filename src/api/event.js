import EventFinder from '../modules/event-finder'
module.exports = app => {
  app.get('/event', async (req, res) => {
    await EventFinder.perform()
    res.send('done')
  })
}
