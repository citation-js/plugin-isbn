import assert from 'node:assert'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { describe, it } from 'node:test'

import { plugins } from '@citation-js/core'
import '../src/index.js'

import apiTests from './suite.data.js'

const cache = JSON.parse(await fs.readFile(path.join(import.meta.dirname, 'cache', 'cache.json'), 'utf8'))

const _fetch = global.fetch
global.fetch = async function (url, init) {
  if (cache[url]) {
    return Response.json(JSON.parse(cache[url]))
  } else if (url.contains('1-234-56789-X')) {
    return Response.error()
  }

  console.error('Cache miss', url, init)
  return _fetch(url, init)
}


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
