module.exports = {
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
	},
	extends: [
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
	],
	rules: {
		// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
		// e.g. "@typescript-eslint/explicit-function-return-type": "off",
		'no-mixed-spaces-and-tabs': 'error',
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		'semi-style': ['error', 'last'],
		semi: ['error', 'always'],
		'no-extra-semi': 'error',
		'semi-spacing': ['error', {
			'before': false,
			'after': true,
		}],
		'comma-dangle': ['error', 'always-multiline'],
	},
};
