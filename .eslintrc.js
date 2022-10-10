module.exports = {
	root: true,
	env: {
		es2021: true,
		browser: true,
		es6: true,
	},
	globals: {
		ENV: true,
	},
	extends: ["eslint:recommended"],
	parserOptions: {
		sourceType: "module",
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
	},
};
