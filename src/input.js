import { util } from '@citation-js/core'

import config from './config.js'
import * as google from './google-books.js'
import * as ol from './open-library.js'

const apiDefinitions = {
  googlebooks: {
    url: isbn => `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
    checkResponse: json => json.totalItems
  },

  openlibrary: {
    url: isbn => `https://openlibrary.org/isbn/${isbn}.json`,
    checkResponse: () => true
  }
}

function getUrls (isbn) {
  isbn = isbn.replace(/-/g, '')

  return config.api.map(api => [apiDefinitions[api].url(isbn), apiDefinitions[api].checkResponse])
}

function getResponse (isbn) {
  const errors = []

  for (const [url, check] of getUrls(isbn)) {
    try {
      const response = util.fetchFile(url)
      if (response) {
        const json = JSON.parse(response)
        if (check(json)) {
          return json
        }
      }
    } catch (error) {
      errors.push(error)
    }
  }

  throw new Error(`Cannot find resource for ISBN: ${isbn}`, { cause: errors.pop() })
}

async function getResponseAsync (isbn) {
  const errors = []

  for (const [url, check] of getUrls(isbn)) {
    try {
      const response = await util.fetchFileAsync(url)
      if (response) {
        const json = JSON.parse(response)
        if (check(json)) {
          return json
        }
      }
    } catch (error) {
      errors.push(error)
    }
  }

  throw new Error(`Cannot find resource for ISBN: ${isbn}`, { cause: errors.pop() })
}

export const ref = '@isbn'
export const formats = {
  // fetch from API
  '@isbn/isbn-10': {
    parse: getResponse,
    parseAsync: getResponseAsync,
    parseType: {
      dataType: 'String',
      predicate (id) {
        return /^\d{9}[0-9xX]$/.test(id.replace(/-/g, ''))
      }
    }
  },

  '@isbn/isbn-13': {
    parse: getResponse,
    parseAsync: getResponseAsync,
    parseType: {
      dataType: 'String',
      predicate (id) {
        return /^(978|979)\d{10}$/.test(id.replace(/-/g, ''))
      }
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

  '@isbn/vnd.archive.openlibrary.book+object': {
    parse: ol.parse,
    parseAsync: ol.parseAsync,
    parseType: {
      dataType: 'SimpleObject',
      propertyConstraint: {
        props: 'key',
        value: key => key.startsWith('/books/OL')
      }
    },
    outputs: '@csl/list+object'
  }
}
