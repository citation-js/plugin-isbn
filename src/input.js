import * as google from './google-books.js'

function getUrl (isbn) {
  return `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
}

export const ref = '@isbn'
export const formats = {
  // fetch from API
  '@isbn/isbn-10': {
    parse: getUrl,
    parseType: {
      dataType: 'String',
      predicate: /^\d{10}$/
    }
  },

  '@isbn/isbn-13': {
    parse: getUrl,
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
    }
  },

  '@isbn/number': {
    parse: number => number.toString(),
    parseType: {
      dataType: 'Primitive',
      predicate: number => [10, 13].includes(number.toString().length)
    }
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
    parse (record) {
      return google.parse(record)
    },
    parseType: {
      dataType: 'SimpleObject',
      propertyConstraint: [
        {
          props: 'kind',
          value: kind => kind === 'books#volume'
        },
        { props: ['volumeInfo', 'id'] }
      ]
    }
  }
}
