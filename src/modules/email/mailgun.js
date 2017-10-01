// @flow
import config from 'config'
import axios from 'axios'
import MailgunClient from 'mailgun-js'
import _debug from 'debug'
var debug = _debug('email:mailgun')

export default class Mailgun {
  constructor (config) {
    this.config = config
    this.client = new MailgunClient({
      apiKey: config.apiKey,
      domain: config.domain
    })
  }

  async send (data) {
    await this.client.messages().send({
      from: this.config.from,
      to: this.config.to,
      subject: this.config.subject,
      text: JSON.stringify(data)
    })
  }
}
