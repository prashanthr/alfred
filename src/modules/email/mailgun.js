// @flow
import config from 'config'
import axios from 'axios'
import MailgunClient from 'mailgun-js'
import TemplateBuilder from './template'
import _debug from 'debug'
var debug = _debug('email:mailgun')

export default class Mailgun {
  constructor (config) {
    this.config = config
    this.client = new MailgunClient({
      apiKey: config.apiKey,
      domain: config.domain
    })
    this.templateBuilder = new TemplateBuilder()
  }

  async send (data, bodyFormat = 'html') {
    let bodyParams = {}
    switch (bodyFormat) {
      case 'html':
        bodyParams = {
          html: await this
            .templateBuilder
            .build('event', data)
        }
        break
      default:
        bodyParams = {
          text: JSON.stringify(data)
        }
        break
    }
    await this.client.messages().send({
      from: this.config.from,
      to: this.config.to,
      subject: this.config.subject,
      ...bodyParams
    })
  }
}
