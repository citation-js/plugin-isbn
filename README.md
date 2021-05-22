## Install

```js
npm install @citation-js/plugin-isbn
```

### Browser

Make a build with `@citation-js/plugin-isbn` on the [build tool](https://juniper-coat.glitch.me)!

## Use

Install the plugin by `require`-ing it:

```js
require('@citation-js/plugin-isbn')
```

## Formats

Formats and other features added by this plugin.

### ISBN identifiers

  * ISBN-10 (`@isbn/isbn-10`)
  * ISBN-13 (`@isbn/isbn-13`)
  * ISBN-A (actionable ISBN, `@isbn/isbn-a`)

### Google Books API

One of the few public, free APIs to resolve ISBNs is the [Google Books API](https://developers.google.com/books/docs/v1/using#PerformingSearch).
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
