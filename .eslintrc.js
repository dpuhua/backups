module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    // 'prettier/prettier': 'off',
    'no-console': 'off',
    'camelcase': 'off',
    'eqeqeq': 'off',
    'no-misleading-character-class': 'off',
    'no-useless-escape': 'off',
    "vue/this-in-template": "off"
  },
  globals: {
    BMap: true,
    BMapLib: true,
  }
}
