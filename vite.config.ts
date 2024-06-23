import { defineConfig } from 'vite';
import path from "path";
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue({
          script: {
              propsDestructure: true,
          }
      }),
      svgLoader({
          defaultImport: 'component',
          svgo: true,
      })
  ],
    resolve:{
      alias:{
          '@': path.resolve(__dirname, 'src'),
      }
    },
  css: {
      preprocessorOptions: {
          scss: {
              additionalData: [
                  '@import "./src/styles/common/_vars.scss";',
                  '@import "./src/styles/common/_functions.scss";',
                  '@import "./src/styles/common/_mixins.scss";',
                  '@import "./src/styles/default.scss";',
              ].join(' '),
          },
      },
  },
});
