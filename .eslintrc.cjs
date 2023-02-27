module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'react/prop-types': [0],
        'react/jsx-no-constructed-context-values': ['warn'],
        'react/button-has-type': ['warn'],
        'react/jsx-no-useless-fragment': ['warn']
    }
}
