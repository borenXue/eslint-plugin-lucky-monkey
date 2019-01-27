

module.exports = {
  plugins: [
    'lucky-monkey'
  ],
  extends: require.resolve('./modules/git-friendly.js'),
  rules: {
    'lucky-monkey/dead-protocol': 'error'
  }
}
