/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns: [
            {hostname: "**", protocol: "https"}
        ]
    },
    experimental : {
        missingSuspenseWithCSRBailout : false,
    }
};

export default nextConfig;
