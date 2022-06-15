import { defineConfig } from 'umi';
export default defineConfig({
  define: {
    'process.env': {
      APP_BASE_API: 'http://114.215.182.175:8208',
      NODE_ENV: 'development',
    },
  },
});
