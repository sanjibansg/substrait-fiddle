import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import inject from "@rollup/plugin-inject";
import svgLoader from "vite-svg-loader";

const path = require("path");
const prefix = `monaco-editor/esm/vs`;

export default defineConfig({
  plugins: [
    vue(),
    inject({
      $: "jquery",
      jQuery: "jquery",
    }),
    svgLoader(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      "~monaco": path.resolve(__dirname, "node_modules/monaco-editor"),
      "~bootstrap-icons": path.resolve(__dirname, "node_modules/bootstrap-icons"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9090",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/api", ""),
      },
    },
  },
  test:{
    globals: true,
  },
});
