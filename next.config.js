/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config.ts');

const nextConfig = {
  reactStrictMode: true,
  i18n: i18n,
}

module.exports = nextConfig
