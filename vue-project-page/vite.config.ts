import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: "src/entry.ts",
      name: "VueProject",
      fileName: (format) => `vue-project.${format}.js`
    }
  }
});