/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SERVER_API_ADDRESS: process.env.SERVER_API_ADDRESS,
        CHAIN_ID: process.env.CHAIN_ID,
        TOKEN_CONTRACT_ADDRESS: process.env.TOKEN_CONTRACT_ADDRESS,
        MARKETPLACE_CONTRACT_ADDRES: process.env.MARKETPLACE_CONTRACT_ADDRES,
        OWNER_ADDRESS: process.env.OWNER_ADDRESS
    },
    reactStrictMode: false,
    webpack(config, { isServer }) {
        // shader support
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            exclude: /node_modules/,
            use: ['raw-loader', 'glslify-loader'],
        })
        return config
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
