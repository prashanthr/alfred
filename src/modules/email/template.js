// @flow
import fs from 'fs'
import path from 'path'

class TemplateBuilder {
  build (type: string, data: Object): string {
    switch (type) {
      case 'event':
        return this.buildEventTemplate(data)
      default:
       throw new Err('No template type specified')
    }
  }

  async buildEventTemplate (data) {
    const templateRoot = './template/events'
    const eventsTemplatePath = path.join(templateRoot, 'events.html')
    const eventTemplatePath = path.join(templateRoot, 'event.html')
    const eventTemplate = fs.readFile(eventTemplatePath, 'utf-8')
    let eventsHTML = ''
    const replaceEvent = (event) => {
      return eventTemplate
        .replace(':name', event.name.text)
        .replace(':description', event.description.text)
        .replace(':date', `${event.start.local} - ${event.end.local}`)
        .replace(':link', event.url)
    }
    data.forEach(event => {
      eventsHTML += replaceEvent(event)
    })
    const template = await fs.readFile(eventsTemplatePath, 'utf-8')
    template.replace(':events', eventsHTML)
    return template
  }
}

export default TemplateBuilder