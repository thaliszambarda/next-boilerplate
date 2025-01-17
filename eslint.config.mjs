import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import eslintParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintSecurity from "eslint-plugin-security";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginVitest from "eslint-plugin-vitest";
import eslintPluginTestLibrary from "eslint-plugin-testing-library";
import tailwind from "eslint-plugin-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
});

const patchedConfig = fixupConfigRules([
  ...compat.extends("next/typescript", "next/core-web-vitals"),
]);

const config = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: eslintParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  {
    plugins: {
      tailwindcss: tailwind,
    },
    rules: {
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",
    },
  },
  {
    plugins: {
      security: eslintSecurity,
    },
    rules: {
      "security/detect-object-injection": "off",
    },
  },
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  ...patchedConfig,
  eslintConfigPrettier,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    settings: {
      react: {
        version: "detect",
      },
      tailwindcss: {
        callees: ["cn"],
        config: "tailwind.config.ts",
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
      vitest: eslintPluginVitest,
      "testing-library": eslintPluginTestLibrary,
    },
    rules: {
      "prettier/prettier": "warn",
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "linebreak-style": ["warn", "unix"],
      camelcase: "warn",
      quotes: ["warn", "double"],
      semi: ["warn", "always"],
      "jsx-a11y/anchor-is-valid": "warn",
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },
    ignores: [
      "**/node_modules/*",
      "**/public/*",
      "**/.next/*",
      "**/coverage/*",
      "**/src/styles/globals.css",
    ],
  },
];

export default config;
