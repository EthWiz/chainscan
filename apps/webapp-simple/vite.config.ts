import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config as loadDotEnv } from "dotenv";

loadDotEnv({ path: "../../.env" });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
});
