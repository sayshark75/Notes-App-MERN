/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APIKEY: process.env.APIKEY,
  },
};

module.exports = nextConfig;
