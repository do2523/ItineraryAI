// next.config.js or next.config.mjs (make sure your file extension matches your syntax)

import "./src/env.js"; // this ensures env validation happens
/**
 * @type {import('next').NextConfig}
 */
const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
