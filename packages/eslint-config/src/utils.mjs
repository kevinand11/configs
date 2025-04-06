const files = ['node_modules/**/*', 'lib/**/*', 'dist/**/*'].flatMap((f) => [f, `**/${f}`])

/**
 * @param {import('eslint').Linter.Config} config
 * @returns (import('eslint').Linter.Config)
 */
export function addIgnores (config) {
	return {
		...config,
		ignores: [...(config.ignores ?? []), ...files]
	}
}