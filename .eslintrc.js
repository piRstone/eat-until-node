module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:import/typescript',
    ],
    plugins: [
        '@typescript-eslint',
        'simple-import-sort',
        'sort-keys-fix',
    ],
    settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            typescript: {
                alwaysTryTypes: true,
                project: './**/tsconfig.json',
            },
        },
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            rules: {
                '@typescript-eslint/indent': ['error', 4, { SwitchCase: 1 }],
                'import/order': 'off',
                'no-undef': 'off', // https://github.com/eslint/typescript-eslint-parser/issues/437,
                'no-unused-vars': 'off',
                'no-unused-expressions': ['error', { allowTernary: true }],
                'simple-import-sort/imports': 'error',
                'sort-keys-fix/sort-keys-fix': 'warn',
                'no-case-declarations': 'off',
                indent: 'off',
                '@typescript-eslint/no-unused-vars': 'off',
                '@typescript-eslint/no-unused-vars-experimental': 'off',
            },
        },
        {
            files: ['**/.eslintrc.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
};
