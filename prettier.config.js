/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options & import('@ianvs/prettier-plugin-sort-imports').PrettierConfig} */
const config = {
    arrowParens: "always",
    bracketSameLine: false,
    bracketSpacing: true,
    endOfLine: "auto",
    importOrder: [
        "<BUILT_IN_MODULES>",
        "",
        "<THIRD_PARTY_MODULES>",
        "",
        "<TYPES>",
        "",
        "<TYPES>^[.]",
        "",
        "^(@/.*)$",
        "",
        "^[.]",
        "",
        ".css$",
    ],
    jsxSingleQuote: false,
    plugins: [
        "@ianvs/prettier-plugin-sort-imports",
        "prettier-plugin-tailwindcss",
    ],
    printWidth: 80,
    quoteProps: "consistent",
    semi: true,
    singleQuote: false,
    tabWidth: 4,
    tailwindFunctions: ["cva", "cn"],
    trailingComma: "all",
    useTabs: false,
};

export default config;
