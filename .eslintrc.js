const errType = process.env.NODE_ENV === 'production' ? 'error' : 'off';

module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': errType,
    'no-debugger': errType,
    'semi': [errType, 'always'],
    'space-before-function-paren': [errType, 'never']
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
