import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import type { UserConfig, ConfigEnv } from 'vite';

const CWD = process.cwd();

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const { VITE_BASE_API } = loadEnv(mode, CWD);
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'types/auto-imports.d.ts', // plugins này sẽ tự động generated ra file auto-imports.d.ts trong source src.
        dirs: [], // chỗ này mình có thể thêm name folder nó sẽ tự động lấy tất cả các tên file trong folder đó và mình có thể gọi bất kì ở trong file Vue nào mà không cần import. (src/stores)
        vueTemplate: true,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // css: {
    //   preprocessorOptions: {
    //     less: {
    //       javascriptEnabled: true,
    //       modifyVars: {},
    //       additionalData: `
    //         @import "@/styles/varriables.less";
    //       `,
    //     },
    //   },
    // },
    server: {
      host: true,
      port: 5000,
      // host: '0.0.0.0',
      proxy: {
        '/api/v1': {
          target: VITE_BASE_API,
          changeOrigin: true,
        },
        '/authentication': {
          target: VITE_BASE_API,
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 5000,
    },
  };
});
