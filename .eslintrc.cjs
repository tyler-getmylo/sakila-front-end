module.exports = {
    env: {
        node: true, es2021: true,
    },
    extends: ['plugin:node/recommended', 'plugin:react/recommended', 'airbnb', 'airbnb/hooks', 'prettier',],
    overrides: [],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        }, ecmaVersion: 'latest', sourceType: 'module',
    },
    plugins: ['react', 'prettier',],
    rules: {
        "prettier/prettier": "error",
        'no-console': "off",
        'quotes': ["error", "single", {"avoidEscape": true}],
        "camelcase": "off",
        "import/extensions": "off"
    },
};
