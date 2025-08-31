/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Optimize for production
  swcMinify: true,
  
  // Environment variables that can be accessed in the browser
  env: {
    NEXT_PUBLIC_REDIS_ENABLED: process.env.REDIS_URL ? 'true' : 'false',
  },
}

export default nextConfig