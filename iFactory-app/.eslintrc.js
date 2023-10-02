module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'standard-react',
  ],
  parser: 'babel-eslint',
  plugins: ['react-hooks', 'promise', 'react', 'prettier'],
  rules: {
    'prettier/prettier': 'off',
    'spaced-comment': 'off',
    'no-console': 'warn',
    'consistent-return': 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    'no-process-exit': 'warn',
    'no-param-reassign': 'off',
    'no-return-await': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    'prefer-destructuring': ['error', {object: true, array: false}],
    'no-unused-vars': ['error', {argsIgnorePattern: 'req|res|next|val'}],
    'brace-style': 'off',
    'space-before-function-paren': 'off',
    'padded-blocks': 'off',
    'func-call-spacing': 'off',
    'no-unexpected-multiline': 'off',
    'no-useless-constructor': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'react/prop-types': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'object', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-native',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-native-reanimated',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'ignore',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/self-closing-comp': ['error', {component: true, html: true}],
    'multiline-ternary': ['error', 'never'],
  },
};