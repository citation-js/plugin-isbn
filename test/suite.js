import assert from 'node:assert'
import { describe, it } from 'node:test'

import './cache/mock.js'
import apiTests from './suite.data.js'

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
