module.exports = {
    rules: {
      'no-console': 'off',
      'consistent-return': 'off',
      'arrow-parens': ['error', 'as-needed'],
      'no-param-reassign': ["error", { "props": false }],
      'object-curly-newline': ["error", { "multiline": true }],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/prefer-stateless-function": "off",
    },
    plugins: [
      'jsx-a11y'
    ],
    extends: [
      'airbnb',
      'plugin:jsx-a11y/recommended',
    ]
  };