module.exports = [
  {
    name: 'book',
    input: '9780099560432',
    output: [{
      URL: 'https://books.google.com/books/about/Ready_Player_One.html?hl=&id=4zugGMReN3cC',
      abstract: 'It\'s the year 2044, and the real world has become an ugly place. We\'re out of oil. We\'ve wrecked the climate. Famine, poverty, and disease are widespread. Like most of humanity, Wade Watts escapes this depressing reality by spending his waking hours jacked into the OASIS, a sprawling virtual utopia where you can be anything you want to be, where you can live and play and fall in love on any of ten thousand planets. And like most of humanity, Wade is obsessed by the ultimate lottery ticket that lies concealed within this alternate reality: OASIS founder James Halliday, who dies with no heir, has promised that control of the OASIS - and his massive fortune - will go to the person who can solve the riddles he has left scattered throughout his creation. For years, millions have struggled fruitlessly to attain this prize, knowing only that the riddles are based in the culture of the late twentieth century. And then Wade stumbles onto the key to the first puzzle. Suddenly, he finds himself pitted against thousands of competitors in a desperate race to claim the ultimate prize, a chase that soon takes on terrifying real-world dimensions - and that will leave both Wade and his world profoundly changed.',
      author: [
        { family: 'Cline', given: 'Ernest' }
      ],
      issued: { 'date-parts': [[2012]] },
      keyword: 'Fiction',
      // Currently missing (2021-05-22): https://twitter.com/larswillighagen/status/1395899101691142144
      // language: 'en',
      'number-of-pages': 374,
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
      abstract: 'The first volume in Issac Asimov\'s world-famous saga, winner of the Hugo Award for Best All-Time Novel Series. Long after Earth was forgotten, a peaceful and unified galaxy took shape, an Empire governed from the majestic city-planet of Trantor. The system worked, and grew, for countless generations. Everyone believed it would work forever. Everyone except Hari Seldon. As the great scienctific thinker of his age Seldon could not be ignored. Reluctantly, the Commission of Public Safety agreed to finance the Seldon Plan. The coming disaster was predicted by Seldon\'s advances in psychohistory, the mathematics of very large human numbers, and it could not be averted. The Empire was doomed. Soon Trantor would lie in ruins. Chaos would overtake humanity. But the Seldon Plan was a long term strategy to minimize the worst of what was to come. Two Foundations were set up at opposite ends of the galaxy. Of the Second nothing can be told. It guards the secrets of psychohisotry. FOUNDATION is the story of the First Foundation, on the remote planet of Terminus, from which those secrets were withheld.',
      author: [{
        family: 'Asimov',
        given: 'Isaac',
      }],
      issued: {
        'date-parts': [[2016, 9, 19]]
      },
      keyword: 'Archives',
      // Currently missing (2021-05-22): https://twitter.com/larswillighagen/status/1395899101691142144
      // language: 'en',
      'number-of-pages': 240,
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
      keyword: 'Science',
      ISBN: '9780918024565',
      // Currently missing (2021-05-22): https://twitter.com/larswillighagen/status/1395899101691142144
      // language: 'en',
      'number-of-pages': 465,
      title: 'Willard Gibbs',
      issued: { 'date-parts': [[1988]] }
    }]
  }
]
