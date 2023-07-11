/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["d2irwxhydgwv41.cloudfront.net"],
  },
  devIndicators: {
    buildActivity: false,
  },
};

module.exports = nextConfig;
