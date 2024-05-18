import path from 'path';
import { fileURLToPath } from 'url';

// Определите текущий каталог
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "./base.scss";`,
  },
};

export default nextConfig;
