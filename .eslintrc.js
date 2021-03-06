module.exports = {
  rules: {
    'no-console': 'off',
    'consistent-return': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': ["error", { "props": false }],
    'object-curly-newline': ["error", { "multiline": true }],
  },
  extends: 'airbnb',
};
