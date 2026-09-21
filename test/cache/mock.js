import { promises as fs } from 'node:fs'
import path from 'node:path'
import { mock } from 'node:test'
import * as original from '@citation-js/core'

const cache = JSON.parse(await fs.readFile(path.join(import.meta.dirname, 'cache.json'), 'utf8'))

export default mock.module('@citation-js/core', {
  namedExports: {
    ...original,
    util: {
      ...original.util,
      fetchFileAsync: function ours (url, ...args) {
        if (url in cache) {
          return cache[url]
        } else {
          return '' // original.util.fetchFileAsync.call(this, url, ...args)
        }
      }
    }
  }
})
