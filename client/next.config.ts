import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: 'https',
               hostname: 'res.cloudinary.com',
            port: '',
            pathname: '**',
        },
    ],
},   reactStrictMode: false,
 typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb', // Set a higher limit (e.g., 10 MB)
    },
  },
};

export default nextConfig;
