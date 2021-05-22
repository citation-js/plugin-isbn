/* eslint-env mocha */

import './cache/mock'
import '../src/'

import assert from 'assert'
import { plugins } from '@citation-js/core'
import apiTests from './suite.data'

describe('isbn', function () {
  describe('api', function () {
    for (let { name, input, output } of apiTests) {
      it(name, async function () {
        assert.deepStrictEqual(await plugins.input.chainAsync(input, { generateGraph: false }), output)
      })
    }
  })
})
