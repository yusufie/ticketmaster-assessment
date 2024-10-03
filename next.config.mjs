/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**', // Wildcard to allow all hostnames
            port: '',
            pathname: '**' // all paths
          },
        ],
    },
};

export default nextConfig;
