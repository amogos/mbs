module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true
    },
    "parser": '@typescript-eslint/parser',
    "extends": [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint', 
        'plugin:prettier/recommended'
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jest"
    ],
    "rules": {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
    },
    "settings": {
        "react": {
            "version": 'detect',
        },
    },
};