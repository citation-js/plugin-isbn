import { util } from '@citation-js/core'

import * as google from './google-books.js'
import * as ol from './open-library.js'

async function getResponse (isbn) {
  const googleUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
  const olUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`

  let json = JSON.parse(await util.fetchFileAsync(googleUrl))

  if (json.totalItems !== 0) {
    return json
  }

  json = JSON.parse(await util.fetchFileAsync(olUrl))

  if (Object.keys(json).length !== 0) {
    return json
  }

  throw new Error(`Cannot find resource for ISBN: ${isbn}`)
}

export const ref = '@isbn'
export const formats = {
  // fetch from API
  '@isbn/isbn-10': {
    parseAsync: getResponse,
    parseType: {
      dataType: 'String',
      predicate: /^\d{10}$/
    }
  },

  '@isbn/isbn-13': {
    parseAsync: getResponse,
    parseType: {
      dataType: 'String',
      predicate: /^(978|979)\d{10}$/
    }
  },

  '@isbn/isbn-a': {
    parse: doi => doi.slice(3).replace(/\D/g, ''),
    parseType: {
      dataType: 'String',
      predicate: /^10\.(978|979)\.\d{2,8}\/\d{2,7}$/
    },
    outputs: '@isbn/isbn-13'
  },

  '@isbn/number': {
    parse: number => number.toString(),
    parseType: {
      dataType: 'Primitive',
      predicate: number => [10, 13].includes(number.toString().length)
    },
    outputs: '@isbn/isbn-13'
  },

  // translate to CSL-JSON
  '@isbn/vnd.google.books.volumes+object': {
    parse (record) {
      return record.items
    },
    parseType: {
      dataType: 'SimpleObject',
      propertyConstraint: [
        {
          props: 'kind',
          value: kind => kind === 'books#volumes'
        },
        { props: ['totalItems', 'items'] }
      ]
    }
  },

  '@isbn/vnd.google.books.volume+object': {
    parse: google.parse,
    parseType: {
      dataType: 'SimpleObject',
      propertyConstraint: [
        {
          props: 'kind',
          value: kind => kind === 'books#volume'
        },
        { props: ['volumeInfo', 'id'] }
      ]
    },
    outputs: '@csl/object'
  },

  '@isbn/vnd.archive.openlibrary.books+object': {
    parse: ol.parse,
    parseType: {
      dataType: 'SimpleObject',
      predicate (response) {
        return Object.keys(response).every(key => key.slice(0, 5) === 'ISBN:')
      }
    },
    outputs: '@csl/list+object'
  }
}
