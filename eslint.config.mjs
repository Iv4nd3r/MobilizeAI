import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginTailwindcss from "eslint-plugin-tailwindcss";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      react: pluginReact,
      tailwindcss: pluginTailwindcss,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginTailwindcss.configs.recommended,
  prettierConfig,
];
