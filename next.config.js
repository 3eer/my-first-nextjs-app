/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
  env: {
    ORIGIN: process.env.ORIGIN,
  },
};

module.exports = nextConfig;
