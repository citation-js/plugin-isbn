/* eslint-env mocha */

import './cache/mock'
import '../src/'

import assert from 'assert'
import { plugins } from '@citation-js/core'
import apiTests from './suite.data'

describe('isbn', function () {
  describe('api', function () {
    for (const { name, input, output } of apiTests) {
      it(name, async function () {
        assert.deepStrictEqual(await plugins.input.chainAsync(input, { generateGraph: false }), output)
      })
    }

    describe('errors', function () {
      it('for non-existent ISBN', function () {
        // Unforunately, both 1-234-56789-X and 0-00-000000-0 are in use according to Google Books
        assert.throws(
          () => plugins.input.chain('abc', { generateGraph: false, forceType: '@isbn/isbn-13' })),
          { message: 'Cannot find resource for ISBN: abc' }
        )
      })
    })
  })
})
