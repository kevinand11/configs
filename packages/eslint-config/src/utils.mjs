/**
 * @param {import('eslint').Linter.Config} config
 * @returns (import('eslint').Linter.Config)
 */
export function addIgnores (config) {
	return {
		...config,
		ignores: [...(config.ignores ?? []), 'node_modules/', 'lib/', 'dist/', 'public/']
	}
}