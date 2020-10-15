const error = 2;
const warn = 1;
const off = 0;

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
    es6: true
  },
  rules: {
    // braces
    'arrow-parens': [error, 'as-needed'],
    'brace-style': error,
    'curly': error,
    'no-empty': [error, { allowEmptyCatch: true }],

    // variables, objects & arguments
    'dot-notation': error,
    'no-multi-assign': error,
    'no-param-reassign': error,
    'no-undef': error,
    'no-use-before-define': [error, 'nofunc'],
    'no-var': error,
    'object-shorthand': error,
    'one-var': [error, 'never'],
    'prefer-const': error,
    'prefer-destructuring': error,
    'prefer-spread': error,

    // layout, commas & semicolons
    'arrow-body-style': error,
    'comma-style': error,
    'function-paren-newline': error,
    'implicit-arrow-linebreak': error,
    'indent': [error, 2, { SwitchCase: 1, MemberExpression: 'off' }],
    'newline-per-chained-call': [error, { ignoreChainWithDepth: 2 }],
    'max-len': [error, { code: 210 }],
    'operator-linebreak': [error, 'after'],
    'semi': [error, 'always'],

    // restricted syntax
    'no-array-constructor': error,
    'no-console': [error, { allow: ['error', 'warn'] }],
    'no-eval': error,
    'no-iterator': error,
    'no-loop-func': error,
    'no-new-func': error,
    'no-new-object': error,
    'no-new-wrappers': error,
    'no-sequences': error,

    // strings
    'no-useless-concat': error,
    'prefer-template': error,

    // other errors
    'camelcase': error,
    'eqeqeq': error,
    'no-unneeded-ternary': error,

    // spacing & empty lines
    'array-bracket-spacing': warn,
    'arrow-spacing': warn,
    'computed-property-spacing': warn,
    'eol-last': warn,
    'func-call-spacing': warn,
    'key-spacing': warn,
    'keyword-spacing': warn,
    'lines-between-class-members': [warn, 'always', { exceptAfterSingleLine: true }],
    'no-multiple-empty-lines': [warn, { max: 1, maxEOF: 1 }],
    'no-whitespace-before-property': warn,
    'object-curly-spacing': [warn, 'always'],
    'space-before-blocks': warn,
    'space-before-function-paren': [warn, 'never'],
    'space-in-parens': warn,
    'space-infix-ops': warn,
    'spaced-comment': warn,

    // funcitons usage
    'array-callback-return': warn,
    'class-methods-use-this': warn,
    'func-style': [warn, 'declaration', { allowArrowFunctions: true }],
    'no-useless-call': warn,
    'prefer-arrow-callback': [warn, { allowNamedFunctions: true }],
    'prefer-rest-params': warn,

    // other warnings
    'no-else-return': warn,
    'no-unused-vars': [warn, { argsIgnorePattern: '^_' }],
    'quotes': [warn, 'single', { avoidEscape: true }],
    'quote-props': [warn, 'consistent-as-needed'],

    // disabled rules
    'import/exports-last': off,
    'import/no-duplicates': off,
    'no-confusing-arrow': off,
  }
};
