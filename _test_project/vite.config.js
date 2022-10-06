import { defineConfig } from "vite";
import path from "path";
import ViteRequireContext from "@originjs/vite-plugin-require-context";

import { creditslog } from "credits-log";

// https://vitejs.dev/config/
export default defineConfig({
	//base: "/",
	mode: "production",
	build: {
		brotliSize: false,
		manifest: false,
		sourcemap: false, //'inline'
		publicDir: "public/",
		outDir: "dist/",
		rollupOptions: {
			external: [
				"**/*.mp4",
				"**/*.ogv",
				"**/*.ogg",
				"**/*.webm",
				"**/*.gltf",
				"**/*.glb",
				"**/*.drc",
				"**/*.ktx2",
				"**/*.bin",
			],
			output: {
				assetFileNames: "src/assets/[ext]/[name][extname]",
				chunkFileNames: "src/assets/js/[name].[hash].js",
				entryFileNames: "src/assets/js/[name].js",
				manualChunks: (id) => {
					if (id.includes("node_modules"))
						return id
							.toString()
							.split("node_modules/")[1]
							.split("/")[0]
							.toString();
				},
			},
		},
	},
	resolve: {
		extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
		alias: [
			{
				find: "@",
				replacement: path.resolve(__dirname, "src"),
			},
		],
	},
	plugins: [creditslog()],
});
