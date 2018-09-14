module.exports = {
  'parserOptions': {
    'ecmaVersion': 8,
    'sourceType': 'module'
  },
  'env': {
    'node': true,
    'es6': true
  },
  'extends': 'eslint:recommended',
  'rules': {
    'no-multiple-empty-lines': 'warn',
    'no-var': 'error'
  }
}