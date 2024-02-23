/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "sjywhbbhktlivbtkmvcj.supabase.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "ounzwscwbtqzavselxrz.supabase.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "hqdiyiqhqbknumobtkox.supabase.co",
        port: "",
      },
    ],
  },
}

module.exports = nextConfig
