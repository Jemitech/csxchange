/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongodb', 'bcryptjs', 'jsonwebtoken']
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push({
        '@mongodb-js/zstd': 'commonjs @mongodb-js/zstd',
        'snappy': 'commonjs snappy',
        'kerberos': 'commonjs kerberos',
        '@mongodb-js/client-encryption': 'commonjs @mongodb-js/client-encryption',
        'mongodb-client-encryption': 'commonjs mongodb-client-encryption',
        'gcp-metadata': 'commonjs gcp-metadata',
        'socks': 'commonjs socks'
      })
    }
    return config
  },
}

export default nextConfig
