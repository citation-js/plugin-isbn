import { promises as fs } from 'node:fs'
import path from 'node:path'
import { mock } from 'node:test'
import * as original from '@citation-js/core'

import tests from '../suite.data.js'

export default mock.module('@citation-js/core', {
  namedExports: {
    ...original,
    util: {
      ...original.util,
      fetchFileAsync: async function ours (url, ...args) {
        return original.util.fetchFileAsync.call(this, url, ...args)
          .then(response => (cache[url] = response))
      }
    }
  }
})

const { Cite } = await import('@citation-js/core')
await import('../../src/index.js')

const cache = {}

async function main () {
  for (const test of tests) {
    console.log((await Cite.async(test.input)).data[0].id)
  }

  mock.restore()

  await fs.writeFile(
    path.join(__dirname, 'cache.json'),
    JSON.stringify(cache)
  )
}

main().catch(console.error)
