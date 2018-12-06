/**
 * Browser window accessor
 * @module bwindow
 */

'use strict'

const d = (module) => module && module.default || module

const get = d(require('./get'))
const once = d(require('./once'))
const set = d(require('./set'))

module.exports = {
  get,
  once,
  set
}
