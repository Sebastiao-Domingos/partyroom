/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['localhost', 'partyroom-api.vercel.app', 'res.cloudinary.com'], // Adicione localhost como um domínio permitido
  },
  reactStrictMode: false,
};

export default nextConfig;
