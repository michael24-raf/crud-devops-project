// eslint.config.cjs
const { configs: jsConfigs } = require("@eslint/js");
const globals = require("globals");

module.exports = [
  jsConfigs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: { ...globals.node, ...globals.jest } // <-- ajoute Jest ici
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-undef": "error"
    }
  }
];
