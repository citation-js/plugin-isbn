import assert from 'node:assert'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { describe, it } from 'node:test'
import { setGlobalDispatcher, MockAgent } from 'undici'

import { plugins } from '@citation-js/core'
import '../src/index.js'

import apiTests from './suite.data.js'

const cache = JSON.parse(await fs.readFile(path.join(import.meta.dirname, 'cache', 'cache.json'), 'utf8'))

const mockAgent = new MockAgent()
const pools = {}

for (const url in cache) {
  const { origin, pathname: path } = new URL(url)

  if (!pools[origin]) {
    pools[origin] = mockAgent.get(origin)
  }

  pools[origin].intercept({ path }).reply(200, cache[url])
}

setGlobalDispatcher(mockAgent)

describe('isbn', function () {
  describe('api', function () {
    for (const { name, input, output } of apiTests) {
      it(name, async function () {
        assert.deepStrictEqual(await plugins.input.chainAsync(input, { generateGraph: false }), output)
      })
    }

    describe('errors', function () {
      it('for non-existent ISBN', async function () {
        await assert.rejects(
          () => plugins.input.chainAsync('1-234-56789-X', { generateGraph: false }),
          { message: 'Cannot find resource for ISBN: 1-234-56789-X' }
        )
      })
    })
  })
})
