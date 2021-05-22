const fs = require('fs')
const path = require('path')

const cache = {}

const modulePath = require.resolve('@citation-js/core/lib/util/fetchFile.js')
require(modulePath)

const mockModule = require.cache[modulePath]
const old = mockModule.exports.fetchFileAsync
mockModule.exports.fetchFileAsync = function ours (url, ...args) {
  return old.call(this, url, ...args)
    .then(response => (cache[url] = response))
}

const { Cite, plugins } = require('@citation-js/core')
require('../..')

require('@babel/register')
const tests = require('../suite.data')

async function main () {
  for (const test of tests) {
    console.log((await Cite.async(test.input)).data[0].id)
  }

  await fs.promises.writeFile(
    path.join(__dirname, 'cache.json'),
    JSON.stringify(cache)
  )
}

main().catch(console.error)
