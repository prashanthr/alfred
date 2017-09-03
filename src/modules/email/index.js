// @flow
import ModuleBase from '../index'
import Mailgun from './mailgun'
import config from 'config'
import { keys } from 'lodash'
import _debug from 'debug'
var debug = _debug('module:email')

const sourceModuleMap = {
  'mailgun': Mailgun
}

class EmailModule extends ModuleBase {
  constructor (key) {
    super(key || 'email')
    this.config = config.module.email
  }

  async send (data) {
    const sources = keys(this.config.source)
    const sendEmail = async (source) => {
      const module = sourceModuleMap[source]
      await module.sendEmail(data)
    }
    let promises = sources.map(source => sendEmail(source))
    await Promise.all(promises)
  }
}

export default new EmailModule()
