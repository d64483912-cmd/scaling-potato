import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for better serverless deployment
  output: 'standalone',
  
  // Enable experimental features for better performance
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  
  // Environment variables that should be available on the client side
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
};

export default nextConfig;
