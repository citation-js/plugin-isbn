import { util } from '@citation-js/core'
import * as name from '@citation-js/name'
import * as date from '@citation-js/date'

// Google Books API V1: Volume representation
// https://developers.google.com/books/docs/v1/reference/volumes#resource

const GOOGLE_PROPS = [
  {
    source: 'printType',
    target: 'type',
    convert: {
      toTarget (type) {
        return {
          BOOK: 'book',
          MAGAZINE: 'article-magazine'
        }[type]
      },
      toSource (type) {
        if (type.slice(0, 7) === 'article') {
          return 'MAGAZINE'
        } else {
          return 'BOOK'
        }
      }
    }
  },
  {
    source: 'authors',
    target: 'author',
    convert: {
      toTarget (authors) { return authors.map(name.parse) },
      toSource (authors) { return authors.map(name.format) }
    }
  },
  { source: 'canonicalVolumeLink', target: 'URL' },
  {
    source: 'categories',
    target: 'keyword',
    convert: {
      toTarget (array) { return array.join(',') },
      toSource (list) { return list.split(',') }
    }
  },
  { source: 'description', target: 'abstract' },
  {
    source: 'dimensions',
    target: 'dimensions',
    convert: {
      toTarget ({ height, width, thickness }) {
        return `${height} x ${width} x ${thickness} cm`
      },
      toSource (list) {
        // currently not possible
      }
    }
  },
  {
    source: 'industryIdentifiers',
    target: ['ISBN', 'ISSN', 'DOI', 'PMID', 'PMCID'],
    convert: {
      toTarget (ids) {
        return ['ISBN_13', 'ISSN']
          .map(id => (ids.find(({ type }) => type === id) || {}).identifier)
      },
      toSource (isbn, issn, ...other) {
        return [
          isbn && {
            type: isbn.length === 13 ? 'ISBN_13' : 'ISBN_10',
            identifier: isbn
          },

          issn && { type: 'ISSN', identifier: issn },

          ...other.map(identifier => ({ type: 'OTHER', identifier }))
        ].filter(Boolean)
      }
    }
  },
  'language',
  { source: 'pageCount', target: 'number-of-pages' },
  'publisher',
  'title',
  {
    source: 'publishedDate',
    target: 'issued',
    convert: {
      toTarget: date.parse,
      toSource: date.format
    }
  }
]

const translator = new util.Translator(GOOGLE_PROPS)

export function parse (volume) {
  // See https://twitter.com/larswillighagen/status/1395899101691142144
  if (volume.volumeInfo.language === 'un') { delete volume.volumeInfo.language }

  return translator.convertToTarget(volume.volumeInfo)
}

export function format (records) {
  return {
    kind: 'books#volumes',
    totalItems: records.length,
    items: records.map(translator.convertToSource)
  }
}

export const GOOGLE_BOOKS_API_VERSION = 'v1'
