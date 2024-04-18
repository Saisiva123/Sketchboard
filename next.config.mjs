/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/login',
            destination: '/'
          }
        ];
      }
};

export default nextConfig;
