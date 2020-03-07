module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
  },
};
