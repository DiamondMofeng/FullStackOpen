// eslint-disable-next-line no-undef
module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react", "jest"
  ],
  "rules": {
    "indent": [
      "warn",
      2
    ],
    "linebreak-style": [
      "off",
      "windows"
    ],
    "quotes": [
      "off",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "eqeqeq": "warn",
    "no-trailing-spaces": "warn",
    "object-curly-spacing": [
      "error", "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "no-console": 0,
    "react/prop-types": 0
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}