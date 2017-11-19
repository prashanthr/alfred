import EventFinder from '../modules/event-finder'

const getTask = (type) => {
  let worker
  switch (type) {
    case 'event-finder':
      worker = EventFinder
      worker.start = async () => worker.perform()
      return worker
    default:
      throw new Error(`Unknown worker type ${type}`) 
  }
}

export default getTask
