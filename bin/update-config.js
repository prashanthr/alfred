import fs from 'fs'
import path from 'path'
import { has, keys, forEach, flatten, map } from 'lodash'
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
  debug('secretFiles', secretFiles)
  // const search = (obj, searchKey, result) => {
  //   debug(`Searching ${JSON.stringify(obj)} for ${searchKey}. Result ${result}`)
  //   if (has(obj, searchKey)) {
  //     result.push(searchKey)
  //     return result
  //   } else {
  //     if (typeof obj === 'object') {
  //       keys(obj).forEach(key => {
  //         result.push(key)
  //         if (typeof obj[key] === 'object') {
  //           search(obj[key], searchKey, result)
  //         }
  //       })
  //     } else {
  //       result = []
  //     }
  //   }
  // }

  secretFiles.forEach(file => {
    const key = file.replace('.json', '')
    const obj = search(config, key, [])
    debug(`Obj ${JSON.stringify(obj)}`)
    configFile.x(file)
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
