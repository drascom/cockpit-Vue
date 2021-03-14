module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'formidable/rules/eslint/best-practices/on',
    'formidable/rules/eslint/es6/on',
    'formidable/rules/eslint/errors/off',
    'formidable/rules/eslint/strict/on',
    'formidable/rules/eslint/node/off',
    'formidable/rules/eslint/style/on',
    'formidable/rules/eslint/variables/on',
    'plugin:vue/base',
    'eslint:recommended',
    'prettier/vue'
  ],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eol-last': ['off'],
    camelcase: [
      'off',
      {
        properties: 'always'
      }
    ],
    'comma-style': ['warn', 'last'],
    curly: ['error'],
    eqeqeq: ['error', 'always'],
    'func-call-spacing': ['off'],
    indent: 0,
    'no-undef': 2,
    'handle-callback-err': ['error'],
    'arrow-body-style': ['off', 2],
    'linebreak-style': ['off', 'unix'],
    'no-dupe-keys': ['error'],
    'no-duplicate-case': ['error'],
    'no-extra-semi': ['warn'],
    'no-labels': ['error'],
    'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
    'no-redeclare': ['warn'],
    'no-return-assign': ['error', 'always'],
    'no-sequences': ['error'],
    'no-trailing-spaces': ['warn'],
    'no-unexpected-multiline': ['warn'],
    'no-unreachable': ['warn'],
    'no-magic-numbers': ['off'],
    'max-params': ['off'],
    'max-len': ['off'],
    'max-nested-callbacks': ['off'],
    'new-cap': ['off'],
    'operator-linebreak': ['off'],
    'quote-props': ['off'],
    'space-in-parens': ['off'],
    'consistent-this': ['error', 'that'],
    'no-unused-vars': [
      'warn',
      {
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^unused($|[A-Z].*$)'
      }
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false
      }
    ],
    'no-var': 2,
    'one-var': ['warn', 'never'],
    'prefer-arrow-callback': [
      'warn',
      {
        allowNamedFunctions: true
      }
    ],
    quotes: [
      'off',
      'single',
      {
        avoidEscape: false,
        allowTemplateLiterals: true
      }
    ],
    semi: ['error', 'never'],
    'semi-spacing': [
      'warn',
      {
        before: false,
        after: true
      }
    ],
    'semi-style': ['warn', 'last'],
    'space-before-function-paren': ['off', 2]
  },
  globals: {
    $nuxt: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
