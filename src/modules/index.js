// @flow
import _debug from 'debug'
var debug = _debug('module:base')

export default class ModuleBase {
  constructor (key) {
    this.key = key
  }

  perform () {
    debug(`Base Module has no function to perform. Define a function to perform in submodule ${this.key}`)
  }
}
