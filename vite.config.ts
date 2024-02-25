import { defineConfig } from "vite";
import typescript from "@rollup/plugin-typescript";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { typescriptPaths } from "rollup-plugin-typescript-paths";

export default defineConfig({
  plugins: [dts({ include: "lib" })],

  build: {
    minify: false,
    reportCompressedSize: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "react-cache",
      fileName: "react-cache",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      plugins: [
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          sourceMap: false,
          declaration: true,
          outDir: "dist",
        }),
      ],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
