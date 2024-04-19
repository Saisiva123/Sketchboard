/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/login',
            destination: '/'
          }
        ];
      },
    env: {
        NEXT_API_URL: 'https://sketchai.saimannem.com/api'
    }
};

export default nextConfig;
