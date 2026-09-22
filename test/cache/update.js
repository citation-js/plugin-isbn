import path from 'node:path'
import { promises as fs } from 'node:fs'
import { setGlobalDispatcher, Agent } from 'undici'

import { Cite } from '@citation-js/core'
import '../../src/index.js'

import tests from '../suite.data.js'

const cache = {}

function interceptor (dispatch) {
  return (options, handler) => {
    const url = (options.origin ?? '') + options.path
    const data = []

    console.log(url)
    return dispatch(options, {
      ...handler,
      onResponseData (_controller, chunk) {
        data.push(chunk)
      },
      onResponseEnd (_controller, _trailers) {
        cache[url] = Buffer.concat(data).toString('utf8')
      }
    })
  }
}

setGlobalDispatcher(new Agent().compose(interceptor))

async function main () {
  for (const test of tests) {
    console.log((await Cite.async(test.input)).data[0].id)
  }

  await fs.writeFile(
    path.join(path.join(import.meta.dirname, 'cache.json'), 'cache.json'),
    JSON.stringify(cache)
  )
}

main().catch(console.error)
