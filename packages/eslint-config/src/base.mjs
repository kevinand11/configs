import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import promise from 'eslint-plugin-promise'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

import { addIgnores } from './utils.mjs'

const tsFiles = ['*.ts', '**/*.ts']

/** @type {import('eslint').Linter.Config[]} */
const configs = [
	eslint.configs.recommended,
	// prettier,
	{
		...importPlugin.flatConfigs.recommended,
		rules: {
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
		settings: {
			...importPlugin.flatConfigs.recommended.settings,
			'import/resolver': {
				typescript: {
					project: ['tsconfig.json', '**/tsconfig.json']
				}

			}
		},
	},
	{
		...importPlugin.flatConfigs.typescript,
		files: tsFiles,
	},
	{
		...promise.configs['flat/recommended'],
		rules: {
			...promise.configs['flat/recommended'].rules,
			'promise/param-names': 'off',
			'promise/always-return': 'off',
			'promise/catch-or-return': 'off',
		}
	},
	{
		plugins: { stylistic },
		rules: {
			'stylistic/arrow-parens': ['error', 'always'],
			'stylistic/semi': ['error', 'never'],
			'stylistic/no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		}
	},
	{
		files: tsFiles,
		plugins: { '@typescript-eslint': tsEslint.plugin },
		languageOptions: {
			parser: tsEslint.parser,
			parserOptions: {
				project: false,
				projectService: false,
			},
		},
		rules: {
			// '@typescript-eslint/consistent-type-imports': 'error',
			// '@typescript-eslint/consistent-type-exports': 'error',
			'@typescript-eslint/no-unused-vars': [
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
		},
	},
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
			},
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
			// 'prettier/prettier': ['error', { endOfLine: 'auto' }],
		},
	}
]

export default configs.map(addIgnores)