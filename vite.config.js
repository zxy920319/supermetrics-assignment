import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import eslintPlugin from "vite-plugin-eslint"
import path from "path"
import Components from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"

Components({
  resolvers: [AntDesignVueResolver()],
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslintPlugin(), vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["test/mocks/globals.js"],
  },
})
