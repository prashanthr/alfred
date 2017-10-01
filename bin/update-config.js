import fs from 'fs'
import path from 'path'
import _debug from 'debug'
var debug = _debug('update-config')

async function updateConfig () {
  debug('Updating config')
  const configFilePath = path.join(__dirname, '../config/default.json')
  debug(configFilePath)
  const configFile = await fs.readFileSync(configFilePath, 'utf-8')
  const config = JSON.parse(configFile)
  debug('Config', JSON.stringify(config))
  // const secretsDir = fs.readdirSync(path.join(__dirname, '../config/secrets'))
  // secretsDir.forEach(file)
}

updateConfig().catch(err => {
  debug('Error updating config`', err)
})
