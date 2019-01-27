
module.exports = {
  extends: require.resolve('./recommended.js'),
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'lucky-monkey/vue-dead-protocol': 'error'
  }
}
