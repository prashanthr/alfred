// @flow
import axios from 'axios'
import _debug from 'debug'
var debug = _debug('event-finder:eventbrite')

const apiBaseUrl = 'https://www.eventbrite.com/api/v3'
const endpoints = {
  events: `${apiBaseUrl}/events`,
  eventSearch: `${apiBaseUrl}/events/search`
}

class Eventbrite {
  constructor (config) {
    this.pat = config.pat
  }
  async findEvents () {
    const params = {
      token: this.pat,
      'location.address': 'san fransisco, ca',
      'start_date.keyword': 'next_week',
      sort_by: 'date',
      categories: '103,110,105,113,104,102,109,116'
    }
    const firstPage = await axios.get(endpoints.eventSearch, {
      params: params
    })
    debug('firstPage', firstPage)
    return firstPage
  }
}

export default new Eventbrite()
