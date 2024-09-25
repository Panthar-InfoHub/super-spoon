/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns: [
            {hostname: "apis.mappls.com", protocol: "https"}
        ]
    },
    experimental : {
        missingSuspenseWithCSRBailout : false,
    }
};

export default nextConfig;
