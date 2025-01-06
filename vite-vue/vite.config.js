import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const path = require("path");

// // https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      comps: path.resolve(__dirname, "./src/components"),
    },
    hostname: "localhost", // 默认是 localhost
    port: "3000", // 默认是 3000 端口
    open: true, // 浏览器自动打开
    https: false, // 是否开启 https
    ssr: false, // 服务端渲染
    base: "./", // 生产环境下的公共路径
    outDir: "dist", // 打包构建输出路径，默认 dist ，如果路径存在，构建之前会被删除
    proxy: {
      // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      "/api": {
        target: "http://127.0.0.1:8080", // 后端服务实际地址
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        // "^/api": "",
      },
    },
  },
  server: {
    fs: {
      strict: false,
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({ resolvers: [ElementPlusResolver()] }),
  ],
});
