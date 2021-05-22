module.exports = {
  presets: [
    [
      '@babel/env', {
        targets: {
          node: '6'
        }
      }
    ]
  ],
  env: {
    coverage: {
      plugins: ['istanbul']
    }
  },
  comments: false
}
