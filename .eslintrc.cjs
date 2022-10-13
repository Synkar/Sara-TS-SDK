module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "@typescript-eslint/no-namespace": "off",
    "no-useless-catch": "off",
  },
  ignorePatterns: ["dist/**/*"],
};
