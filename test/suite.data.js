module.exports = [
  {
    name: 'book',
    input: '9780099560432',
    output: [{
      URL: 'https://books.google.com/books/about/Ready_Player_One.html?hl=&id=4zugGMReN3cC',
      abstract: 'It\'s the year 2044, and the real world has become an ugly place. We\'re out of oil. We\'ve wrecked the climate. Famine, poverty, and disease are widespread.',
      author: [
        { family: 'Cline', given: 'Ernest' }
      ],
      issued: { 'date-parts': [[2012]] },
      keyword: 'Fiction',
      language: 'en',
      'number-of-pages': 388,
      publisher: 'Random House',
      title: 'Ready Player One',
      type: 'book',
      ISBN: '9780099560432'
    }]
  },
  {
    name: 'as number',
    input: 9780008117498,
    output: [{
      URL: 'https://books.google.com/books/about/Foundation.html?hl=&id=PKV6swEACAAJ',
      abstract: "WINNER OF THE HUGO AWARD FOR BEST ALL-TIME SERIES The Foundation series is Isaac Asimov's iconic masterpiece. Unfolding against the backdrop of a crumbling Galactic Empire, the story of Hari Seldon's two Foundations is a lasting testament to an extraordinary imagination, one that shaped science fiction as we know it today. The Galactic Empire has prospered for twelve thousand years. Nobody suspects that the heart of the thriving Empire is rotten, until psychohistorian Hari Seldon uses his new science to foresee its terrible fate. Exiled to the desolate planet Terminus, Seldon establishes a colony of the greatest minds in the Empire, a Foundation which holds the key to changing the fate of the galaxy. However, the death throes of the Empire breed hostile new enemies, and the young Foundation's fate will be threatened first.",
      author: [{
        family: 'Asimov',
        given: 'Isaac'
      }],
      issued: {
        'date-parts': [[2016, 9, 19]]
      },
      keyword: 'Fiction',
      language: 'en',
      publisher: 'Voyager',
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
        given: 'Muriel',
        family: 'Rukeyser'
      }],
      URL: 'https://books.google.com/books/about/Willard_Gibbs.html?hl=&id=Bq9jQgAACAAJ',
      keyword: 'Mathematicians',
      ISBN: '9780918024565',
      language: 'en',
      title: 'Willard Gibbs',
      issued: { 'date-parts': [[1988]] }
    }]
  }
]
