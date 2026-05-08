/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
    // Allow any image URL (for admin-set logos from external sources)
    unoptimized: false,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) return config
    // Prevent hot reload when persisted data files change
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        ...(Array.isArray(config.watchOptions?.ignored) ? config.watchOptions.ignored : []),
        '**/.sirius-data/**',
      ],
    }
    return config
  },
}

export default nextConfig
