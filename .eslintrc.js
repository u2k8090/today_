// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    es6: true,
    jquery: true,
    node: true,
    browser: true
  },
  extends: 'airbnb',
  plugins: [
    'html'
  ],
  'rules': {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'indent': [2, 2],
    'no-var': 2,
    'semi': [2, 'always'],
  }
}
