import assert from 'node:assert'
import path from 'node:path'
import { promises as fs } from 'node:fs'
import { describe, it, mock } from 'node:test'

import * as original from '@citation-js/core'
import apiTests from './suite.data.js'

const cache = JSON.parse(await fs.readFile(path.join(import.meta.dirname, 'cache', 'cache.json'), 'utf8'))

export default mock.module('@citation-js/core', {
  namedExports: {
    ...original,
    util: {
      ...original.util,
      fetchFileAsync: function ours (url, ...args) {
        if (url in cache) {
          return cache[url]
        } else {
          // return original.util.fetchFileAsync.call(this, url, ...args)
          return ''
        }
      }
    }
  }
})

const { plugins } = await import('@citation-js/core')
await import('../src/index.js')

describe('isbn', function () {
  describe('api', function () {
    for (const { name, input, output } of apiTests) {
      it(name, async function () {
        assert.deepStrictEqual(await plugins.input.chainAsync(input, { generateGraph: false }), output)
      })
    }

    describe('errors', function () {
      it('for non-existent ISBN', async function () {
        // Unforunately, both 1-234-56789-X and 0-00-000000-0 are in use according to Google Books
        await assert.rejects(
          () => plugins.input.chainAsync('abc', { generateGraph: false, forceType: '@isbn/isbn-13' }),
          { message: 'Cannot find resource for ISBN: abc' }
        )
      })
    })
  })
})
