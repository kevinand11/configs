import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier/recommended'
import promise from 'eslint-plugin-promise'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
  eslint.configs.recommended,
  prettier,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json', '**/.tsconfig.json'],
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: { promise, ts: tsPlugin, stylistic },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json', '**/.tsconfig.json']
        }

      }
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-tabs': 'off',
      'no-var': 'error',
      'accessor-pairs': 'off',
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-const': ['error'],
      'no-return-assign': 'off',
      curly: 'off',
      'object-property-newline': 'off',
      'require-atomic-updates': 'off',
      'require-await': 'off',
      'no-unused-vars': 'off',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'stylistic/arrow-parens': ['error', 'always'],
      'stylistic/semi': ['error', 'never'],
      'stylistic/no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      'ts/consistent-type-imports': 'error',
      'ts/consistent-type-exports': 'error',
      'ts/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          'alphabetize': { order: 'asc', caseInsensitive: true },
          'pathGroups': [{ pattern: '~/**', group: 'internal', position: 'before' }],
          'pathGroupsExcludedImportTypes': ['builtin'],
        },
      ],
    },
  },
  {
    ignores: ['node_modules/', 'lib/', 'dist/', 'public/'],
  },
]