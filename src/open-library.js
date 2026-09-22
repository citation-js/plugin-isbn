import { util } from '@citation-js/core'
import * as name from '@citation-js/name'
import * as date from '@citation-js/date'

// Open Library Books API
// https://openlibrary.org/dev/docs/api/books

const PREFIX = 'https://openlibrary.org'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const DATE_REGEX = new RegExp(`^(${MONTHS.join('|')}) (\\d+), (\\d+)$`)

function parseDate (string) {
  const match = string.match(DATE_REGEX)

  if (match) {
    const [month, day, year] = match.slice(1)
    return {
      'date-parts': [[+year, MONTHS.indexOf(month) + 1, +day]]
    }
  }

  return date.parse(string)
}

const OL_PROPS = [
  { target: 'type', convert: { toTarget: () => 'book' } },

  {
    source: 'authors',
    target: 'author',
    convert: {
      toTarget (authors) {
        return authors.map(({ name: author, key }) => {
          author = name.parse(author)
          author._url = `${PREFIX}${key}`
          return author
        })
      }
    }
  },
  {
    source: 'identifiers',
    target: 'QID',
    convert: {
      toTarget (identifiers) { return identifiers.wikidata?.[0] }
    }
  },
  {
    source: ['isbn_13', 'isbn_10'],
    target: 'ISBN',
    convert: {
      toTarget (isbn13 = [], isbn10 = []) { return isbn13[0] ?? isbn10[0] }
    }
  },
  {
    source: 'languages',
    target: 'language',
    convert: {
      toTarget (languages) { return languages[0].identifiers.iso_639_1[0] }
    }
  },
  { source: 'number_of_pages', target: 'number-of-pages' },
  {
    source: 'publishers',
    target: 'publisher',
    convert: {
      toTarget (publishers) { return publishers[0] }
    }
  },
  {
    source: 'publish_date',
    target: 'issued',
    convert: { toTarget: parseDate }
  },
  {
    source: 'publish_places',
    target: 'publisher-place',
    convert: {
      toTarget (places) { return places[0] }
    }
  },
  {
    source: ['subjects', 'subject_places', 'subject_people', 'subject_times'],
    target: 'keyword',
    convert: {
      toTarget (...subjects) { return [].concat(...subjects).filter(Boolean).join() }
    }
  },
  'title',
  {
    source: 'key',
    target: 'URL',
    convert: {
      toTarget (path) { return `${PREFIX}${path}` }
    }
  },
  {
    source: 'key',
    target: 'id',
    convert: {
      toTarget (key) { return key.split('/').pop() }
    }
  }
]

const translator = new util.Translator(OL_PROPS)

function convert (responses) {
  const results = []

  for (const url in responses) {
    if (!url.startsWith('/books/')) {
      continue
    }

    const result = { ...responses[url] }

    for (const field of ['authors', 'languages']) {
      if (Array.isArray(result[field])) {
        const keys = result[field]

        result[field] = []
        for (const { key } of keys) {
          result[field].push(responses[key])
        }
      }
    }

    results.push(translator.convertToTarget(result))
  }

  return results
}

function collectUrls (response) {
  const urls = []

  for (const field of ['authors', 'languages']) {
    if (Array.isArray(response[field])) {
      for (let i = 0; i < response[field].length; i++) {
        urls.push(response[field][i].key)
      }
    }
  }

  return urls
}

export function parse (response) {
  const responses = { [response.key]: response }
  for (const url of collectUrls(response)) {
    responses[url] = util.fetchFile(`${PREFIX}${url}.json`)
  }
  return convert(responses)
}

export async function parseAsync (response) {
  const responses = { [response.key]: response }
  const requests = await Promise.all(collectUrls(response).map(async url => {
    const response = await util.fetchFileAsync(`${PREFIX}${url}.json`)
    return [url, JSON.parse(response)]
  }))
  for (const [url, response] of requests) {
    responses[url] = response
  }
  return convert(responses)
}
