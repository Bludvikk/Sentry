/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ["@acme/eslint-config"], 
  rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
    "@typescript-eslint/consistent-type-imports": "error",
  },
  // uses the config in `packages/config/eslint`
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    tsconfigRootDir: __dirname,
    project: [
      "./tsconfig.json",
      "./apps/*/tsconfig.json",
      "./packages/*/tsconfig.json",
    ],
  },
  settings: {
    next: {
      rootDir: ["apps/nextjs"],
    },
  },
};

module.exports = config;
