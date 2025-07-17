/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "dlvqcsbpsmrqeejasfzw.supabase.co",
        pathname: "/storage/v1/object/public/cabin-image/**",
      },
    ],
  },
};

export default nextConfig;
