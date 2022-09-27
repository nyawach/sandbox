module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'prettier',
    ],
    overrides: [
        {
            files: '*.stories.@(ts|tsx)',
            extends: ['plugin:storybook/recommended'],
        }
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        'import',
        '@typescript-eslint',
    ],
    rules: {
        'no-console': 'warn',
        'react/prop-types': 'off',
        'import/order': [
            'error',
            {
              groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
              'newlines-between': 'never',
              alphabetize: {
                order: 'asc',
                caseInsensitive: true,
              },
              pathGroups: [
                {
                  group: 'type',
                  pattern: '~/types/**',
                },
                {
                  group: 'internal',
                  pattern: '~/**',
                },
              ],
            },
          ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
