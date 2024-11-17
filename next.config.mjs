/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['localhost', 'partyroom-api.vercel.app'], // Adicione localhost como um domínio permitido
  },
  reactStrictMode: false,
};

export default nextConfig;
