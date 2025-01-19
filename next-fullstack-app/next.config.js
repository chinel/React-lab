/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "deep-image.ai",
        pathname: "/blog/content/images/2022/09/**",
      },
    ],
  },
};

module.exports = nextConfig;
