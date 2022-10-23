module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  plugins: ['sonarjs'],
  extends: ['plugin:sonarjs/recommended', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {}
}
