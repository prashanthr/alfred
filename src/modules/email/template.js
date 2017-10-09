// @flow
import fs from 'fs'
import path from 'path'
import _debug from 'debug'
var debug = _debug('email-template')

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
    const templateRoot = path.join(__dirname, 'template/events')
    const eventsTemplatePath = path.join(templateRoot, 'events.html')
    const eventTemplatePath = path.join(templateRoot, 'event.html')
    const headerPath = path.join(templateRoot, 'header.html')
    const footerPath = path.join(templateRoot, 'footer.html')
    const eventTemplate = await fs.readFileSync(eventTemplatePath, 'utf-8')
    let eventsHTML = ''
    
    const replaceEvent = (event) => {
      debug('adding event to html', event)
      if (!event) return ''
      return eventTemplate
        .replace(':name', event.name.text)
        .replace(':description', event.description.text)
        .replace(':date', `${event.start.local} - ${event.end.local}`)
        .replace(':url', event.url)
    }
    
    data.forEach(event => {
      eventsHTML += replaceEvent(event)
    })
    
    const template = await fs.readFileSync(eventsTemplatePath, 'utf-8')
    const header = await fs.readFileSync(headerPath, 'utf-8')
    const footer = await fs.readFileSync(footerPath, 'utf-8')
    return template
      .replace(':events', eventsHTML)
      .replace(':header', header)
      .replace(':footer', footer)
  }
}

export default TemplateBuilder