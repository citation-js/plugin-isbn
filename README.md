# @citation-js/plugin-isbn

Thie plugin adds support for ISBN numbers through a variety of APIs.

[![NPM version](https://img.shields.io/npm/v/@citation-js/plugin-isbn.svg)](https://npmjs.org/package/@citation-js/plugin-isbn)
[![Codecov](https://img.shields.io/codecov/c/gh/citation-js/plugin-isbn)](https://app.codecov.io/gh/citation-js/plugin-isbn)
[![NPM total downloads](https://img.shields.io/npm/dt/@citation-js/plugin-isbn.svg)](https://npmcharts.com/compare/@citation-js%2Fplugin-isbn?minimal=true)
![License](https://img.shields.io/npm/l/@citation-js/plugin-isbn.svg)

## Install

```js
npm install @citation-js/plugin-isbn
```

### Browser

Make a build with `@citation-js/plugin-isbn` on the [build tool](https://github.com/citation-js/bundle-tool)!

## Use

```js
import '@citation-js/plugin-isbn'
```

Or install the plugin by `require`-ing it:

```js
require('@citation-js/plugin-isbn')
```

## Formats

Formats and other features added by this plugin.

### ISBN identifiers

  * ISBN-10 (`@isbn/isbn-10`)
  * ISBN-13 (`@isbn/isbn-13`)
  * ISBN-A (actionable ISBN, `@isbn/isbn-a`)

### Open Library API

The other API used in this plugin is the [Open Library Books API](https://openlibrary.org/dev/docs/api/books).
It returns the following information:

  - authors,
  - page count,
  - publisher,
  - publication date,
  - publication place,
  - keywords,
  - title, and
  - URL.

### Google Books API

> The Google Books API seems to no longer be available to the public, and has been disabled by default.

One of the few ~public, free~ APIs to resolve ISBNs is the [Google Books API](https://developers.google.com/books/docs/v1/using#PerformingSearch).
It returns [volumes](https://developers.google.com/books/docs/v1/reference/volumes#resource),
which contain information on the

  - authors,
  - entity type (magazine or book),
  - categories/keywords,
  - description,
  - dimensions,
  - language,
  - page count,
  - publisher,
  - title,
  - publication date, and
  - a (Google Books) URL.

For the heck of it, this plugin also support creating API responses from existing
metadata. This benefits no one.

## Configuration

### APIs

Configure which APIs are called and in what order.

```js
import { plugins } from '@citation-js/core'

const config = plugins.config.get('@isbn)
config.api = ['googlebooks', 'openlibrary']
```
