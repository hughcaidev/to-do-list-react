module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb',
        'prettier',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react', '@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    root: true,
    rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'react/prop-types': [0],
        'react/jsx-no-constructed-context-values': ['off'],
        'react/button-has-type': ['warn'],
        'react/jsx-no-useless-fragment': ['off'],
        'react/jsx-filename-extension': ['off'],
        'react/jsx-no-bind': ['off'],
        'no-unused-vars': ['warn'],
        'import/extensions': ['off'],
        'import/no-unresolved': ['off']
    }
}
