import path from 'node:path'
import { promises as fs } from 'node:fs'

import { Cite } from '@citation-js/core'
import '../../src/index.js'

import tests from '../suite.data.js'

const cachePath = path.join(import.meta.dirname, 'cache.json')
const cache = JSON.parse(await fs.readFile(cachePath, 'utf8'))

const _fetch = global.fetch
global.fetch = async function (url, init) {
  const key = url.url ?? url
  console.error('Fetching:', key)

  const response = await _fetch(url, init)
  cache[key] = await response.clone().text()
  return response
}

for (const test of tests) {
  console.error('===', test.input, '===')
  const result = await Cite.async(test.input)
  console.error(result.data[0].id)
}

await fs.writeFile(cachePath, JSON.stringify(cache, null, 2))
