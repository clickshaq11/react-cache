import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
      globals: true,
      environment: "jsdom",
      reporters: process.env.GITHUB_ACTIONS
        ? ["default", "github-actions"]
        : ["default"],
      setupFiles: ["src/__tests__/setup/server.ts"],
    },
  })
);
