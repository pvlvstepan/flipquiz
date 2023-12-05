const { resolve } = require("node:path");

const project = resolve(__dirname, "tsconfig.json");

/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    extends: [
        require.resolve("@vercel/style-guide/eslint/browser"),
        require.resolve("@vercel/style-guide/eslint/node"),
        require.resolve("@vercel/style-guide/eslint/react"),
        require.resolve("@vercel/style-guide/eslint/next"),
        require.resolve("@vercel/style-guide/eslint/typescript"),
        "plugin:tailwindcss/recommended",
    ],
    parserOptions: {
        project,
    },
    settings: {
        "import/resolver": {
            typescript: {
                project,
            },
        },
        "tailwindcss": {
            callees: ["cva", "cn"],
        },
    },
    rules: {
        "import/order": "off",
        "import/no-default-export": "off", // Next.js uses default exports
        "import/no-extraneous-dependencies": ["error", { includeTypes: true }], // See: https://github.com/vercel/style-guide/issues/71

        "no-console": ["warn", { allow: ["error", "log"] }],

        "@typescript-eslint/explicit-function-return-type": "off", // Type inference is good enough
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                checksVoidReturn: { attributes: false },
            },
        ],
    },
};
