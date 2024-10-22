/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns: [
            {hostname: "**", protocol: "https"},
            {hostname: "**", protocol: "http"}
        ]
    },
    experimental : {
        missingSuspenseWithCSRBailout : false,
    }
};

export default nextConfig;
