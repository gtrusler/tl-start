/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Workers with OpenNext configuration
  
  // Image optimization
  images: {
    domains: ['ui-avatars.com'],
    unoptimized: false
  },
  
  // Environment variables (will be set in Cloudflare)
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
  }
};

module.exports = nextConfig;
