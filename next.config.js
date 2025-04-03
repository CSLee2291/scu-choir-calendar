const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your other Next.js config options
};

module.exports = withNextIntl(nextConfig);