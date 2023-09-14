import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    test: {
        include: ["**/*.e2e-spec.ts"],
        globals: true,
        alias: {
            "@src": "./src",
            "@test": "./test",
        },
        root: "./",
        setupFiles: ["./test/setup-e2e.ts"]
    },
    resolve: {
        alias: {
            "@src": "./src",
            "@test": "./test",
        },
    },
    plugins: [
        tsConfigPaths(),
        swc.vite({
            module: { type: "es6" }
        })
    ]
});


