// @flow
import axios from 'axios'
import config from 'config'
import _debug from 'debug'
var debug = _debug('event-finder:eventbrite')

const apiBaseUrl = 'https://www.eventbrite.com/api/v3'
const endpoints = {
  events: `${apiBaseUrl}/events`,
  eventSearch: `${apiBaseUrl}/events/search`
}

export default class Eventbrite {
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
    const fetchData = async (params) => {
      const response = await axios.get(endpoints.eventSearch, {
        params: params
      })
      return response.data
    }
    const firstPage = await fetchData(params)
    let continuation = firstPage.continuation
    let events = firstPage.events || []

    while (continuation) {
      let next = await fetchData({
        continuation
      })
      events = [...events, next.events || []]
      continuation = next.continuation
    }
    return events[0]
    // return pick(events, ['']
  }
}
