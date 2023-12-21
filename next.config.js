/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
            // allow all domains and subdomains
            {
                protocol: "https",
                hostname: "*",
                port: "",
                pathname: "**",
            },
        ],
    },
};

export default config;
