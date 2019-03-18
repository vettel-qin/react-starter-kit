module.exports = {
  extends: 'stylelint-config-standard',

  plugins: [
    'stylelint-order',
  ],

  rules: {
    // 不允许未知属性
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'composes',
        ]
      }
    ],

    //不允许未知的伪类选择器
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'global',
          'local'
        ]
      }
    ],

    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'at-root',
          'content',
          'extend',
          'include',
          'mixin',
          'function',
          'return',
          'debug',
          'warn',
          'error',
          'if',
          'else',
          'for',
          'each',
          'while',
        ]
      }
    ],

    'string-quotes': 'single',

    'order/order': ['custom-properties', 'dollar-variables', 'at-variables', 'declarations', 'at-rules', 'rules'],

    'order/properties-order': [],

    'no-missing-end-of-source-newline': false
  }
}