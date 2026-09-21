import type { CSL } from '@citation-js/core'

interface OpenLibraryVolume {
  authors: object[]
  identifiers: object
  number_of_pages?: number
  publishers?: object[]
  publish_date?: string
  publish_places?: object[]
  subjects?: object[]
  subject_places?: object[]
  subject_people?: object[]
  subject_times?: object[]
  title?: string
  url?: string
}

type Extend<T> = T & { [k in Exclude<string, keyof T>]?: any }

type OpenLibraryVolumes = Record<`ISBN:${string}`, Extend<OpenLibraryVolume>>

interface GoogleBooksVolume {
  kind: 'books#volume'
  id: string
  etag: string
  selfLink: string
  volumeInfo: object
  saleInfo: object
  accessInfo: object
  searchInfo: object
}

interface GoogleBooksVolumes {
  kind: 'books#volumes'
  totalItems: number
  items: Array<GoogleBooksVolume>
}

declare module '@citation-js/core' {
  namespace plugins {
    namespace input {
      interface Formats {
        '@isbn/isbn-10': (input: string) => GoogleBooksVolumes|OpenLibraryVolumes
        '@isbn/isbn-13': (input: string) => GoogleBooksVolumes|OpenLibraryVolumes
        '@isbn/isbn-a': (input: string) => string
        '@isbn/number': (input: number) => string

        '@isbn/vnd.google.books.volumes+object': (input: GoogleBooksVolumes) => Array<CSL>
        '@isbn/vnd.google.books.volume+object': (input: GoogleBooksVolume) => CSL
        '@isbn/vnd.archive.openlibrary.books+object': (input: OpenLibraryVolumes) => Array<CSL>
      }
    }
  }
}
