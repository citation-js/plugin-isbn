export default [
  {
    name: 'book',
    input: '9780099560432',
    output: [{
      URL: 'https://openlibrary.org/books/OL27257671M',
      author: [
        { family: 'Cline', given: 'Ernest', _url: 'https://openlibrary.org/authors/OL6941868A' }
      ],
      id: 'OL27257671M',
      issued: { 'date-parts': [[2012, 4, 5]] },
      language: 'en',
      'number-of-pages': 372,
      publisher: 'Arrow Books',
      title: 'Ready Player One',
      type: 'book',
      ISBN: '9780099560432',
      QID: 'Q116176475'
    }]
  },
  {
    name: 'as number',
    input: 9780008117498,
    output: [{
      URL: 'https://openlibrary.org/books/OL26774598M',
      author: [{
        _url: 'https://openlibrary.org/authors/OL34221A',
        family: 'Asimov',
        given: 'Isaac'
      }],
      id: 'OL26774598M',
      issued: {
        'date-parts': [[2016]]
      },
      language: 'en',
      publisher: 'Harper Voyager',
      title: 'Foundation',
      type: 'book',
      ISBN: '9780008117498'
    }]
  },
  {
    name: 'with hyphens',
    input: '978-0918024565',
    output: [{
      type: 'book',
      author: [{
        _url: 'https://openlibrary.org/authors/OL392086A',
        given: 'Muriel',
        family: 'Rukeyser'
      }],
      URL: 'https://openlibrary.org/books/OL2383595M',
      ISBN: '0918024579',
      id: 'OL2383595M',
      keyword: 'Gibbs, J. Willard 1839-1903.,Physicists -- United States -- Biography.,Mathematicians -- United States -- Biography.',
      language: 'en',
      'number-of-pages': 465,
      publisher: 'Ox Bow Press',
      'publisher-place': 'Woodbridge, Conn',
      title: 'Willard Gibbs',
      issued: { 'date-parts': [[1988]] }
    }]
  }
]
