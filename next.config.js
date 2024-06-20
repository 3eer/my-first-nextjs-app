/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
  env: {
    ORIGIN: process.env.ORIGIN,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
};

module.exports = nextConfig;
