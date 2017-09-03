import ModuleBase from '../index'
import config from 'config'
import _debug from 'debug'
import Eventbrite from './eventbrite'
import { keys } from 'lodash'
import EmailModule from '../email'
var debug = _debug('module:event-finder')

const sourceModuleMap = {
  'eventbrite': Eventbrite
}

class EventFinderModule extends ModuleBase {
  constructor (key) {
    super(key || 'event-finder')
    this.config = config.modules['event-finder']
  }

  async perform () {
    const sources = keys(this.config.source)
    if (!sources || sources.length === 0) {
      debug(`No sources defined. Nothing to perform.`)
    }
    const findEvents = async (source) => {
      const module = sourceModuleMap[source] // new (sourceModuleMap[source])()
      const results = await module.findEvents()
      return results
    }
    let promises = sources.map(source => findEvents(source))
    const results = await Promise.all(promises)
    await EmailModule.send(results)
  }
}

export default new EventFinderModule()
