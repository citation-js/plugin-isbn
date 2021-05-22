const cache = require('./cache')

const modulePath = require.resolve('@citation-js/core/lib/util/fetchFile.js')
require(modulePath)

const mockModule = require.cache[modulePath]
const old = mockModule.exports.fetchFileAsync

mockModule.exports.fetchFileAsync = function ours (url, ...args) {
  if (url in cache) {
    return cache[url]
  } else {
    return old.call(this, url, ...args)
  }
}
