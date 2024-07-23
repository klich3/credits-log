import { defineConfig } from "vite";
import path from "path";

import creditslog from "credits-log";

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
					//added for separate scripts
					if (id.includes("node_modules") || id.includes("src")) {
						return "vendor";
					}
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
	plugins: [
		creditslog({
			frontEnd: true,
		}),
	],
});
