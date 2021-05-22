import { util } from '@citation-js/core'
import * as name from '@citation-js/name'
import * as date from '@citation-js/date'

// Open Library Books API
// https://openlibrary.org/dev/docs/api/books

const CONVERT_ARRAY_OF_OBJECTS = {
  toTarget: ([{ name }]) => name,
  toSource: name => ([{ name }])
}

const OL_PROPS = [
  { target: 'type', convert: { toTarget: () => 'book' } },

  {
    source: 'authors',
    target: 'author',
    convert: {
      toTarget (authors) {
        return authors.map(({ name: author, url }) => {
          author = name.parse(author)
          author._url = url
          return author
        })
      },
      toSource: authors => authors.map((author) => ({ name: name.format(author) }))
    }
  },
  {
    source: 'identifiers',
    target: ['ISBN', 'ISSN', 'DOI', 'PMID', 'PMCID'],
    convert: {
      toTarget: identifiers => identifiers.isbn_13 || identifiers.isbn_10,
      toSource (...identifiers) {
        const ids = [
          identifiers[0] && `isbn_${identifiers[0].length}`,
          'issn',
          'doi',
          'pmid',
          'pmcid'
        ]
        return identifiers.reduce((acc, id, i) => {
          if (id) { acc[ids[i]] = id }
          return acc
        }, {})
      }
    }
  },
  { source: 'number_of_pages', target: 'number-of-pages' },
  {
    source: 'publishers',
    target: 'publisher',
    convert: CONVERT_ARRAY_OF_OBJECTS
  },
  {
    source: 'publish_date',
    target: 'issued',
    convert: { toTarget: date.parse, toSource: date.format }
  },
  {
    source: 'publish_places',
    target: 'publisher-place',
    convert: CONVERT_ARRAY_OF_OBJECTS
  },
  {
    source: ['subjects', 'subject_places', 'subject_people', 'subject_times'],
    target: 'keyword',
    convert: {
      toTarget: (...subjects) => [].concat(...subjects).filter(Boolean).map(({ name }) => name).join(),
      toSource: keywords => [keywords.split(',').map(name => ({
        name,
        url: 'https://openlibrary.org/subjects/' + name.toLowerCase().replace(/\W+/g, '_')
      }))]
    }
  },
  'title',
  { source: 'url', target: 'URL' }
]

const translator = new util.Translator(OL_PROPS)

export function parse (response) {
  return Object.keys(response).map((id) => {
    return translator.convertToTarget(response[id])
  })
}

export function format (records) {
  const output = {}

  for (const record of records) {
    if (!record.ISBN) {
      output[`ISBN:${record.ISBN}`] = translator.convertToSource(record)
    }
  }

  return output
}
