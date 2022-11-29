module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] },
    ],
    'react/function-component-definition': [1, {
      namedComponents: ['function-expression', 'arrow-function'],
      unnamedComponents: ['function-expression', 'arrow-function'],
    }],
    'react/button-has-type': [1, {
      button: true,
      submit: true,
      reset: true,
    }],
    'import/prefer-default-export': 0,
    'import/no-cycle': [0, { ignoreExternal: true }],
    'no-unused-vars': 'warn',
    'linebreak-style': 0,
    'react/jsx-props-no-spreading': 'off',
  },
};
