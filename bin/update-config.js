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
  const secretFiles = fs.readdirSync(path.join(__dirname, '../config/secrets'))
  secretFiles.forEach(file => {
    // _.find(modules, _.flow(
    //   _.property('submodules'),
    //   _.partialRight(_.some, { id: 2 })
    // ));
    // _.filter(modules, { submodules: [ { id: 2 } ]});
    // _.select(modules, function (module) {
    //   return _.any(module.submodules, function (submodule) {
    //     return _.where(submodule, {id:3});
    //   });
    // });
  })
}

updateConfig().catch(err => {
  debug('Error updating config`', err)
})
