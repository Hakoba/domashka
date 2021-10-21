import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "https://hakoba.github.io/domashka/",
  // @ts-ignore
  publicPath: process.env.NODE_ENV === "production" ? "/domashka/" : "/",
});
