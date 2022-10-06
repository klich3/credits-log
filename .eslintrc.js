module.exports = {
	root: true,
	env: {
		es2021: true,
	},
	extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "@vue/prettier"],
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
	},
};
