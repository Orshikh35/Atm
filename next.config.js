// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/api/atm", // Client талаас дуудна
          destination: "http://100.88.81.120:6069/api/v1/Atm", // Жинхэнэ сервер
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  