/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
       domains: ['lh3.googleusercontent.com'],
    },
     env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;
