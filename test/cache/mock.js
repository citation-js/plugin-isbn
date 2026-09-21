import { mock } from 'node:test'
import * as original from '@citation-js/core'
import cache from './cache.json' with { type: 'json' }

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
