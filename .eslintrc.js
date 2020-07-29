module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
    },
    env: {
        node: true,
    },
    plugins: ['svelte3', '@typescript-eslint'],
    extends: ['eslint:recommended'],
    overrides: [
        {
            files: ['*.svelte'],
            processor: 'svelte3/svelte3',
        },
        {
            files: ['**/*.ts', '**/*.svelte'],
            env: {
                node: false,
                es6: true,
            },
            extends: [
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
            ],
        },
    ],
};
